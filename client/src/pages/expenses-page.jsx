import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import ExpenseForm from "@/components/forms/expense-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ExpensesPage() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: expenses = [], error, isLoading } = useQuery({
    queryKey: ["/api/expenses"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/expenses", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
      return response.json();
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (expenseId) => {
      const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["/api/expenses"]);
    },
  });

  const handleFormSuccess = () => {
    queryClient.invalidateQueries(["/api/expenses"]);
    setOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expense Tracking</h1>
            <p className="text-muted-foreground">Track and manage your expenses</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your expense below.
                </DialogDescription>
              </DialogHeader>
              <ExpenseForm onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg">
          {isLoading ? (
            <p>Loading expenses...</p>
          ) : error ? (
            <p>Error loading expenses: {error.message}</p>
          ) : expenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell className="text-right">${Number(expense.amount).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteExpense.mutate(expense._id)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </MainLayout>
  );
}