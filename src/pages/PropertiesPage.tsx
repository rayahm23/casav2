import React from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Import useSearchParams
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProperties } from '@/hooks/use-properties'; // Updated import path
import { parseNumber } from '@/data/properties'; // Import parseNumber

const PropertiesPage = () => {
  const { properties, simulateAllPricesChange } = useProperties(); // Use the hook
  const [sortAscending, setSortAscending] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams(); // Initialize useSearchParams

  // Initialize selectedRegion from URL or default to 'All'
  const initialRegion = searchParams.get('region') || 'All';
  const [selectedRegion, setSelectedRegion] = React.useState<string>(initialRegion);

  // Update URL param when selectedRegion changes
  React.useEffect(() => {
    if (selectedRegion === 'All') {
      searchParams.delete('region');
    } else {
      searchParams.set('region', selectedRegion);
    }
    setSearchParams(searchParams);
  }, [selectedRegion, searchParams, setSearchParams]);

  const uniqueRegions = React.useMemo(() => {
    const regions = new Set(properties.map(p => p.location));
    return ['All', ...Array.from(regions).sort()];
  }, [properties]);

  const filteredAndSortedProperties = React.useMemo(() => {
    let currentProperties = [...properties];

    // 1. Filter by region
    if (selectedRegion !== 'All') {
      currentProperties = currentProperties.filter(p => p.location === selectedRegion);
    }

    // 2. Sort by share price if enabled
    if (sortAscending) {
      currentProperties.sort((a, b) => a.currentSharePrice - b.currentSharePrice);
    }
    return currentProperties;
  }, [sortAscending, selectedRegion, properties]); // Depend on properties to re-filter/sort on price change

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            Available Properties
          </h1>
          <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-8">
            <Select onValueChange={setSelectedRegion} value={selectedRegion}> {/* Set value prop */}
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
              {sortAscending ? "Show Default Order" : "Sort by price"}
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
                    <DollarSign className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Share Price: ${property.currentSharePrice.toFixed(2)}
                    {property.priceChangeDirection === 'up' && (
                      <ArrowUp className="w-4 h-4 ml-1 text-green-500" />
                    )}
                    {property.priceChangeDirection === 'down' && (
                      <ArrowDown className="w-4 h-4 ml-1 text-red-500" />
                    )}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to={`/properties/${property.id}`} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      View Details
                    </Button>
                  </Link>
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