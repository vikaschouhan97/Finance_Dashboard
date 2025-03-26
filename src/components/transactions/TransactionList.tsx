
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Sample transaction data
const transactions = [
  {
    id: '1',
    date: '2023-08-22',
    description: 'Grocery Store',
    amount: -125.30,
    category: 'Food',
  },
  {
    id: '2',
    date: '2023-08-21',
    description: 'Monthly Salary',
    amount: 5240.00,
    category: 'Income',
  },
  {
    id: '3',
    date: '2023-08-20',
    description: 'Electric Bill',
    amount: -85.65,
    category: 'Utilities',
  },
  {
    id: '4',
    date: '2023-08-18',
    description: 'Restaurant',
    amount: -64.20,
    category: 'Food',
  },
  {
    id: '5',
    date: '2023-08-15',
    description: 'Gas Station',
    amount: -48.75,
    category: 'Transport',
  },
  {
    id: '6',
    date: '2023-08-14',
    description: 'Movie Tickets',
    amount: -32.50,
    category: 'Entertainment',
  },
  {
    id: '7',
    date: '2023-08-10',
    description: 'Phone Bill',
    amount: -59.99,
    category: 'Utilities',
  },
  {
    id: '8',
    date: '2023-08-05',
    description: 'Freelance Work',
    amount: 850.00,
    category: 'Income',
  }
];

// Categories for filtering
const categories = ['All', 'Income', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter transactions based on search term and category
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>View and filter your recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                  )}>
                    <span className={cn(
                      "text-sm font-semibold",
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {transaction.amount > 0 ? "+" : "-"}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.description}</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(transaction.date)} · {transaction.category}</p>
                  </div>
                </div>
                <div className={cn(
                  "font-semibold",
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {transaction.amount > 0 ? "+" : ""}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No transactions found matching your filters.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
