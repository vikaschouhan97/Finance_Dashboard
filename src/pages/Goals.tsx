
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SavingsGoals from '@/components/goals/SavingsGoals';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

const GoalTips = [
  "Set specific, measurable, achievable goals",
  "Break large savings goals into smaller milestones",
  "Automate your savings with scheduled transfers",
  "Review and adjust your goals regularly",
  "Celebrate when you reach milestones"
];

const Goals = () => {
  return (
    <MainLayout>
      <section className="flex justify-between items-center pb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">
            Create and track progress towards your financial goals.
          </p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <SavingsGoals />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Tips for Success</span>
              </CardTitle>
              <CardDescription>Helpful advice for reaching your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {GoalTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                      {index + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full mt-6">Create New Goal</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Goals;
