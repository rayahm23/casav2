import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DollarSign, CheckCircle2, Users } from "lucide-react";

const ForSellersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar /> {/* Removed hideAuthButtons={true} */}

      {/* Hero Section for Sellers */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5"></div>

        <div className="max-w-5xl mx-auto z-10 relative">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-green-900 dark:text-green-200 drop-shadow-lg">
            A new way to sell your home, <br className="hidden md:inline"/> quick and easy.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-800 dark:text-gray-200 max-w-3xl mx-auto drop-shadow-md">
            List your property on Casa and reach a wide network of fractional investors. Experience a seamless selling process with transparent terms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <Link to="/list-property">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white text-xl px-10 py-7 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                List Your Property
              </Button>
            </Link>
            <Link to="/auth"> {/* Link to Supplier Dashboard (Auth Page) */}
              <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-green-700 dark:text-green-900 text-xl px-10 py-7 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border-green-700 dark:border-green-300">
                Supplier Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How Selling Works Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800 dark:text-green-300">
            How Selling Your Property Works with Casa
          </h2>
          <p className="text-lg text-center mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Our streamlined process makes it simple to list your property and connect with a broad base of investors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-green-50 dark:bg-gray-900 border-green-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <FileText className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-green-700 dark:text-green-200">1. Submit Details</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Provide basic information about your property through our easy-to-use online form.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-green-50 dark:bg-gray-900 border-green-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-green-700 dark:text-green-200">2. Property Vetting</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Our team of experts will review your submission and assess the property's potential for fractional investment.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-green-50 dark:bg-gray-900 border-green-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <Users className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-green-700 dark:text-green-200">3. Reach Investors</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Once approved, your property will be listed on Casa, reaching thousands of potential fractional investors.
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-green-50 dark:bg-gray-900 border-green-200 dark:border-gray-700">
              <CardHeader className="flex flex-col items-center">
                <DollarSign className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-green-700 dark:text-green-200">4. Close & Get Paid</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                We handle the complexities of the transaction, ensuring a smooth closing and timely payment to you.
              </CardContent>
            </Card>
          </div>
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

export default ForSellersPage;