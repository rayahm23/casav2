import React from 'react';
import { initialProperties, Property, parseNumber } from '@/data/properties';

interface PropertiesContextType {
  properties: Property[];
  getPropertyById: (id: number) => Property | undefined;
  simulateAllPricesChange: () => void;
  buyShares: (propertyId: number, shares: number) => void;
  sellShares: (propertyId: number, shares: number) => void;
}

const PropertiesContext = React.createContext<PropertiesContextType | undefined>(undefined);

// Factor to determine how much price changes per share bought/sold
const PRICE_IMPACT_FACTOR = 0.0005; // 0.05% change per share
const MAX_PRICE_HISTORY_LENGTH = 100; // Increased history length

export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = React.useState<Property[]>(initialProperties);

  const generateDynamicPrice = (basePrice: number): number => {
    // Simulate a small random fluctuation, e.g., +/- 2%
    const fluctuation = (Math.random() * 0.04) - 0.02; // Random number between -0.02 and +0.02
    return basePrice * (1 + fluctuation);
  };

  const updatePropertyPrice = (
    propertyId: number,
    newPrice: number,
    direction: 'up' | 'down' | 'stable'
  ) => {
    setProperties(prevProperties =>
      prevProperties.map(p => {
        if (p.id === propertyId) {
          const updatedPriceHistory = [...p.priceHistory, { timestamp: Date.now(), price: newPrice }];
          if (updatedPriceHistory.length > MAX_PRICE_HISTORY_LENGTH) {
            updatedPriceHistory.shift(); // Remove the oldest entry
          }
          return {
            ...p,
            currentSharePrice: newPrice,
            priceChangeDirection: direction,
            priceHistory: updatedPriceHistory,
          };
        }
        return p;
      })
    );
  };

  const simulateAllPricesChange = () => {
    setProperties(prevProperties =>
      prevProperties.map(p => {
        const oldPrice = p.currentSharePrice;
        // Base the new price on the current price, allowing it to drift
        const newPrice = generateDynamicPrice(oldPrice);
        const direction = newPrice > oldPrice ? 'up' : newPrice < oldPrice ? 'down' : 'stable';

        const updatedPriceHistory = [...p.priceHistory, { timestamp: Date.now(), price: newPrice }];
        if (updatedPriceHistory.length > MAX_PRICE_HISTORY_LENGTH) {
          updatedPriceHistory.shift();
        }

        return {
          ...p,
          currentSharePrice: newPrice,
          priceChangeDirection: direction,
          priceHistory: updatedPriceHistory,
        };
      })
    );
  };

  const buyShares = (propertyId: number, shares: number) => {
    setProperties(prevProperties =>
      prevProperties.map(p => {
        if (p.id === propertyId) {
          const newPrice = p.currentSharePrice * (1 + shares * PRICE_IMPACT_FACTOR);
          const updatedPriceHistory = [...p.priceHistory, { timestamp: Date.now(), price: newPrice }];
          if (updatedPriceHistory.length > MAX_PRICE_HISTORY_LENGTH) {
            updatedPriceHistory.shift();
          }
          return {
            ...p,
            currentSharePrice: newPrice,
            priceChangeDirection: 'up',
            priceHistory: updatedPriceHistory,
          };
        }
        return p;
      })
    );
  };

  const sellShares = (propertyId: number, shares: number) => {
    setProperties(prevProperties =>
      prevProperties.map(p => {
        if (p.id === propertyId) {
          const newPrice = p.currentSharePrice * (1 - shares * PRICE_IMPACT_FACTOR);
          const updatedPriceHistory = [...p.priceHistory, { timestamp: Date.now(), price: newPrice }];
          if (updatedPriceHistory.length > MAX_PRICE_HISTORY_LENGTH) {
            updatedPriceHistory.shift();
          }
          return {
            ...p,
            currentSharePrice: newPrice,
            priceChangeDirection: 'down',
            priceHistory: updatedPriceHistory,
          };
        }
        return p;
      })
    );
  };

  const getPropertyById = (id: number) => {
    return properties.find(p => p.id === id);
  };

  // Simulate price changes every 10 seconds for demonstration
  React.useEffect(() => {
    simulateAllPricesChange(); // Initial price set on mount
    const interval = setInterval(() => {
      simulateAllPricesChange();
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <PropertiesContext.Provider value={{ properties, getPropertyById, simulateAllPricesChange, buyShares, sellShares }}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = React.useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};