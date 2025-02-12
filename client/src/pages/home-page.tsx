import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCards from "@/components/dashboard/stats-cards";
import ExpensesChart from "@/components/dashboard/expenses-chart";
import ExpenseForm from "@/components/forms/expense-form";
import BudgetForm from "@/components/forms/budget-form";
import GoalForm from "@/components/forms/goal-form";
import EarningsForm from "@/components/forms/earnings-form";
import { LogOut } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Finance Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.username}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <StatsCards />
          <ExpensesChart />
          
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Finance Inputs</h2>
            <Tabs defaultValue="expenses">
              <TabsList>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="budgets">Budgets</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>

              <TabsContent value="expenses">
                <ExpenseForm />
              </TabsContent>

              <TabsContent value="budgets">
                <BudgetForm />
              </TabsContent>

              <TabsContent value="goals">
                <GoalForm />
              </TabsContent>

              <TabsContent value="earnings">
                <EarningsForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
