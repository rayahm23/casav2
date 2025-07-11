import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useProperties } from '@/hooks/use-properties';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

const MyPropertiesPage = () => {
  const { user, loading: authLoading, userPortfolio, updatePropertyInUserPortfolio } = useAuth();
  const { properties, sellShares } = useProperties();

  const ownedProperties = React.useMemo(() => {
    return userPortfolio.map(owned => {
      const property = properties.find(p => p.id === owned.propertyId);
      if (property) {
        const profitLoss = (property.currentSharePrice - owned.purchasePricePerShare) * owned.sharesOwned;
        const profitLossDirection = profitLoss >= 0 ? 'profit' : 'loss';
        return {
          ...property,
          sharesOwned: owned.sharesOwned,
          profitLoss: profitLoss,
          profitLossDirection: profitLossDirection,
          purchasePricePerShare: owned.purchasePricePerShare,
        };
      }
      return null;
    }).filter(Boolean);
  }, [properties, userPortfolio]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        <p className="text-xl">Loading authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-blue-800 dark:text-blue-300">Access Denied</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">Please log in to view your properties.</p>
            <Link to="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
        <MadeWithDyad />
      </div>
    );
  }

  const handleSellShares = (propertyId: number, sharesOwned: number, currentSharePrice: number) => {
    if (sharesOwned <= 0) {
      toast.error("You don't have any shares to sell for this property.");
      return;
    }
    const sharesToSell = 1; // For simplicity, sell 1 share at a time
    if (sharesOwned < sharesToSell) {
      toast.error(`You only have ${sharesOwned} shares. Cannot sell ${sharesToSell}.`);
      return;
    }

    // Update property price in the market
    sellShares(propertyId, sharesToSell);
    // Remove shares from user's portfolio
    updatePropertyInUserPortfolio(propertyId, -sharesToSell, currentSharePrice);

    toast.success(`Successfully sold ${sharesToSell} share(s) for property ID: ${propertyId}.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            My Properties
          </h1>
          {ownedProperties.length === 0 ? (
            <div className="text-center text-xl text-gray-700 dark:text-gray-300">
              <p className="mb-4">You don't own any properties yet.</p>
              <Link to="/properties">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg">
                  Explore Properties to Invest
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {ownedProperties.map((property) => (
                <Card key={property.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-blue-200 dark:border-gray-700">
                  <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">{property.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-700 dark:text-gray-300 space-y-2">
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> {property.location}
                    </p>
                    <p className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Shares Owned: <span className="font-bold">{property.sharesOwned}</span>
                    </p>
                    <p className="flex items-center font-semibold">
                      <DollarSign className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Profit/Loss:{" "}
                      <span className={property.profitLossDirection === 'profit' ? 'text-green-600' : 'text-red-600'}>
                        ${property.profitLoss.toFixed(2)}
                      </span>
                      {property.profitLossDirection === 'profit' && (
                        <ArrowUp className="w-4 h-4 ml-1 text-green-500" />
                      )}
                      {property.profitLossDirection === 'loss' && (
                        <ArrowDown className="w-4 h-4 ml-1 text-red-500" />
                      )}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Link to={`/invest/${property.id}`} className="w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Buy More Shares
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleSellShares(property.id, property.sharesOwned, property.currentSharePrice)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      Sell Shares
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p>&copy; {new Date().getFullYear()} Casa. All rights reserved.</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default MyPropertiesPage;