import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, TrendingUp, Square, Home, Banknote } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper function to parse string numbers with commas
const parseNumber = (str: string) => parseFloat(str.replace(/,/g, ''));

// Dummy data for properties (expanded for details page)
const allProperties = [
  {
    id: 1,
    name: "Modern City Loft",
    location: "San Francisco, CA",
    price: "750,000",
    sharesOutstanding: "10,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "1,200",
    neighborhood: "SOMA",
    description: "A sleek and modern loft in the heart of San Francisco's vibrant SOMA district, perfect for urban living.",
    potentialROI: "12.5%",
    annualExpenses: "15,000",
    rentPotentialData: [
      { month: 'Jan', rent: 3500 },
      { month: 'Feb', rent: 3600 },
      { month: 'Mar', rent: 3700 },
      { month: 'Apr', rent: 3800 },
      { month: 'May', rent: 3900 },
      { month: 'Jun', rent: 4000 },
    ],
  },
  {
    id: 2,
    name: "Cozy Lakeside Cabin",
    location: "Lake Tahoe, CA",
    price: "420,000",
    sharesOutstanding: "7,500",
    image: "https://images.unsplash.com/photo-1564013799907-f01017062c07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "1,800",
    neighborhood: "South Lake Tahoe",
    description: "Escape to this charming lakeside cabin, offering serene views and direct access to outdoor activities.",
    potentialROI: "10.0%",
    annualExpenses: "10,000",
    rentPotentialData: [
      { month: 'Jan', rent: 2000 },
      { month: 'Feb', rent: 2100 },
      { month: 'Mar', rent: 2200 },
      { month: 'Apr', rent: 2300 },
      { month: 'May', rent: 2400 },
      { month: 'Jun', rent: 2500 },
    ],
  },
  {
    id: 3,
    name: "Historic Townhouse",
    location: "Boston, MA",
    price: "980,000",
    sharesOutstanding: "12,000",
    image: "https://images.unsplash.com/photo-1570129476810-ac367809e363?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "2,500",
    neighborhood: "Beacon Hill",
    description: "A beautifully preserved historic townhouse in the iconic Beacon Hill, blending classic charm with modern amenities.",
    potentialROI: "11.8%",
    annualExpenses: "18,000",
    rentPotentialData: [
      { month: 'Jan', rent: 4500 },
      { month: 'Feb', rent: 4600 },
      { month: 'Mar', rent: 4700 },
      { month: 'Apr', rent: 4800 },
      { month: 'May', rent: 4900 },
      { month: 'Jun', rent: 5000 },
    ],
  },
  {
    id: 4,
    name: "Beachfront Villa",
    location: "Miami, FL",
    price: "1,500,000",
    sharesOutstanding: "15,000",
    image: "https://images.unsplash.com/photo-1592595896615-b712782c1ad9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "3,000",
    neighborhood: "South Beach",
    description: "Luxurious beachfront villa with stunning ocean views, ideal for high-end rentals and vacationers.",
    potentialROI: "15.0%",
    annualExpenses: "25,000",
    rentPotentialData: [
      { month: 'Jan', rent: 6000 },
      { month: 'Feb', rent: 6200 },
      { month: 'Mar', rent: 6400 },
      { month: 'Apr', rent: 6600 },
      { month: 'May', rent: 6800 },
      { month: 'Jun', rent: 7000 },
    ],
  },
  {
    id: 5,
    name: "Mountain Retreat",
    location: "Aspen, CO",
    price: "1,100,000",
    sharesOutstanding: "11,000",
    image: "https://images.unsplash.com/photo-1574362611341-6c872657061e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "2,000",
    neighborhood: "Snowmass Village",
    description: "A cozy mountain retreat offering breathtaking views and proximity to world-class skiing and hiking.",
    potentialROI: "10.5%",
    annualExpenses: "20,000",
    rentPotentialData: [
      { month: 'Jan', rent: 5000 },
      { month: 'Feb', rent: 5100 },
      { month: 'Mar', rent: 5200 },
      { month: 'Apr', rent: 5300 },
      { month: 'May', rent: 5400 },
      { month: 'Jun', rent: 5500 },
    ],
  },
  {
    id: 6,
    name: "Urban Penthouse",
    location: "Chicago, IL",
    price: "890,000",
    sharesOutstanding: "9,500",
    image: "https://images.unsplash.com/photo-1558036117-df3852276997?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "1,600",
    neighborhood: "River North",
    description: "Stunning penthouse with panoramic city views in Chicago's vibrant River North, ideal for luxury living.",
    potentialROI: "11.0%",
    annualExpenses: "16,000",
    rentPotentialData: [
      { month: 'Jan', rent: 4000 },
      { month: 'Feb', rent: 4100 },
      { month: 'Mar', rent: 4200 },
      { month: 'Apr', rent: 4300 },
      { month: 'May', rent: 4400 },
      { month: 'Jun', rent: 4500 },
    ],
  },
];

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const property = allProperties.find(p => p.id === parseInt(id || '0'));

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

  const sharePrice = (parseNumber(property.price) / parseNumber(property.sharesOutstanding)).toFixed(2);

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
                <p className="flex items-center font-semibold text-blue-700 dark:text-blue-200"><DollarSign className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Share Price: ${sharePrice}</p>
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