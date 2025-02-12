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

export default function EarningsForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertEarning>({
    resolver: zodResolver(insertEarningSchema),
    defaultValues: {
      amount: 0,
      date: format(new Date(), "yyyy-MM-dd")
    }
  });

  const mutation = useMutation({
    mutationFn: async (earning: InsertEarning) => {
      const res = await apiRequest("POST", "/api/earnings", earning);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/earnings"] });
      form.reset();
      toast({
        title: "Success",
        description: "Earning added successfully"
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
              type="number"
              step="0.01"
              placeholder="Earning Amount"
              {...form.register("amount", { valueAsNumber: true })}
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
          disabled={mutation.isPending}
        >
          Add Earning
        </Button>
      </form>
    </Form>
  );
}
