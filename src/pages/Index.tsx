import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import BalanceChart from "@/components/dashboard/BalanceChart";
import ExpensesPieChart from "@/components/dashboard/ExpensesPieChart";
import TransactionList from "@/components/transactions/TransactionList";
import SavingsGoals from "@/components/goals/SavingsGoals";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState({
    balance: 0,
    total: 0,
    expense: 0,
  });
  const [savings, setSavings] = useState([]);
  useEffect(() => {
    fetchTransactions();
  }, []);
  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

    if (error) {
      console.error("Error fetching transactions:", error.message);
    } else {
      let balance = 0,
        total = 0,
        expense = 0,
        emergency_fund = 0,
        new_car = 0,
        investment = 0;
      data.forEach((transaction: any) => {
        if (transaction.type === "credit") {
          balance += transaction.amount;
          total += transaction.amount;
        } else {
          balance -= transaction.amount;
          expense += transaction.amount;
        }
      });
      setBalances({ balance, total, expense });
      setTransactions(
        data?.filter(
          (transaction) =>
            transaction.type === "credit" || transaction.type === "debit"
        )
      );
      data.forEach((transaction: any) => {
        if (transaction.type === "savings") {
          if (transaction.category === "Emergency fund") {
            emergency_fund += transaction.amount;
          } else if (transaction.category === "New Car") {
            new_car += transaction.amount;
          } else if (transaction.category === "Investment") {
            investment += transaction.amount;
          }
        }
      });
      setSavings([
        { id: 0, category: "Emergency fund", amount: emergency_fund },
        { id: 1, category: "New Car", amount: new_car },
        { id: 2, category: "Investment", amount: investment },
      ]);
    }
  };
  return (
    <MainLayout>
      <section className="space-y-2 pb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your finances.
        </p>
      </section>

      <div className="space-y-8">
        <DashboardSummary balances={balances} />

        <div className="grid gap-4 md:grid-cols-3">
          <BalanceChart />
          <ExpensesPieChart transactions={transactions} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TransactionList transactions={transactions} />
          <SavingsGoals savings={savings} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
