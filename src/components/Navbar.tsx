import React from 'react';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white dark:bg-gray-950 shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <span className="text-2xl font-bold text-blue-800 dark:text-blue-300">Casa</span>
      </div>
      <div>
        <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 mr-2">
          How it Works
        </Button>
        <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 mr-2">
          Properties
        </Button>
        <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 mr-2">
          About Us
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;