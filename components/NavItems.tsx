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
    <nav className="flex items-center gap-4 ">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            pathname === href && "text-primary font-bold",
            "relative after:block after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
