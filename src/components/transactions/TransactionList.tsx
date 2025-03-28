
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

function formatDateTime(inputDate: string): string {
  console.log("inputDate", inputDate);
  const date = new Date(inputDate);
  
  // Extract components
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');
  const hours: string = String(date.getHours()).padStart(2, '0');
  const minutes: string = String(date.getMinutes()).padStart(2, '0');
  const seconds: string = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Categories for filtering
const categories = ['All', 'Credit', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

const TransactionList = ({transactions}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter transactions based on search term and category
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getTransactionType = (type: string) => {
    return (type === "credit" || type === "savings")
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
                    getTransactionType(transaction.type) ? "bg-green-100" : "bg-red-100"
                  )}>
                    <span className={cn(
                      "text-sm font-semibold",
                      getTransactionType(transaction.type) ? "text-green-600" : "text-red-600"
                    )}>
                      {getTransactionType(transaction.type) ? "+" : "-"}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.description}</h4>
                    <p className="text-sm text-muted-foreground">{formatDateTime(transaction.created_at)} · {transaction.category}</p>
                  </div>
                </div>
                <div className={cn(
                  "font-semibold",
                  getTransactionType(transaction.type) ? "text-green-600" : "text-red-600"
                )}>
                  {getTransactionType(transaction.type) ? "+" : ""}
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
