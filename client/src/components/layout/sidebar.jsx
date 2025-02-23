import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Wallet,
  PiggyBank,
  Target,
  Settings,
  DollarSign,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Expenses", href: "/expenses", icon: Wallet },
  { name: "Income", href: "/income", icon: DollarSign },
  { name: "Budget", href: "/budget", icon: PiggyBank },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card px-4">
      <div className="flex h-14 items-center border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <DollarSign className="h-6 w-6" />
          <span>WealthWizard</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 