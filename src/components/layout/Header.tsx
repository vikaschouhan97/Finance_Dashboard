
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, WalletIcon, TrendingUp } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Transactions', path: '/transactions', icon: WalletIcon },
  { name: 'Goals', path: '/goals', icon: TrendingUp }
];

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative h-7 w-7 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">$</span>
            </div>
            <span className="font-semibold text-xl hidden sm:inline-block">Finance</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-2 lg:space-x-6 mx-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline-block">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <span className="text-xs font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
