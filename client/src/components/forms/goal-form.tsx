import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertGoalSchema, InsertGoal } from "@shared/schema";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";

export default function GoalForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertGoal>({
    resolver: zodResolver(insertGoalSchema),
    defaultValues: {
      title: "",
      targetAmount: 0,
      targetDate: format(new Date(), "yyyy-MM-dd")
    }
  });

  const mutation = useMutation({
    mutationFn: async (goal: InsertGoal) => {
      const res = await apiRequest("POST", "/api/goals", goal);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
      form.reset();
      toast({
        title: "Success",
        description: "Savings goal added successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              placeholder="Goal Title"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="number"
              step="0.01"
              placeholder="Target Amount"
              {...form.register("targetAmount", { valueAsNumber: true })}
            />
            {form.formState.errors.targetAmount && (
              <p className="text-sm text-red-500">{form.formState.errors.targetAmount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="date"
              {...form.register("targetDate")}
            />
            {form.formState.errors.targetDate && (
              <p className="text-sm text-red-500">{form.formState.errors.targetDate.message}</p>
            )}
          </div>
        </div>

        <Button 
          type="submit"
          disabled={mutation.isPending}
        >
          Set Goal
        </Button>
      </form>
    </Form>
  );
}
