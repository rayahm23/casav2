import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, TrendingUp } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import PropertyCarousel from '@/components/PropertyCarousel'; // Import the new carousel

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 md:py-40 overflow-hidden">
        {/* Background gradient/pattern for modern look */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5"></div> {/* Subtle pattern */}

        <div className="max-w-5xl mx-auto z-10 relative"> {/* Added relative to ensure z-index works */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-blue-900 dark:text-blue-200 drop-shadow-lg">
            Invest in Real Estate, <br className="hidden md:inline"/> Starting from Just $10.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-800 dark:text-gray-200 max-w-3xl mx-auto drop-shadow-md">
            Casa makes real estate investment accessible to everyone. Own shares in high-value properties and grow your wealth effortlessly.
          </p>
          <PropertyCarousel /> {/* Insert the carousel here */}
          <Link to="/properties">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white text-xl px-10 py-7 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mt-8">
              Start Investing Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-800 dark:text-blue-300">
            Why Choose Casa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="text-center p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 rounded-xl">
              <CardHeader className="flex flex-col items-center">
                <DollarSign className="w-14 h-14 text-blue-600 dark:text-blue-400 mb-6" />
                <CardTitle className="text-2xl font-semibold text-blue-700 dark:text-blue-200">Affordable Entry</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-gray-700 dark:text-gray-300">
                Invest with as little as $10. No need for large capital to start building your real estate portfolio.
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 rounded-xl">
              <CardHeader className="flex flex-col items-center">
                <Home className="w-14 h-14 text-blue-600 dark:text-blue-400 mb-6" />
                <CardTitle className="text-2xl font-semibold text-blue-700 dark:text-blue-200">Fractional Ownership</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-gray-700 dark:text-gray-300">
                Buy shares in carefully selected properties, diversifying your investments without the hassle of full ownership.
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 rounded-xl">
              <CardHeader className="flex flex-col items-center">
                <TrendingUp className="w-14 h-14 text-blue-600 dark:text-blue-400 mb-6" />
                <CardTitle className="text-2xl font-semibold text-blue-700 dark:text-blue-200">Passive Income</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-gray-700 dark:text-gray-300">
                Earn passive income from rental yields and potential property appreciation, all managed by Casa.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Call to Action Section */}
      <section className="py-20 px-4 text-center bg-blue-700 dark:bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Build Your Real Estate Portfolio?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of smart investors who are leveraging Casa to access the lucrative real estate market.
          </p>
          <Link to="/properties">
            <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-700 dark:text-blue-900 text-xl px-10 py-7 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
              Get Started with Casa
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p className="text-md">&copy; {new Date().getFullYear()} Casa. All rights reserved.</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default LandingPage;