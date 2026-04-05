import { MaxWidth } from "@/components/layout/max-width";
import type { Metadata } from "next";

export function ContentPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <MaxWidth className="max-w-3xl">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </MaxWidth>
    </section>
  );
}

export function contentMetadata(
  title: string,
  description: string,
): Metadata {
  return { title, description };
}
