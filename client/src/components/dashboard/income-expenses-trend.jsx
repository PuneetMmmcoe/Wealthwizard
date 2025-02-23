import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IncomeExpensesTrend() {
  const { data: expenses = [] } = useQuery({
    queryKey: ["/api/expenses"],
  });

  const { data: earnings = [] } = useQuery({
    queryKey: ["/api/earnings"],
  });

  // Process data for monthly comparison
  const monthlyData = [...expenses, ...earnings].reduce((acc, item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString("default", { month: "short" });
    
    if (!acc[month]) {
      acc[month] = { month, income: 0, expenses: 0 };
    }
    
    if ("amount" in item) {
      if (earnings.includes(item)) {
        acc[month].income += Number(item.amount);
      } else {
        acc[month].expenses += Number(item.amount);
      }
    }
    
    return acc;
  }, {});

  const chartData = Object.values(monthlyData).sort((a, b) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.indexOf(a.month) - months.indexOf(b.month);
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Income vs Expenses Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#00C49F"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#FF8042"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 