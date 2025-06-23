import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { toast } from "sonner"; // Using sonner for toasts
import { useProperties } from '@/hooks/use-properties';
import { useAuth } from '@/hooks/use-auth'; // Import useAuth

const InvestmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const { getPropertyById } = useProperties();
  const { user, addPropertyToUserPortfolio } = useAuth(); // Get user and addPropertyToUserPortfolio from useAuth
  const property = getPropertyById(parseInt(id || '0'));

  const [numberOfShares, setNumberOfShares] = React.useState<number>(1);
  const [totalCost, setTotalCost] = React.useState<number>(0);

  React.useEffect(() => {
    if (property) {
      setTotalCost(property.currentSharePrice * numberOfShares);
    }
  }, [numberOfShares, property]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">The property you are looking for does not exist.</p>
          <Link to="/properties" className="text-blue-500 hover:text-blue-700 underline">
            Return to Properties
          </Link>
        </div>
      </div>
    );
  }

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setNumberOfShares(value);
    } else if (e.target.value === '') {
      setNumberOfShares(0); // Allow empty input temporarily
    }
  };

  const handleProceedToPayment = () => {
    if (numberOfShares <= 0) {
      toast.error("Please enter a valid number of shares (at least 1).");
      return;
    }

    if (!user) {
      toast.info("Please log in to make an investment.", {
        action: {
          label: "Login",
          onClick: () => navigate('/auth'),
        },
      });
      return;
    }

    // If logged in, add property to user's portfolio
    addPropertyToUserPortfolio(property.id, numberOfShares, property.currentSharePrice);

    toast.success(`Successfully purchased ${numberOfShares} shares in ${property.name} for $${totalCost.toFixed(2)}!`);
    console.log(`Proceeding to payment for ${numberOfShares} shares of ${property.name}. Total: $${totalCost.toFixed(2)}`);
    // In a real app, you'd integrate with a payment gateway here
    // For now, we'll just show a toast and potentially redirect to My Properties
    navigate('/my-properties');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-300">
              Invest in {property.name}
            </h1>
            <Link to={`/properties/${property.id}`}>
              <Button variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800">
                Back to Details
              </Button>
            </Link>
          </div>

          <img src={property.image} alt={property.name} className="w-full h-64 object-cover rounded-lg mb-8 shadow-md" />

          <Card className="p-4 shadow-sm bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-2">
              <p className="flex items-center"><Home className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Property: {property.name}</p>
              <p className="flex items-center font-semibold text-blue-700 dark:text-blue-200"><DollarSign className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Share Price: ${property.currentSharePrice.toFixed(2)}</p>
              <div className="flex items-center space-x-4 mt-4">
                <Label htmlFor="shares" className="text-lg font-medium">Number of Shares:</Label>
                <Input
                  id="shares"
                  type="number"
                  min="1"
                  value={numberOfShares === 0 ? '' : numberOfShares} // Display empty string for 0 to allow user to clear
                  onChange={handleSharesChange}
                  className="w-32 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700"
                />
              </div>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-300 mt-6">
                Total Cost: ${totalCost.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleProceedToPayment}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </section>
      <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p>&copy; {new Date().getFullYear()} Casa. All rights reserved.</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default InvestmentPage;