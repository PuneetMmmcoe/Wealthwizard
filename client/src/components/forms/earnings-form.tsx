import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEarningSchema, InsertEarning } from "@shared/schema";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";

interface EarningsFormProps {
  onSuccess?: () => void;
}

export default function EarningsForm({ onSuccess }: EarningsFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertEarning>({
    resolver: zodResolver(insertEarningSchema),
    defaultValues: {
      amount: "",
      date: format(new Date(), "yyyy-MM-dd")
    }
  });

  const mutation = useMutation({
    mutationFn: async (earning: InsertEarning) => {
      const res = await apiRequest("POST", "/api/earnings", {
        ...earning,
        amount: earning.amount.toString()
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/earnings"] });
      form.reset();
      toast({
        title: "Success",
        description: "Earning added successfully"
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

  const onSubmit = async (data: InsertEarning) => {
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
            <Input
              type="number"
              step="0.01"
              placeholder="Earning Amount"
              {...form.register("amount")}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-red-500">{form.formState.errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="date"
              {...form.register("date")}
            />
            {form.formState.errors.date && (
              <p className="text-sm text-red-500">{form.formState.errors.date.message}</p>
            )}
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
        >
          Add Earning
        </Button>
      </form>
    </Form>
  );
}