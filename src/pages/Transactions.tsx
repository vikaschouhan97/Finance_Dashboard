import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TransactionList from "@/components/transactions/TransactionList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@radix-ui/react-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Transactions = () => {
  const [transactionType, setTransactionType] = useState<
    "credit" | "debit" | "savings"
  >("credit");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  const { toast } = useToast();

  const categories = [
    "Food",
    "Utilities",
    "Transport",
    "Entertainment",
    "Other",
  ];

  const savingsCategories = ["Emergency fund", "New Car", "Investment"];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async () => {
    if (
      !amount ||
      ((transactionType === "savings" || transactionType === "debit") &&
        !category)
    ) {
      toast({
        title: "Please provide all field details",
        description: `Please enter a valid amount and category`,
        variant: "destructive",
      });
      return;
    } else {
      const { data, error } = await supabase.from("transactions").insert([
        {
          amount,
          type: transactionType,
          description,
          category,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        },
      ]);
      if (error) toast({ title: "Error", description: error.message });
      else {
        fetchTransactions();
        toast({ title: "Success", description: "Transaction added" });
      }
    }
  };

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
      .or("type.eq.debit,type.eq.credit");

    if (error) {
      console.error("Error fetching transactions:", error.message);
    } else {
      console.log("Transactions:", data);
      setTransactions(data);
    }
  };

  return (
    <MainLayout>
      <section className="flex justify-between items-center pb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and track all your financial activities.
          </p>
        </div>
        {/* Open Modal on Click */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Transaction</span>
            </Button>
          </DialogTrigger>

          {/* Modal Content */}
          <DialogContent className="p-6 rounded-lg bg-white shadow-xl shadow-gray-400 w-[400px] max-h-[70vh] fixed inset-0 m-auto">
            <div>
              <DialogTitle className="text-lg font-semibold">
                Add Transaction
              </DialogTitle>
            </div>

            {/* Transaction Type Selection */}
            <div className="space-y-2 mt-2">
              <Label className="text-sm">Transaction Type</Label>
              <RadioGroup
                className="flex gap-4"
                value={transactionType}
                onValueChange={(value) =>
                  setTransactionType(value as "credit" | "debit")
                }
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit">Credit</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit">Debit</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="savings" id="savings" />
                  <Label htmlFor="savings">Savings</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Category Selection (Only for Debit) */}
            {transactionType === "debit" && (
              <div className="space-y-2 mt-4">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {transactionType === "savings" && (
              <div className="space-y-2 mt-4">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {savingsCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2 mt-4">
              <Label>Total Amount</Label>
              <Input
                type="number"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2 mt-4">
              <Label>Description</Label>
              <textarea
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </div>

            {/* Footer Actions */}
            <div className="mt-6 flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <div>
        <TransactionList transactions={transactions} />
      </div>
    </MainLayout>
  );
};

export default Transactions;
