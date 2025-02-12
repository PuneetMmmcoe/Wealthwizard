import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Wallet,
  Target
} from "lucide-react";
import { Expense, Budget, Goal, Earning } from "@shared/schema";

export default function StatsCards() {
  const { data: expenses = [] } = useQuery<Expense[]>({ 
    queryKey: ["/api/expenses"] 
  });
  
  const { data: earnings = [] } = useQuery<Earning[]>({ 
    queryKey: ["/api/earnings"] 
  });
  
  const { data: budgets = [] } = useQuery<Budget[]>({ 
    queryKey: ["/api/budgets"] 
  });
  
  const { data: goals = [] } = useQuery<Goal[]>({ 
    queryKey: ["/api/goals"] 
  });

  const totalExpenses = expenses.reduce((sum, expense) => 
    sum + Number(expense.amount), 0
  );

  const totalEarnings = earnings.reduce((sum, earning) => 
    sum + Number(earning.amount), 0
  );

  const netSavings = totalEarnings - totalExpenses;

  const recurringExpenses = expenses.filter(expense => 
    expense.isRecurring
  ).length;

  const averageGoalProgress = goals.length 
    ? goals.reduce((sum, goal) => 
        sum + (Number(goal.currentAmount) / Number(goal.targetAmount)) * 100, 0
      ) / goals.length
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
          <Wallet className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${netSavings.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Goals Progress</CardTitle>
          <Target className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <Progress value={averageGoalProgress} className="mt-2" />
          <div className="mt-2 text-sm text-muted-foreground">
            {averageGoalProgress.toFixed(1)}% Average Progress
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
