
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TransactionList from '@/components/transactions/TransactionList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Transactions = () => {
  return (
    <MainLayout>
      <section className="flex justify-between items-center pb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and track all your financial activities.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Transaction</span>
        </Button>
      </section>

      <div>
        <TransactionList />
      </div>
    </MainLayout>
  );
};

export default Transactions;
