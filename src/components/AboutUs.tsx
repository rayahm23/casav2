import React from 'react';
import { Users, Building, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
          About Casa
        </h2>
        <p className="text-lg text-center mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Casa is revolutionizing real estate investment by making it accessible, transparent, and effortless. We believe everyone should have the opportunity to build wealth through property ownership.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-col items-center">
              <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Community Focused</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              Join a growing community of smart investors leveraging fractional ownership to diversify their portfolios.
            </CardContent>
          </Card>

          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-col items-center">
              <Building className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Expert Curation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              Our team of real estate experts meticulously selects high-potential properties for your investment.
            </CardContent>
          </Card>

          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-col items-center">
              <Award className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">Transparent & Secure</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              Invest with confidence on a platform built with transparency and top-tier security in mind.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;