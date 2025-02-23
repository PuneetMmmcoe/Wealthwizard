import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useToast } from "@/hooks/use-toast";

const sources = [
  "Salary",
  "Freelance",
  "Investment",
  "Business",
  "Rental",
  "Other",
];

export default function EarningsForm({ onSuccess }) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/earnings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create earning");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/earnings"] });
      toast("Earning created successfully");
      onSuccess?.();
      setSource("");
      setAmount("");
      setDescription("");
    },
    onError: (error) => {
      toast(error.message, "error");
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    if (!source || !amount) {
      toast("Please fill in all required fields", "error");
      return;
    }

    mutate({
      source,
      amount: parseFloat(amount),
      description,
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField>
        <FormItem>
          <FormLabel>Source</FormLabel>
          <Select value={source} onValueChange={setSource}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
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
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Add Earning"}
      </Button>
    </form>
  );
} 