import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, UserCircle } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import SignUpDialog from './SignUpDialog';
import { useAuth } from '@/hooks/use-auth'; // Import useAuth
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = React.useState(false);
  const { user, signOut } = useAuth(); // Get user and signOut from useAuth
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/'); // Redirect to landing page after logout
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-950 shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <span className="text-2xl font-bold text-blue-800 dark:text-blue-300">Casa</span>
      </Link>
      <div className="flex items-center">
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
        <Link to="/index"> {/* New link for the Index page */}
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 mr-2">
            Index
          </Button>
        </Link>
        <Link to="/about-us">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 mr-2">
            About Us
          </Button>
        </Link>
        <Link to="/for-sellers"> {/* New button for sellers */}
          <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mr-2">
            For sellers
          </Button>
        </Link>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <UserCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-950 border-blue-200 dark:border-gray-700" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">My Account</p>
                  <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-blue-200 dark:bg-gray-700" />
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer">
                <Link to="/auth" className="w-full">
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button
              onClick={() => setIsSignUpDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
            >
              Sign Up
            </Button>
            <Link to="/auth">
              <Button variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800">
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
      <SignUpDialog
        isOpen={isSignUpDialogOpen}
        onClose={() => setIsSignUpDialogOpen(false)}
      />
    </nav>
  );
};

export default Navbar;