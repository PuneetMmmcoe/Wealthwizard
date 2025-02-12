import { MainLayout } from "@/components/layout/main-layout";
import { useQuery } from "@tanstack/react-query";
import { Budget, Expense, Goal, Earning } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { startOfMonth, format, parseISO, subMonths } from "date-fns";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AnalyticsPage() {
  const { data: expenses = [] } = useQuery<Expense[]>({ 
    queryKey: ["/api/expenses"] 
  });
  
  const { data: budgets = [] } = useQuery<Budget[]>({ 
    queryKey: ["/api/budgets"] 
  });
  
  const { data: goals = [] } = useQuery<Goal[]>({ 
    queryKey: ["/api/goals"] 
  });
  
  const { data: earnings = [] } = useQuery<Earning[]>({ 
    queryKey: ["/api/earnings"] 
  });

  // Monthly expense trends
  const monthlyExpenses = expenses.reduce((acc, expense) => {
    const month = startOfMonth(parseISO(expense.date));
    const monthKey = format(month, 'MMM yyyy');
    acc[monthKey] = (acc[monthKey] || 0) + Number(expense.amount);
    return acc;
  }, {} as Record<string, number>);

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return format(date, 'MMM yyyy');
  }).reverse();

  const expenseTrends = last6Months.map(month => ({
    month,
    amount: monthlyExpenses[month] || 0
  }));

  // Budget vs Actual
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const budgetComparison = budgets
    .filter(budget => budget.month === currentMonth && budget.year === currentYear)
    .map(budget => {
      const actual = expenses
        .filter(expense => 
          expense.category === budget.category &&
          parseISO(expense.date).getMonth() + 1 === currentMonth
        )
        .reduce((sum, expense) => sum + Number(expense.amount), 0);
      
      return {
        category: budget.category,
        budget: Number(budget.amount),
        actual
      };
    });

  // Category Distribution
  const categoryDistribution = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryDistribution).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
          <p className="text-muted-foreground">Detailed analysis of your financial data</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Monthly Expense Trends */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Monthly Expense Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={expenseTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Budget vs Actual */}
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual (Current Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
