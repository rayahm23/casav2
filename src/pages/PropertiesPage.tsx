import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper function to parse string numbers with commas
const parseNumber = (str: string) => parseFloat(str.replace(/,/g, ''));

// Dummy data for properties
const rawProperties = [
  {
    id: 1,
    name: "Modern City Loft",
    location: "San Francisco, CA",
    price: "750,000",
    sharesOutstanding: "10,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Cozy Lakeside Cabin",
    location: "Lake Tahoe, CA",
    price: "420,000",
    sharesOutstanding: "7,500",
    image: "https://images.unsplash.com/photo-1564013799907-f01017062c07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Historic Townhouse",
    location: "Boston, MA",
    price: "980,000",
    sharesOutstanding: "12,000",
    image: "https://images.unsplash.com/photo-1570129476810-ac367809e363?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Beachfront Villa",
    location: "Miami, FL",
    price: "1,500,000",
    sharesOutstanding: "15,000",
    image: "https://images.unsplash.com/photo-1592595896615-b712782c1ad9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Mountain Retreat",
    location: "Aspen, CO",
    price: "1,100,000",
    sharesOutstanding: "11,000",
    image: "https://images.unsplash.com/photo-1574362611341-6c872657061e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Urban Penthouse",
    location: "Chicago, IL",
    price: "890,000",
    sharesOutstanding: "9,500",
    image: "https://images.unsplash.com/photo-1558036117-df3852276997?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Calculate share price for each property
const propertiesWithSharePrice = rawProperties.map(p => {
  const parsedPrice = parseNumber(p.price);
  const parsedSharesOutstanding = parseNumber(p.sharesOutstanding);
  const sharePrice = parsedPrice / parsedSharesOutstanding;
  return {
    ...p,
    sharePrice: sharePrice,
  };
});

const PropertiesPage = () => {
  const [sortAscending, setSortAscending] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState<string>('All');

  const uniqueRegions = React.useMemo(() => {
    const regions = new Set(propertiesWithSharePrice.map(p => p.location));
    return ['All', ...Array.from(regions).sort()];
  }, []);

  const filteredAndSortedProperties = React.useMemo(() => {
    let currentProperties = [...propertiesWithSharePrice];

    // 1. Filter by region
    if (selectedRegion !== 'All') {
      currentProperties = currentProperties.filter(p => p.location === selectedRegion);
    }

    // 2. Sort by share price if enabled
    if (sortAscending) {
      currentProperties.sort((a, b) => a.sharePrice - b.sharePrice);
    }
    return currentProperties;
  }, [sortAscending, selectedRegion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            Available Properties
          </h1>
          <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-8">
            <Select onValueChange={setSelectedRegion} defaultValue={selectedRegion}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700">
                <SelectValue placeholder="Filter by Region" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700">
                {uniqueRegions.map(region => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setSortAscending(!sortAscending)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {sortAscending ? "Show Default Order" : "Sort by Lowest Share Price"}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProperties.map((property) => (
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
                    <DollarSign className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Est. Value: ${property.price}
                  </p>
                  <p className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Shares Outstanding: {property.sharesOutstanding}
                  </p>
                  <p className="flex items-center font-semibold text-blue-700 dark:text-blue-200">
                    <DollarSign className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Share Price: ${property.sharePrice.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Invest Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
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

export default PropertiesPage;