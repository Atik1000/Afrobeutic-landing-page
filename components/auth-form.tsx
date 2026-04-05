"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export function AuthForm() {
  const customerForm = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const salonForm = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onCustomer = customerForm.handleSubmit(() => {
    /* mock */
  });
  const onSalon = salonForm.handleSubmit(() => {
    /* mock */
  });

  return (
    <Card className="rounded-2xl border-0 shadow-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Sign in as a customer or salon partner. Demo only — no real auth.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl">
            <TabsTrigger value="customer" className="rounded-lg">
              Customer
            </TabsTrigger>
            <TabsTrigger value="salon" className="rounded-lg">
              Salon login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="customer" className="mt-6 space-y-4">
            <form onSubmit={onCustomer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  className="h-12 rounded-lg px-4"
                  {...customerForm.register("email")}
                />
                {customerForm.formState.errors.email ? (
                  <p className="text-xs text-destructive">
                    {customerForm.formState.errors.email.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-password">Password</Label>
                <Input
                  id="c-password"
                  type="password"
                  className="h-12 rounded-lg px-4"
                  {...customerForm.register("password")}
                />
                {customerForm.formState.errors.password ? (
                  <p className="text-xs text-destructive">
                    {customerForm.formState.errors.password.message}
                  </p>
                ) : null}
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-lg text-base shadow-md transition-shadow hover:shadow-lg"
              >
                Continue
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="salon" className="mt-6 space-y-4">
            <form onSubmit={onSalon} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="s-email">Business email</Label>
                <Input
                  id="s-email"
                  type="email"
                  className="h-12 rounded-lg px-4"
                  {...salonForm.register("email")}
                />
                {salonForm.formState.errors.email ? (
                  <p className="text-xs text-destructive">
                    {salonForm.formState.errors.email.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-password">Password</Label>
                <Input
                  id="s-password"
                  type="password"
                  className="h-12 rounded-lg px-4"
                  {...salonForm.register("password")}
                />
                {salonForm.formState.errors.password ? (
                  <p className="text-xs text-destructive">
                    {salonForm.formState.errors.password.message}
                  </p>
                ) : null}
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-lg text-base shadow-md transition-shadow hover:shadow-lg"
              >
                Salon dashboard
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
