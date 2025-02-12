import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import BudgetForm from "@/components/forms/budget-form";
import { useQuery } from "@tanstack/react-query";
import { Budget } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BudgetPage() {
  const [open, setOpen] = useState(false);
  const { data: budgets = [] } = useQuery<Budget[]>({ 
    queryKey: ["/api/budgets"] 
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Budget Management</h1>
            <p className="text-muted-foreground">Set and track your monthly budgets</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Set Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set New Budget</DialogTitle>
              </DialogHeader>
              <BudgetForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.category}</TableCell>
                  <TableCell>{new Date(0, budget.month - 1).toLocaleString('default', { month: 'long' })}</TableCell>
                  <TableCell>{budget.year}</TableCell>
                  <TableCell className="text-right">${Number(budget.amount).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
