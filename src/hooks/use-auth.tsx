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
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  addPropertyToUserPortfolio: (propertyId: number, shares: number, purchasePrice: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPortfolio, setUserPortfolio] = useState<UserOwnedProperty[]>([]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Simulate loading user's portfolio on login
        // In a real app, you'd fetch this from your database
        setUserPortfolio([
          { propertyId: 1, sharesOwned: 10, purchasePricePerShare: 75 }, // Example initial owned shares
          { propertyId: 3, sharesOwned: 5, purchasePricePerShare: 81.67 }, // Example initial owned shares
        ]);
      } else {
        setUser(null);
        setUserPortfolio([]); // Clear portfolio on logout
      }
      setLoading(false);
    });

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        // Simulate loading user's portfolio on initial load
        setUserPortfolio([
          { propertyId: 1, sharesOwned: 10, purchasePricePerShare: 75 },
          { propertyId: 3, sharesOwned: 5, purchasePricePerShare: 81.67 },
        ]);
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
      // Portfolio will be set by onAuthStateChange listener
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
      // Portfolio will be cleared by onAuthStateChange listener
    }
    setLoading(false);
  };

  const addPropertyToUserPortfolio = (propertyId: number, shares: number, purchasePrice: number) => {
    setUserPortfolio(prevPortfolio => {
      const existingPropertyIndex = prevPortfolio.findIndex(p => p.propertyId === propertyId);

      if (existingPropertyIndex > -1) {
        // If property already exists, update shares and average purchase price
        const existing = prevPortfolio[existingPropertyIndex];
        const newTotalShares = existing.sharesOwned + shares;
        const newAveragePrice = ((existing.purchasePricePerShare * existing.sharesOwned) + (purchasePrice * shares)) / newTotalShares;

        const updatedPortfolio = [...prevPortfolio];
        updatedPortfolio[existingPropertyIndex] = {
          ...existing,
          sharesOwned: newTotalShares,
          purchasePricePerShare: newAveragePrice,
        };
        return updatedPortfolio;
      } else {
        // Add new property to portfolio
        return [...prevPortfolio, { propertyId, sharesOwned: shares, purchasePricePerShare: purchasePrice }];
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, userPortfolio, signIn, signOut, addPropertyToUserPortfolio }}>
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