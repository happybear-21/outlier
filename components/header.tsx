import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { SettingsIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b-[0.4px]">
      <h1>Hi, John</h1>
      <div className="flex space-x-2 items-center">
        <ModeToggle />
        <Button asChild>
          <Link href="/">
            <HomeIcon />
            <span className="hidden md:flex">Home</span>
          </Link>
        </Button>
        <Button asChild>
          <Link href="/settings">
            <SettingsIcon />
            <span className="hidden md:flex">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}