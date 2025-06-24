import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface UserOwnedProperty {
  propertyId: number;
  sharesOwned: number;
  purchasePricePerShare: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userPortfolio: UserOwnedProperty[];
  realizedProfitLoss: number;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updatePropertyInUserPortfolio: (propertyId: number, sharesChange: number, currentSharePrice: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPortfolio, setUserPortfolio] = useState<UserOwnedProperty[]>([]);
  const [realizedProfitLoss, setRealizedProfitLoss] = useState<number>(0);

  // Function to save user data to Supabase
  const saveUserData = useCallback(async (userId: string, portfolio: UserOwnedProperty[], profitLoss: number) => {
    const { error } = await supabase
      .from('user_data')
      .upsert({ user_id: userId, portfolio: portfolio, realized_profit_loss: profitLoss }, { onConflict: 'user_id' });

    if (error) {
      console.error("Error saving user data:", error.message);
      toast.error("Failed to save portfolio data.");
    }
  }, []);

  // Function to load user data from Supabase
  const loadUserData = useCallback(async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_data')
      .select('portfolio, realized_profit_loss')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means "no rows found"
      console.error("Error loading user data:", error.message);
      toast.error("Failed to load portfolio data.");
    } else if (data) {
      setUserPortfolio(data.portfolio || []);
      setRealizedProfitLoss(data.realized_profit_loss || 0);
    } else {
      // If no data found, initialize with empty portfolio and 0 profit/loss
      setUserPortfolio([]);
      setRealizedProfitLoss(0);
      // Also, create an initial entry in the database for this user
      await saveUserData(userId, [], 0);
    }
    setLoading(false);
  }, [saveUserData]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadUserData(session.user.id);
      } else {
        setUser(null);
        setUserPortfolio([]);
        setRealizedProfitLoss(0);
        setLoading(false);
      }
    });

    // Initial check on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [loadUserData]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else if (data.user) {
      toast.success("Logged in successfully!");
      // Data will be loaded by the onAuthStateChange listener
    }
    // setLoading(false) is handled by onAuthStateChange
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.info("Logged out successfully.");
      // State will be cleared by the onAuthStateChange listener
    }
    // setLoading(false) is handled by onAuthStateChange
  };

  const updatePropertyInUserPortfolio = useCallback((propertyId: number, sharesChange: number, currentSharePrice: number) => {
    setUserPortfolio(prevPortfolio => {
      const existingPropertyIndex = prevPortfolio.findIndex(p => p.propertyId === propertyId);
      let newRealizedProfitLoss = realizedProfitLoss;
      let updatedPortfolio: UserOwnedProperty[];

      if (existingPropertyIndex > -1) {
        const existing = prevPortfolio[existingPropertyIndex];
        const newTotalShares = existing.sharesOwned + sharesChange;

        if (sharesChange < 0) { // Selling shares
          const sharesSold = Math.abs(sharesChange);
          const profitPerShare = currentSharePrice - existing.purchasePricePerShare;
          const profitFromSale = profitPerShare * sharesSold;
          newRealizedProfitLoss += profitFromSale;
        }

        if (newTotalShares <= 0) {
          updatedPortfolio = prevPortfolio.filter(p => p.propertyId !== propertyId);
        } else {
          let newAveragePrice = existing.purchasePricePerShare;
          if (sharesChange > 0) { // Only average if buying
            newAveragePrice = ((existing.purchasePricePerShare * existing.sharesOwned) + (currentSharePrice * sharesChange)) / newTotalShares;
          }
          updatedPortfolio = [...prevPortfolio];
          updatedPortfolio[existingPropertyIndex] = {
            ...existing,
            sharesOwned: newTotalShares,
            purchasePricePerShare: newAveragePrice,
          };
        }
      } else if (sharesChange > 0) {
        updatedPortfolio = [...prevPortfolio, { propertyId, sharesOwned: sharesChange, purchasePricePerShare: currentSharePrice }];
      } else {
        updatedPortfolio = prevPortfolio; // Do nothing if trying to sell non-existent shares
      }

      setRealizedProfitLoss(newRealizedProfitLoss);

      // Save updated data to Supabase if user is logged in
      if (user) {
        saveUserData(user.id, updatedPortfolio, newRealizedProfitLoss);
      }
      return updatedPortfolio;
    });
  }, [realizedProfitLoss, user, saveUserData]);

  return (
    <AuthContext.Provider value={{ user, loading, userPortfolio, realizedProfitLoss, signIn, signOut, updatePropertyInUserPortfolio }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};