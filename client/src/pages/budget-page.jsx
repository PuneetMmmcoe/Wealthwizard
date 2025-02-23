import { MainLayout } from "@/components/layout/main-layout";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BudgetDialog } from "@/components/budget-dialog";

export default function BudgetPage() {
  const { data: budgets = [], isLoading, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const response = await fetch("/api/budgets", { credentials: "include" });
      if (!response.ok) {
        throw new Error("Failed to fetch budgets");
      }
      return response.json();
    },
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Budget Management</h1>
            <p className="text-muted-foreground">Set and track your monthly budgets</p>
          </div>
          <BudgetDialog />
        </div>

        {isLoading ? (
          <p>Loading budgets...</p>
        ) : error ? (
          <p>Error loading budgets: {error.message}</p>
        ) : (
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
                {budgets.map((budget, index) => {
                  // Use budget.id if available; otherwise, combine other fields with index
                  const key = budget.id
                    ? budget.id
                    : `${budget.category}-${budget.month}-${budget.year}-${index}`;
                  return (
                    <TableRow key={key}>
                      <TableCell>{budget.category}</TableCell>
                      <TableCell>
                        {new Date(0, budget.month - 1).toLocaleString("default", {
                          month: "long",
                        })}
                      </TableCell>
                      <TableCell>{budget.year}</TableCell>
                      <TableCell className="text-right">
                        ${Number(budget.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </MainLayout>
  );
}



