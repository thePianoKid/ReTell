"use client";
import Image from "next/image";
import { ModeToggle } from "./ui/toggle-mode";

export default function Nav() {
  return (
    <header className="p-8">
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <Image
              src="/retell.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
