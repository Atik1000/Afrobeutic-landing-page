import { MAX_WIDTH_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MaxWidth({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6", MAX_WIDTH_CLASS, className)}>
      {children}
    </div>
  );
}
