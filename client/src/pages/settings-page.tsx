import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [recurringAlerts, setRecurringAlerts] = useState(true);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and account settings</p>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you want to be notified about your finances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your financial activity
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recurring Expense Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified before recurring expenses are due
                  </p>
                </div>
                <Switch
                  checked={recurringAlerts}
                  onCheckedChange={setRecurringAlerts}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label>Account Type</Label>
                <p className="text-sm text-muted-foreground">Personal Account</p>
              </div>
              <div className="space-y-1">
                <Label>Date Format</Label>
                <p className="text-sm text-muted-foreground">MM/DD/YYYY</p>
              </div>
              <div className="space-y-1">
                <Label>Currency</Label>
                <p className="text-sm text-muted-foreground">USD ($)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
