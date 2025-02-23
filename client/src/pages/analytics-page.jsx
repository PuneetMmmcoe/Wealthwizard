import { MainLayout } from "@/components/layout/main-layout";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function AnalyticsPage() {
  const { data: expenses = [] } = useQuery({
    queryKey: ["/api/expenses"],
  });

  const { data: earnings = [] } = useQuery({
    queryKey: ["/api/earnings"],
  });

  // Calculate monthly expenses
  const monthlyExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const monthlyExpensesData = Object.entries(monthlyExpenses).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  // Calculate expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const expensesByCategoryData = Object.entries(expensesByCategory).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Calculate total income vs expenses
  const totalIncome = earnings.reduce(
    (sum, earning) => sum + Number(earning.amount),
    0
  );
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const savingsRate = totalIncome ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Visualize your financial data
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-3">
            <div className="text-sm font-medium">Total Income</div>
            <div className="mt-1 text-2xl font-bold">
              ${totalIncome.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl border bg-card p-3">
            <div className="text-sm font-medium">Total Expenses</div>
            <div className="mt-1 text-2xl font-bold">
              ${totalExpenses.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl border bg-card p-3">
            <div className="text-sm font-medium">Savings Rate</div>
            <div className="mt-1 text-2xl font-bold">
              {savingsRate.toFixed(1)}%
            </div>
          </div>
          <div className="rounded-xl border bg-card p-3">
            <div className="text-sm font-medium">Categories</div>
            <div className="mt-1 text-2xl font-bold">
              {expensesByCategoryData.length}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-3">
            <h3 className="font-semibold mb-2">Monthly Expenses</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyExpensesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#1a73e8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-3">
            <h3 className="font-semibold mb-2">Expenses by Category</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {expensesByCategoryData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 