import type { Metadata } from "next";
import Image from "next/image";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Afrobeutic as a customer or salon partner.",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1522337360868-61413f2ce840?w=1200&h=1600&fit=crop"
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-md text-balance">
          <p className="font-heading text-3xl font-semibold">
            Your next appointment, one tap away.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Trusted by salons and freelancers in 40+ cities (demo).
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
