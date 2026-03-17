"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];
const NavItems = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-2">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            pathname === href && "bg-primary/10 text-primary",
            "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
