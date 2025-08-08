import { Button } from "@/components/ui/button"
import WorkspaceCard from "@/components/workspace-card"
import { yellowTail } from "@/lib/font"
import { PlusIcon } from "lucide-react"

export default function Home() {
  const workspaces = Array.from({ length: 8 }).map((_, index) => ({
    name: `Workspace ${index + 1}`,
    createdAt: "Aug 1, 2025",
    updatedAt: "Aug 7, 2025",
  }));

  return (
    <div className="px-4 py-2 md:px-6 md:py-4 lg:px-8 h-[90svh] md:h-[87svh] flex flex-col">
      <div className="flex items-center w-full">
        <h1 className={`${yellowTail.className} text-3xl md:text-5xl`}>Workspaces</h1>
        <div className="flex-grow border-b border-gray-400 ml-4"></div>
      </div>
      <div className="flex flex-row items-center justify-end space-x-4">
        <Button>
          <PlusIcon />
          <span className="hidden md:flex">New Workspace</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {workspaces.map((workspace, index) => (
          <WorkspaceCard
            key={index}
            name={workspace.name}
            createdAt={workspace.createdAt}
            updatedAt={workspace.updatedAt}
          />
        ))}
        <div className="flex flex-col items-center justify-center px-4 py-4 border-[2.5px] border-dashed w-full relative h-[10rem] rounded">
          <PlusIcon className="h-[3rem] w-[3rem] text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}