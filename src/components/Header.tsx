
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                ROI Mate
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-secondary transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/quote" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-secondary transition-colors duration-200"
                >
                  My Quotes
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="ml-2"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-secondary transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="pt-2 pb-4 space-y-1 px-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/quote"
                  className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Quotes
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full mt-2">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
