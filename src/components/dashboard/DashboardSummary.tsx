
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const SummaryCard = ({ title, value, isPositive, icon }: SummaryCardProps) => (
  <Card className="overflow-hidden transition-all hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className={cn("text-2xl font-bold", isPositive ? "text-green-500" : "text-red-500")}>{value}</div>
    </CardContent>
  </Card>
);

const DashboardSummary = ({balances}) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        title="Balance"
        value={`$ ${balances.balance}`}
        isPositive={true}
        icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
      />
      <SummaryCard
        title="Total Income"
        value={`$ ${balances.total}`}
        isPositive={true}
        icon={<ArrowUp className="h-4 w-4 text-green-500" />}
      />
      <SummaryCard
        title="Total Expense"
        value={`$ ${balances.expense}`}
        isPositive={false}
        icon={<ArrowDown className="h-4 w-4 text-red-500" />}
      />
    </div>
  );
};

export default DashboardSummary;
