import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, TrendingUp, Square, Home, Banknote, ArrowUp, ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useProperties } from '@/hooks/use-properties'; // Import useProperties

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperties(); // Use the hook
  const property = getPropertyById(parseInt(id || '0'));

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-300">
              {property.name}
            </h1>
            <Link to="/properties">
              <Button variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800">
                Go Back to Properties
              </Button>
            </Link>
          </div>

          <img src={property.image} alt={property.name} className="w-full h-80 object-cover rounded-lg mb-8 shadow-md" />

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{property.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-4 shadow-sm bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Property Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300 space-y-2">
                <p className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Location: {property.location}</p>
                <p className="flex items-center"><Home className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Neighborhood: {property.neighborhood}</p>
                <p className="flex items-center"><Square className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Square Feet: {property.squareFeet}</p>
              </CardContent>
            </Card>

            <Card className="p-4 shadow-sm bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Financial Details</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300 space-y-2">
                <p className="flex items-center"><DollarSign className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Estimated Value: ${property.price}</p>
                <p className="flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Shares Outstanding: {property.sharesOutstanding}</p>
                <p className="flex items-center font-semibold text-blue-700 dark:text-blue-200">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Share Price: ${property.currentSharePrice.toFixed(2)}
                  {property.priceChangeDirection === 'up' && (
                    <ArrowUp className="w-4 h-4 ml-1 text-green-500" />
                  )}
                  {property.priceChangeDirection === 'down' && (
                    <ArrowDown className="w-4 h-4 ml-1 text-red-500" />
                  )}
                </p>
                <p className="flex items-center"><Banknote className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Potential ROI: {property.potentialROI}</p>
                <p className="flex items-center"><DollarSign className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Annual Expenses: ${property.annualExpenses}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="p-4 shadow-sm bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Rent Potential Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={property.rentPotentialData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
                  <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" />
                  <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line type="monotone" dataKey="rent" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to={`/invest/${property.id}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                Invest in {property.name}
              </Button>
            </Link>
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

export default PropertyDetailsPage;