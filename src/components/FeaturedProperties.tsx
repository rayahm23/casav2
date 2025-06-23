import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, TrendingUp } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Luxury Downtown Apartment",
    location: "New York, NY",
    price: "500,000",
    yield: "6.5%",
    image: "https://images.unsplash.com/photo-1554995207-c18c694d6e7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Suburban Family Home",
    location: "Austin, TX",
    price: "350,000",
    yield: "7.2%",
    image: "https://images.unsplash.com/photo-1570129476810-ac367809e363?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Commercial Retail Space",
    location: "Los Angeles, CA",
    price: "1,200,000",
    yield: "8.0%",
    image: "https://images.unsplash.com/photo-1517030120930-0e2681724864?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700">
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
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Projected Yield: {property.yield}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Explore All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;