
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Sample goals data
const goals = [
  {
    id: '1',
    name: 'Emergency Fund',
    current: 8500,
    target: 15000,
    deadline: 'Dec 2023',
  },
  {
    id: '2',
    name: 'New Car',
    current: 12000,
    target: 30000,
    deadline: 'Jul 2024',
  },
  {
    id: '3',
    name: 'Vacation',
    current: 2800,
    target: 4000,
    deadline: 'Mar 2024',
  },
];

const target = (type: string) => {
  if (type === "Emergency fund") return 20000;
  else if (type === "New Car") return 50000;
  else if (type === "Investment") return 10000;
};

const deadline = (type: string) => {
  if (type === "Emergency fund") return "Dec 2023";
  else if (type === "New Car") return "Jul 2024";
  else if (type === "Investment") return "Mar 2024";
};

const SavingsGoals = ({ savings }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Savings Goals</CardTitle>
          <CardDescription>Track your progress towards financial goals</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {savings.map((goal) => {
            const progress = Math.round((goal.amount / target(goal.category)) * 100);
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{goal.category}</h4>
                  <span className="text-sm font-semibold">{progress}%</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>${goal.amount}</span>
                  <span>${target(goal.category)}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  Target date: {deadline(goal.category)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoals;
