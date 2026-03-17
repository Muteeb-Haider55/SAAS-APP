"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];
const NavItems = () => {
  const pathname = usePathname();
  const router = useRouter();

  const activePath =
    navItems.find(({ href }) => pathname === href || pathname.startsWith(`${href}/`))
      ?.href || "/";

  return (
    <>
      <nav className="hidden items-center gap-2 min-[860px]:flex">
        {navItems.map(({ label, href }) => (
          <Link
            href={href}
            key={label}
            className={cn(
              activePath === href && "bg-primary/10 text-primary",
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="w-[148px] max-[420px]:w-[128px] min-[860px]:hidden">
        <Select value={activePath} onValueChange={(value) => router.push(value)}>
          <SelectTrigger className="input">
            <SelectValue placeholder="Pages" />
          </SelectTrigger>
          <SelectContent>
            {navItems.map(({ label, href }) => (
              <SelectItem key={href} value={href}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default NavItems;
