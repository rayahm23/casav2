import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { toast } from "sonner";
import { useAuth } from '@/hooks/use-auth'; // Import useAuth
import { useProperties } from '@/hooks/use-properties'; // Import useProperties
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SignUpDialog from '@/components/SignUpDialog'; // Import SignUpDialog

const AuthPage = () => {
  const { user, loading, signIn, signOut } = useAuth();
  const { properties } = useProperties();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = React.useState(false);

  // Dummy portfolio data for demonstration
  // In a real app, this would come from a database associated with the user
  const userPortfolio = React.useMemo(() => {
    // For demonstration, let's assume a logged-in user owns 10 shares of property 1 and 5 shares of property 3
    const ownedShares = [
      { propertyId: 1, shares: 10 },
      { propertyId: 3, shares: 5 },
    ];

    const portfolioValueHistory: { timestamp: number; value: number }[] = [];

    // Calculate portfolio value over time based on property price history
    // This is a simplified aggregation for demonstration
    if (properties.length > 0) {
      // Get the longest price history to ensure all points are covered
      const maxHistoryLength = Math.max(...properties.map(p => p.priceHistory.length));
      
      for (let i = 0; i < maxHistoryLength; i++) {
        let totalValueAtPoint = 0;
        let timestamp = 0;

        ownedShares.forEach(owned => {
          const property = properties.find(p => p.id === owned.propertyId);
          if (property && property.priceHistory[i]) {
            totalValueAtPoint += property.priceHistory[i].price * owned.shares;
            timestamp = property.priceHistory[i].timestamp; // Use the timestamp from one of the properties
          }
        });
        if (timestamp > 0) {
          portfolioValueHistory.push({ timestamp, value: totalValueAtPoint });
        }
      }
    }
    
    return {
      totalShares: ownedShares.reduce((sum, item) => sum + item.shares, 0),
      currentValue: portfolioValueHistory.length > 0 ? portfolioValueHistory[portfolioValueHistory.length - 1].value : 0,
      portfolioValueHistory: portfolioValueHistory.map(data => ({
        ...data,
        // Format timestamp for display on X-axis if needed, or use a time formatter in Recharts
        name: new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })),
    };
  }, [properties]); // Recalculate when properties (and their prices) change

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    await signIn(email, password);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        <p className="text-xl">Loading authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4 flex items-center justify-center">
        {user ? (
          <Card className="w-full max-w-3xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-blue-800 dark:text-blue-300">Welcome, {user.email}</CardTitle>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">Your Investment Portfolio</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="p-4 shadow-sm bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Portfolio Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-700 dark:text-gray-300 space-y-2">
                    <p className="text-lg">Total Shares Owned: <span className="font-bold">{userPortfolio.totalShares}</span></p>
                    <p className="text-lg">Current Portfolio Value: <span className="font-bold text-green-600">${userPortfolio.currentValue.toFixed(2)}</span></p>
                    <Button onClick={signOut} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                      Logout
                    </Button>
                  </CardContent>
                </Card>
                <Card className="p-4 shadow-sm bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Portfolio Value Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userPortfolio.portfolioValueHistory}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                        <XAxis dataKey="name" stroke="#6b7280" className="dark:stroke-gray-400" />
                        <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                          itemStyle={{ color: 'hsl(var(--foreground))' }}
                          formatter={(value: number) => `$${value.toFixed(2)}`}
                        />
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mt-8">
                <Link to="/properties">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    Explore More Properties
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-md bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-blue-800 dark:text-blue-300">Login to Casa</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                  {loading ? 'Logging In...' : 'Login'}
                </Button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="#" className="text-blue-500 hover:text-blue-700 underline" onClick={() => setIsSignUpDialogOpen(true)}>
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </Card>
        )}
      </section>
      <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p>&copy; {new Date().getFullYear()} Casa. All rights reserved.</p>
        <MadeWithDyad />
      </footer>
      <SignUpDialog
        isOpen={isSignUpDialogOpen}
        onClose={() => setIsSignUpDialogOpen(false)}
      />
    </div>
  );
};

export default AuthPage;