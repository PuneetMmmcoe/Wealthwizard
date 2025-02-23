import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function BudgetProgress() {
  const { data: expenses = [] } = useQuery({
    queryKey: ["/api/expenses"],
  });

  const { data: budgets = [] } = useQuery({
    queryKey: ["/api/budgets"],
  });

  // Calculate budget progress
  const budgetProgress = budgets.map((budget) => {
    const spent = expenses
      .filter((expense) => expense.category === budget.category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    
    const percentage = (spent / Number(budget.amount)) * 100;
    
    return {
      category: budget.category,
      spent,
      budget: Number(budget.amount),
      percentage: Math.min(percentage, 100),
    };
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgetProgress.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <span className="text-muted-foreground">
                  ${item.spent.toFixed(2)} / ${item.budget.toFixed(2)}
                </span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 