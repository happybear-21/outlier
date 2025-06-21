import { getWorkspaces } from "@/lib/db/queries/workspaces"
import { CreateWorkspaceDialog } from "@/components/workspace/create-workspace-dialog"
import { WorkspacesList } from "@/components/workspace/workspaces-list"
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  noStore()
  const workspaces = await getWorkspaces()

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-none">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Workspaces</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Create and manage your workspaces
            </p>
          </div>
          <div className="flex-shrink-0">
            <CreateWorkspaceDialog />
          </div>
        </div>

        <WorkspacesList initialWorkspaces={workspaces} />
      </div>
    </div>
  )
}