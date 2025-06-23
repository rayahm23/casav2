import React from 'react';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from 'react-router-dom';
import SignUpDialog from './SignUpDialog'; // Import the new SignUpDialog

const Navbar = () => {
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = React.useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-950 shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <span className="text-2xl font-bold text-blue-800 dark:text-blue-300">Casa</span>
      </Link>
      <div>
        <Link to="/how-it-works">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 mr-2">
            How it Works
          </Button>
        </Link>
        <Link to="/properties">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 mr-2">
            Properties
          </Button>
        </Link>
        <Link to="/about-us"> {/* Updated to Link to the new About Us page */}
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 mr-2">
            About Us
          </Button>
        </Link>
        <Button
          onClick={() => setIsSignUpDialogOpen(true)} // Open the dialog on click
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Sign Up
        </Button>
      </div>
      <SignUpDialog
        isOpen={isSignUpDialogOpen}
        onClose={() => setIsSignUpDialogOpen(false)}
      />
    </nav>
  );
};

export default Navbar;