import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import GoalForm from "@/components/forms/goal-form";
import { useQuery } from "@tanstack/react-query";
import { Goal } from "@shared/schema";
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
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";

export default function GoalsPage() {
  const [open, setOpen] = useState(false);
  const { data: goals = [] } = useQuery<Goal[]>({ 
    queryKey: ["/api/goals"] 
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
            <p className="text-muted-foreground">Track your savings goals progress</p>
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
                <DialogTitle>Add New Goal</DialogTitle>
              </DialogHeader>
              <GoalForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Target Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Target Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal) => {
                const progress = (Number(goal.currentAmount) / Number(goal.targetAmount)) * 100;
                return (
                  <TableRow key={goal.id}>
                    <TableCell>{goal.title}</TableCell>
                    <TableCell>{format(new Date(goal.targetDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={progress} />
                        <p className="text-sm text-muted-foreground">
                          ${Number(goal.currentAmount).toFixed(2)} of ${Number(goal.targetAmount).toFixed(2)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${Number(goal.targetAmount).toFixed(2)}</TableCell>
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
