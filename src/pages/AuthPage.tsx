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
  const { user, loading, signIn, signOut, userPortfolio } = useAuth(); // Get userPortfolio from useAuth
  const { properties } = useProperties(); // Get properties from useProperties
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = React.useState(false);

  // Calculate portfolio data dynamically
  const portfolioData = React.useMemo(() => {
    let totalShares = 0;
    let currentValue = 0;
    const portfolioValueHistory: { timestamp: number; value: number; name: string }[] = [];

    if (userPortfolio.length > 0 && properties.length > 0) {
      // Aggregate all price histories from owned properties
      const combinedHistoryMap = new Map<number, { timestamp: number; value: number }[]>();

      userPortfolio.forEach(owned => {
        const property = properties.find(p => p.id === owned.propertyId);
        if (property) {
          totalShares += owned.sharesOwned;
          currentValue += property.currentSharePrice * owned.sharesOwned;

          property.priceHistory.forEach(historyPoint => {
            if (!combinedHistoryMap.has(historyPoint.timestamp)) {
              combinedHistoryMap.set(historyPoint.timestamp, []);
            }
            combinedHistoryMap.get(historyPoint.timestamp)?.push({
              timestamp: historyPoint.timestamp,
              value: historyPoint.price * owned.sharesOwned,
            });
          });
        }
      });

      // Sum values at each timestamp
      const sortedTimestamps = Array.from(combinedHistoryMap.keys()).sort((a, b) => a - b);

      sortedTimestamps.forEach(timestamp => {
        let totalValueAtPoint = 0;
        combinedHistoryMap.get(timestamp)?.forEach(point => {
          totalValueAtPoint += point.value;
        });
        portfolioValueHistory.push({
          timestamp,
          value: totalValueAtPoint,
          name: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      });
    }

    return {
      totalShares,
      currentValue,
      portfolioValueHistory,
    };
  }, [userPortfolio, properties]); // Depend on userPortfolio and properties

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
                    <p className="text-lg">Total Shares Owned: <span className="font-bold">{portfolioData.totalShares}</span></p>
                    <p className="text-lg">Current Portfolio Value: <span className="font-bold text-green-600">${portfolioData.currentValue.toFixed(2)}</span></p>
                    <Link to="/my-properties"> {/* New link to MyPropertiesPage */}
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                        Explore My Properties
                      </Button>
                    </Link>
                    <Button onClick={signOut} className="mt-4 ml-2 bg-red-600 hover:bg-red-700 text-white">
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
                        data={portfolioData.portfolioValueHistory}
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