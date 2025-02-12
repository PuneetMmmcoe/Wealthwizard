import { useAuth } from "@/hooks/use-auth";
import StatsCards from "@/components/dashboard/stats-cards";
import ExpensesChart from "@/components/dashboard/expenses-chart";
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
        <ExpensesChart />
      </div>
    </MainLayout>
  );
}