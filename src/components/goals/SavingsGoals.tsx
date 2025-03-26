
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

const SavingsGoals = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Savings Goals</CardTitle>
          <CardDescription>Track your progress towards financial goals</CardDescription>
        </div>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="h-4 w-4" />
          <span>New Goal</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = Math.round((goal.current / goal.target) * 100);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{goal.name}</h4>
                  <span className="text-sm font-semibold">{progress}%</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>${goal.current.toLocaleString()}</span>
                  <span>${goal.target.toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  Target date: {goal.deadline}
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
