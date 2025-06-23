import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Handshake, DollarSign } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
          How Casa Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-col items-center">
              <Search className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">1. Discover Properties</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              Browse our curated selection of high-potential real estate properties. Each listing includes detailed financials and projections.
            </CardContent>
          </Card>

          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-col items-center">
              <Handshake className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">2. Invest with Ease</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              Choose the property you like and invest with as little as $10. Our secure platform makes the process simple and transparent.
            </CardContent>
          </Card>

          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-col items-center">
              <DollarSign className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">3. Earn Returns</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              Receive passive income from rental yields and benefit from property appreciation. We handle all the management.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;