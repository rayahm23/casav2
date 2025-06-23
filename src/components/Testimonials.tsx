import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Casa made real estate investment incredibly easy and accessible. I've seen great returns without any of the usual hassle!",
    author: "Jane Doe",
    title: "First-time Investor",
  },
  {
    id: 2,
    quote: "The selection of properties is top-notch, and the platform is so user-friendly. Highly recommend Casa for passive income.",
    author: "John Smith",
    title: "Experienced Investor",
  },
  {
    id: 3,
    quote: "I love the transparency and the detailed financial projections. Casa is truly a game-changer for real estate investing.",
    author: "Emily White",
    title: "Financial Analyst",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
          What Our Investors Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 flex flex-col items-center text-center">
              <Quote className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <CardContent className="text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.quote}"
              </CardContent>
              <p className="font-semibold text-blue-700 dark:text-blue-200">{testimonial.author}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;