
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import BalanceChart from '@/components/dashboard/BalanceChart';
import ExpensesPieChart from '@/components/dashboard/ExpensesPieChart';
import TransactionList from '@/components/transactions/TransactionList';
import SavingsGoals from '@/components/goals/SavingsGoals';

const Index = () => {
  return (
    <MainLayout>
      <section className="space-y-2 pb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your finances.
        </p>
      </section>

      <div className="space-y-8">
        <DashboardSummary />
        
        <div className="grid gap-4 md:grid-cols-3">
          <BalanceChart />
          <ExpensesPieChart />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <TransactionList />
          <SavingsGoals />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
