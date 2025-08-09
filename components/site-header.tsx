import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Settings } from "lucide-react";

export default function SiteHeader() {
  return (
    <div className="px-4 py-2 md:px-6 md:py-4 lg:px-8 flex flex-row items-center justify-between w-full">
      <Link href="/" className="text-xl">Outlier</Link>
      <div className="flex flex-row items-center space-x-4">
        <Link href="/settings">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Link>
        <ModeToggle />
      </div>
    </div>
  )
}