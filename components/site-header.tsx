import { ModeToggle } from "./mode-toggle";

export default function SiteHeader() {
  return (
    <div className="px-4 py-2 md:px-6 md:py-4 lg:px-8 flex flex-row items-center justify-between w-full">
      <h1 className="text-xl">Outlier</h1>
      <ModeToggle />
    </div>
  )
}