
import React from 'react';
import Header from './Header';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 md:py-10 animate-fade-in">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
