import { parse } from "path";

export interface Property {
  id: number;
  name: string;
  location: string;
  price: string; // Initial estimated value (string with commas)
  sharesOutstanding: string; // Shares outstanding (string with commas)
  image: string;
  squareFeet?: string;
  neighborhood?: string;
  description?: string;
  potentialROI?: string;
  annualExpenses?: string;
  rentPotentialData?: { month: string; rent: number }[];
  // Dynamic fields
  currentSharePrice: number;
  initialSharePrice: number; // Added for profit/loss calculation
  priceChangeDirection: 'up' | 'down' | 'stable';
  priceHistory: { timestamp: number; price: number }[];
}

// Helper function to parse string numbers with commas
export const parseNumber = (str: string) => parseFloat(str.replace(/,/g, ''));

// Initial raw data for properties
const rawProperties = [
  {
    id: 1,
    name: "Modern City Loft",
    location: "San Francisco, CA",
    price: "750,000",
    sharesOutstanding: "10,000",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0b9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "1,200",
    neighborhood: "SOMA",
    description: "A sleek and modern loft in the heart of San Francisco's vibrant SOMA district, perfect for urban living.",
    potentialROI: "12.5%",
    annualExpenses: "15,000",
    rentPotentialData: [
      { month: 'Jan', rent: 3500 },
      { month: 'Feb', rent: 3600 },
      { month: 'Mar', rent: 3700 },
      { month: 'Apr', rent: 3800 },
      { month: 'May', rent: 3900 },
      { month: 'Jun', rent: 4000 },
    ],
  },
  {
    id: 2,
    name: "Cozy Lakeside Cabin",
    location: "Lake Tahoe, CA",
    price: "420,000",
    sharesOutstanding: "7,500",
    image: "https://images.unsplash.com/photo-1505691935177-d32782701914?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "1,800",
    neighborhood: "South Lake Tahoe",
    description: "Escape to this charming lakeside cabin, offering serene views and direct access to outdoor activities.",
    potentialROI: "10.0%",
    annualExpenses: "10,000",
    rentPotentialData: [
      { month: 'Jan', rent: 2000 },
      { month: 'Feb', rent: 2100 },
      { month: 'Mar', rent: 2200 },
      { month: 'Apr', rent: 2300 },
      { month: 'May', rent: 2400 },
      { month: 'Jun', rent: 2500 },
    ],
  },
  {
    id: 3,
    name: "Historic Townhouse",
    location: "Boston, MA",
    price: "980,000",
    sharesOutstanding: "12,000",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3825e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "2,500",
    neighborhood: "Beacon Hill",
    description: "A beautifully preserved historic townhouse in the iconic Beacon Hill, blending classic charm with modern amenities.",
    potentialROI: "11.8%",
    annualExpenses: "18,000",
    rentPotentialData: [
      { month: 'Jan', rent: 4500 },
      { month: 'Feb', rent: 4600 },
      { month: 'Mar', rent: 4700 },
      { month: 'Apr', rent: 4800 },
      { month: 'May', rent: 4900 },
      { month: 'Jun', rent: 5000 },
    ],
  },
  {
    id: 4,
    name: "Beachfront Villa",
    location: "Miami, FL",
    price: "1,500,000",
    sharesOutstanding: "15,000",
    image: "https://images.unsplash.com/photo-1599696848600-350b9685591a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "3,000",
    neighborhood: "South Beach",
    description: "Luxurious beachfront villa with stunning ocean views, ideal for high-end rentals and vacationers.",
    potentialROI: "15.0%",
    annualExpenses: "25,000",
    rentPotentialData: [
      { month: 'Jan', rent: 6000 },
      { month: 'Feb', rent: 6200 },
      { month: 'Mar', rent: 6400 },
      { month: 'Apr', rent: 6600 },
      { month: 'May', rent: 6800 },
      { month: 'Jun', rent: 7000 },
    ],
  },
  {
    id: 5,
    name: "Mountain Retreat",
    location: "Aspen, CO",
    price: "1,100,000",
    sharesOutstanding: "11,000",
    image: "https://images.unsplash.com/photo-1582268497000-11141302970f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "2,000",
    neighborhood: "Snowmass Village",
    description: "A cozy mountain retreat offering breathtaking views and proximity to world-class skiing and hiking.",
    potentialROI: "10.5%",
    annualExpenses: "20,000",
    rentPotentialData: [
      { month: 'Jan', rent: 5000 },
      { month: 'Feb', rent: 5100 },
      { month: 'Mar', rent: 5200 },
      { month: 'Apr', rent: 5300 },
      { month: 'May', rent: 5400 },
      { month: 'Jun', rent: 5500 },
    ],
  },
  {
    id: 6,
    name: "Urban Penthouse",
    location: "Chicago, IL",
    price: "890,000",
    sharesOutstanding: "9,500",
    image: "https://images.unsplash.com/photo-1554995207-c18c694d6e7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    squareFeet: "1,600",
    neighborhood: "River North",
    description: "Stunning penthouse with panoramic city views in Chicago's vibrant River North, ideal for luxury living.",
    potentialROI: "11.0%",
    annualExpenses: "16,000",
    rentPotentialData: [
      { month: 'Jan', rent: 4000 },
      { month: 'Feb', rent: 4100 },
      { month: 'Mar', rent: 4200 },
      { month: 'Apr', rent: 4300 },
      { month: 'May', rent: 4400 },
      { month: 'Jun', rent: 4500 },
    ],
  },
];

export const initialProperties: Property[] = rawProperties.map(p => {
  const parsedPrice = parseNumber(p.price);
  const parsedSharesOutstanding = parseNumber(p.sharesOutstanding);
  const initialSharePrice = parsedPrice / parsedSharesOutstanding;
  return {
    ...p,
    currentSharePrice: initialSharePrice,
    initialSharePrice: initialSharePrice, // Store the initial share price
    priceChangeDirection: 'stable',
    priceHistory: [{ timestamp: Date.now(), price: initialSharePrice }],
  };
});