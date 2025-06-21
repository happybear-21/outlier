import { getWorkspaces } from "@/lib/db/queries/workspaces"
import { CreateWorkspaceDialog } from "@/components/workspace/create-workspace-dialog"
import { WorkspacesList } from "@/components/workspace/workspaces-list"
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  noStore()
  const workspaces = await getWorkspaces()

  return (
    <div className="px-6 py-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Workspaces</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your workspaces
          </p>
        </div>
        <CreateWorkspaceDialog />
      </div>

      <WorkspacesList initialWorkspaces={workspaces} />
    </div>
  )
}