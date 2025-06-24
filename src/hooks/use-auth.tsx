import React, { createContext, useContext, useState, useEffect } from 'react';
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
  realizedProfitLoss: number; // New: Track realized profit/loss from sales
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updatePropertyInUserPortfolio: (propertyId: number, sharesChange: number, currentSharePrice: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPortfolio, setUserPortfolio] = useState<UserOwnedProperty[]>([]);
  const [realizedProfitLoss, setRealizedProfitLoss] = useState<number>(0); // Initialize realized profit/loss

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        // In a real app, you'd fetch user's portfolio and realized profit/loss from your database here
        setUserPortfolio([]);
        setRealizedProfitLoss(0); // Reset for new session or load from DB
      } else {
        setUser(null);
        setUserPortfolio([]); // Clear portfolio on logout
        setRealizedProfitLoss(0); // Clear realized profit/loss on logout
      }
      setLoading(false);
    });

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        // In a real app, you'd fetch user's portfolio and realized profit/loss from your database here
        setUserPortfolio([]);
        setRealizedProfitLoss(0); // Reset for initial load or load from DB
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.info("Logged out successfully.");
    }
    setLoading(false);
  };

  const updatePropertyInUserPortfolio = (propertyId: number, sharesChange: number, currentSharePrice: number) => {
    setUserPortfolio(prevPortfolio => {
      const existingPropertyIndex = prevPortfolio.findIndex(p => p.propertyId === propertyId);

      if (existingPropertyIndex > -1) {
        const existing = prevPortfolio[existingPropertyIndex];
        const newTotalShares = existing.sharesOwned + sharesChange;

        if (sharesChange < 0) { // Selling shares
          const sharesSold = Math.abs(sharesChange);
          const profitPerShare = currentSharePrice - existing.purchasePricePerShare;
          const profitFromSale = profitPerShare * sharesSold;
          setRealizedProfitLoss(prev => prev + profitFromSale); // Add to realized profit/loss
        }

        if (newTotalShares <= 0) {
          // Remove property if shares drop to 0 or below
          return prevPortfolio.filter(p => p.propertyId !== propertyId);
        }

        // Calculate new average purchase price only if buying more shares
        let newAveragePrice = existing.purchasePricePerShare;
        if (sharesChange > 0) { // Only average if buying
          newAveragePrice = ((existing.purchasePricePerShare * existing.sharesOwned) + (currentSharePrice * sharesChange)) / newTotalShares;
        }
        // If selling, the average purchase price doesn't change, only the number of shares

        const updatedPortfolio = [...prevPortfolio];
        updatedPortfolio[existingPropertyIndex] = {
          ...existing,
          sharesOwned: newTotalShares,
          purchasePricePerShare: newAveragePrice,
        };
        return updatedPortfolio;
      } else if (sharesChange > 0) {
        // Add new property to portfolio if buying and it doesn't exist
        return [...prevPortfolio, { propertyId, sharesOwned: sharesChange, purchasePricePerShare: currentSharePrice }];
      }
      return prevPortfolio; // Do nothing if trying to sell non-existent shares
    });
  };

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