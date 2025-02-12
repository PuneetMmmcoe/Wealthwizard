import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import EarningsForm from "@/components/forms/earnings-form";
import { useQuery } from "@tanstack/react-query";
import { Earning } from "@shared/schema";
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

export default function IncomePage() {
  const [open, setOpen] = useState(false);
  const { data: earnings = [] } = useQuery<Earning[]>({ 
    queryKey: ["/api/earnings"] 
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Income</h1>
            <p className="text-muted-foreground">Track your earnings and income</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Income</DialogTitle>
              </DialogHeader>
              <EarningsForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earnings.map((earning) => (
                <TableRow key={earning.id}>
                  <TableCell>{format(new Date(earning.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell className="text-right">${Number(earning.amount).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
