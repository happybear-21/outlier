import { yellowTail } from "@/lib/font"

export default function Settings() {
  return (
    <div className="px-4 py-2 md:px-6 md:py-4 lg:px-8 h-[90svh] md:h-[87svh] flex flex-col">
      <div className="flex items-center w-full">
        <h1 className={`${yellowTail.className} text-3xl md:text-5xl`}>Settings</h1>
        <div className="flex-grow border-b border-gray-400 ml-4"></div>
      </div>
    </div>
  )
}