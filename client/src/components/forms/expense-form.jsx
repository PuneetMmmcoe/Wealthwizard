import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ExpenseForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add expenses",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData(e.target);
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: parseFloat(formData.get('amount')),
          category: formData.get('category'),
          description: formData.get('description'),
          date: formData.get('date'),
          title: formData.get('description') || 'Untitled Expense',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add expense');
      }

      toast({
        title: "Success",
        description: "Expense added successfully",
      });
      onSuccess?.();
      e.target.reset();
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField>
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select name="category" required>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input
              type="number"
              name="amount"
              placeholder="Enter amount"
              step="0.01"
              min="0"
              required
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input
              type="text"
              name="description"
              placeholder="Enter description"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <FormLabel>Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={`w-full pl-3 text-left font-normal`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(new Date(), "PPP")}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date()}
                onSelect={() => {}}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Expense"}
      </Button>
    </form>
  );
} 