import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  Receipt,
  PiggyBank,
  Target,
  TrendingUp,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Receipt, label: "Expenses", href: "/expenses" },
  { icon: PiggyBank, label: "Budget", href: "/budget" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: TrendingUp, label: "Income", href: "/income" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  return (
    <div className="flex h-screen flex-col border-r bg-sidebar">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-foreground">Finance App</h1>
      </div>
      <ScrollArea className="flex-1 px-4">
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    location === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:text-sidebar-foreground"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
