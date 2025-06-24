import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, TrendingUp } from "lucide-react";
import { useProperties } from '@/hooks/use-properties';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';

const PropertyCarousel = () => {
  const { properties } = useProperties();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative max-w-6xl mx-auto py-8">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-800 dark:text-blue-300">
        Explore Our Latest Listings
      </h3>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {properties.map((property) => (
            <div key={property.id} className="flex-none w-full sm:w-1/2 lg:w-1/3 pl-4">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-blue-50 dark:bg-gray-900 border-blue-200 dark:border-gray-700 h-full flex flex-col">
                <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-200">{property.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300 space-y-2 flex-grow">
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> {property.location}
                  </p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Est. Value: ${property.price}
                  </p>
                  <p className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" /> Share Price: ${property.currentSharePrice.toFixed(2)}
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
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md z-10"
      >
        {"<"}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md z-10"
      >
        {">"}
      </Button>
    </div>
  );
};

export default PropertyCarousel;