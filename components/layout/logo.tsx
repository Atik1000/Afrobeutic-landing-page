import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-semibold tracking-tight text-xl text-foreground ${className ?? ""}`}
    >
      <span className="text-primary">Afro</span>beutic
    </Link>
  );
}
