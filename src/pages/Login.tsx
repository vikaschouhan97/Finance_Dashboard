
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 relative h-12 w-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold">$</span>
          </div>
          <h1 className="text-2xl font-bold">Finance Dashboard</h1>
          <p className="text-muted-foreground">Sign in to manage your finances</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
