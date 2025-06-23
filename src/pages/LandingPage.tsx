import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, TrendingUp } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks"; // Import the new HowItWorks component

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 md:py-32">
        <div className="max-w-4xl mx-auto z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-blue-800 dark:text-blue-300">
            Invest in Real Estate, Starting from Just $10.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300">
            Casa makes real estate investment accessible to everyone. Own shares in high-value properties and grow your wealth effortlessly.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Start Investing Today
          </Button>
        </div>
        <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
          <Home className="w-full h-full text-blue-400 dark:text-blue-700" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            Why Choose Casa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <DollarSign className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Affordable Entry</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Invest with as little as $10. No need for large capital to start building your real estate portfolio.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <Home className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Fractional Ownership</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Buy shares in carefully selected properties, diversifying your investments without the hassle of full ownership.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <TrendingUp className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Passive Income</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Earn passive income from rental yields and potential property appreciation, all managed by Casa.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks /> {/* Add the HowItWorks section here */}

      {/* Call to Action Section */}
      <section className="py-16 px-4 text-center bg-blue-600 dark:bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Real Estate Portfolio?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of smart investors who are leveraging Casa to access the lucrative real estate market.
          </p>
          <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 dark:text-blue-900 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Get Started with Casa
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p>&copy; {new Date().getFullYear()} Casa. All rights reserved.</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default LandingPage;