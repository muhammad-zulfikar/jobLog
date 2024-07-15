"use client";

import Link from "next/link";
import { ThemeSwitch } from "../theme/theme-switch";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 max-w-3xl mx-auto border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-end mx-3 md:mx-8">
        <nav className="flex items-center gap-4 text-sm lg:gap-6 text-foreground/60">
          <Link
            href="/"
            className={`${pathname === "/" ? "text-foreground/80 font-semibold" : "transition-colors hover:text-foreground/80"
              }`}
          >
            Home
          </Link>
          <Link
            href="/tasks"
            className={`${pathname === "/tasks" ? "text-foreground/80 font-semibold" : "transition-colors hover:text-foreground/80"
              }`}
          >
            About
          </Link>
          <ThemeSwitch />
        </nav>
      </div>
      <div className="border-t border-border/50"></div>
    </header>
  );
};

export default Header;
