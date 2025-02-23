import { useAuth } from "@/hooks/use-auth";
import StatsCards from "@/components/dashboard/stats-cards";
import ExpensesChart from "@/components/dashboard/expenses-chart";
import { BudgetProgress } from "@/components/dashboard/budget-progress";
import { SavingsGoals } from "@/components/dashboard/savings-goals";
import { IncomeExpensesTrend } from "@/components/dashboard/income-expenses-trend";
import { MainLayout } from "@/components/layout/main-layout";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}</h1>
          <p className="text-muted-foreground">Here's an overview of your finances</p>
        </div>

        <StatsCards />
        
        <div className="grid gap-8 md:grid-cols-2">
          <ExpensesChart />
          <BudgetProgress />
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <SavingsGoals />
          <IncomeExpensesTrend />
        </div>
      </div>
    </MainLayout>
  );
} 