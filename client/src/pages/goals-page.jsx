import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import GoalForm from "@/components/forms/goal-form";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export default function GoalsPage() {
  const [open, setOpen] = useState(false);
  const { data: goals = [] } = useQuery({ 
    queryKey: ["/api/goals"] 
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
            <p className="text-muted-foreground">Set and track your financial goals</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set New Goal</DialogTitle>
                <DialogDescription>
                  Create a new financial goal by entering the details below.
                </DialogDescription>
              </DialogHeader>
              <GoalForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal</TableHead>
                <TableHead>Target Amount</TableHead>
                <TableHead>Current Amount</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <TableRow key={goal.id}>
                    <TableCell>{goal.title}</TableCell>
                    <TableCell>${Number(goal.targetAmount).toFixed(2)}</TableCell>
                    <TableCell>${Number(goal.currentAmount).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="w-[100px]">
                        <Progress value={progress} />
                      </div>
                    </TableCell>
                    <TableCell>{goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'No deadline'}</TableCell>
                    <TableCell>{goal.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
} 