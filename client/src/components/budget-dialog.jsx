import { useState } from "react";
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
import BudgetForm from "@/components/forms/budget-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function BudgetDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const createBudgetMutation = useMutation({
    mutationFn: async (newBudget) => {
      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBudget),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to create budget");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setOpen(false); //close the dialog after success create
    },
    onError: (error) => {
        console.error("Failed to create a budget:", error);
        // Handle error appropriately, e.g., display an error message to the user
    }
  });

  const handleCreateBudget = async (newBudgetData) => {
    try {
        await createBudgetMutation.mutateAsync(newBudgetData);
    } catch (error) {
        //createBudgetMutation has error in the onError
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Set Budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set New Budget</DialogTitle>
          <DialogDescription>
            Create a new budget by entering the details below.
          </DialogDescription>
        </DialogHeader>
        {/* Pass handleCreateBudget to BudgetForm */}
        <BudgetForm onSubmit={handleCreateBudget} />
      </DialogContent>
    </Dialog>
  );
}