import React from 'react';
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Handshake, DollarSign, Users, Scale, ShieldCheck, TrendingUp, Wallet } from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            How Fractional Real Estate Investing Works
          </h1>
          <p className="text-lg text-center mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Casa makes real estate investment accessible to everyone, regardless of their budget. By dividing properties into smaller, affordable shares, we empower you to build a diversified real estate portfolio with ease.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <Search className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">1. Discover & Select</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Browse our carefully vetted selection of income-generating properties. Each listing comes with comprehensive financial data, projections, and property details.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <Handshake className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">2. Invest in Shares</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Invest in fractional shares of properties starting from as little as $10. You own a direct equity stake in the property, proportional to your investment.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <DollarSign className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">3. Earn Passive Income</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Receive regular passive income distributions from rental yields. As the property value appreciates, so does the value of your shares.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <TrendingUp className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Like Investing in Stocks</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Your property shares behave similarly to stocks. As demand for the property or its location rises, the value of your shares can increase, offering capital appreciation.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <Wallet className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Future Rent Income</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                We're actively working on an option that will allow customers to invest and gain even more passive income directly through rental earnings, further enhancing your returns.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <ShieldCheck className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Transparent & Secure</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Our platform ensures full transparency with detailed financial reporting and robust security measures to protect your investments.
              </CardContent>
            </Card>
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

export default HowItWorksPage;