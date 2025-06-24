import React from 'react';
import Navbar from "@/components/Navbar";
import { MadeWithDyad } from "@/components/made-with-dyad";
import PropertyCarousel from '@/components/PropertyCarousel';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ListPropertyPage = () => {
  const [formData, setFormData] = React.useState({
    propertyName: '',
    location: '',
    estimatedValue: '',
    squareFeet: '',
    description: '',
    sellerName: '',
    sellerEmail: '',
    sellerPhone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.propertyName || !formData.location || !formData.sellerEmail) {
      toast.error("Please fill in required property and contact fields.");
      return;
    }

    console.log("Property Submission Data:", formData);
    toast.success("Your property details have been submitted! We'll be in touch soon.");
    // Reset form
    setFormData({
      propertyName: '',
      location: '',
      estimatedValue: '',
      squareFeet: '',
      description: '',
      sellerName: '',
      sellerEmail: '',
      sellerPhone: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
            Join many other property owners in selling your house on Casa
          </h1>

          <div className="mb-16">
            <PropertyCarousel />
          </div>

          <Card className="p-6 shadow-lg bg-white dark:bg-gray-950 border-blue-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-blue-700 dark:text-blue-200">
                Submit Your Property Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Property Information</h3>
                  <div>
                    <Label htmlFor="propertyName">Property Name</Label>
                    <Input id="propertyName" value={formData.propertyName} onChange={handleChange} required className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location (City, State)</Label>
                    <Input id="location" value={formData.location} onChange={handleChange} required className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
                    <Input id="estimatedValue" type="number" value={formData.estimatedValue} onChange={handleChange} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="squareFeet">Square Feet</Label>
                    <Input id="squareFeet" type="number" value={formData.squareFeet} onChange={handleChange} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="description">Property Description</Label>
                    <Textarea id="description" value={formData.description} onChange={handleChange} rows={4} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Contact Information</h3>
                  <div>
                    <Label htmlFor="sellerName">Your Name</Label>
                    <Input id="sellerName" value={formData.sellerName} onChange={handleChange} required className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="sellerEmail">Email</Label>
                    <Input id="sellerEmail" type="email" value={formData.sellerEmail} onChange={handleChange} required className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="sellerPhone">Phone Number (Optional)</Label>
                    <Input id="sellerPhone" type="tel" value={formData.sellerPhone} onChange={handleChange} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700" />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6">
                    Submit Property
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p>&copy; {new Date().getFullYear()} Casa. All rights reserved.</p>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default ListPropertyPage;