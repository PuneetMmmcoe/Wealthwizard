import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertBudgetSchema, InsertBudget, EXPENSE_CATEGORIES } from "@shared/schema";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString(),
  label: new Date(0, i).toLocaleString('default', { month: 'long' })
}));

interface BudgetFormProps {
  onSuccess?: () => void;
}

export default function BudgetForm({ onSuccess }: BudgetFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const form = useForm<InsertBudget>({
    resolver: zodResolver(insertBudgetSchema),
    defaultValues: {
      category: "Other",
      amount: "",
      month: currentMonth,
      year: currentYear
    }
  });

  const mutation = useMutation({
    mutationFn: async (budget: InsertBudget) => {
      const res = await apiRequest("POST", "/api/budgets", {
        ...budget,
        amount: budget.amount.toString() // Keep as string for API
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/budgets"] });
      form.reset();
      toast({
        title: "Success",
        description: "Budget added successfully"
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = async (data: InsertBudget) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      // Error is handled in mutation.onError
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Select
              onValueChange={(value) => form.setValue("category", value)}
              value={form.watch("category")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.category && (
              <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="number"
              step="0.01"
              placeholder="Budget Amount"
              {...form.register("amount")}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-red-500">{form.formState.errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Select
              onValueChange={(value) => form.setValue("month", parseInt(value))}
              value={form.watch("month").toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.month && (
              <p className="text-sm text-red-500">{form.formState.errors.month.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Year"
              {...form.register("year", { valueAsNumber: true })}
            />
            {form.formState.errors.year && (
              <p className="text-sm text-red-500">{form.formState.errors.year.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
        >
          Set Budget
        </Button>
      </form>
    </Form>
  );
}