import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function SavingsGoals() {
  const { data: goals = [] } = useQuery({
    queryKey: ["/api/goals"],
  });

  const { data: earnings = [] } = useQuery({
    queryKey: ["/api/earnings"],
  });

  // Calculate total savings and progress for each goal
  const goalsProgress = goals.map((goal) => {
    const totalSavings = earnings.reduce(
      (sum, earning) => sum + Number(earning.amount),
      0
    );
    const progress = Math.min((totalSavings / Number(goal.targetAmount)) * 100, 100);
    
    return {
      name: goal.title,
      value: Number(goal.targetAmount),
      progress,
      current: totalSavings,
    };
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={goalsProgress}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {goalsProgress.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `$${value.toFixed(2)}`,
                  name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-4">
          {goalsProgress.map((goal, index) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium" style={{ color: COLORS[index % COLORS.length] }}>
                  {goal.name}
                </span>
                <span className="text-muted-foreground">
                  ${goal.current.toFixed(2)} / ${goal.value.toFixed(2)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${goal.progress}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 