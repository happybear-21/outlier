import { getWorkspaces } from "@/lib/supabase/queries/workspaces"
import { CreateWorkspaceDialog } from "@/components/workspace/create-workspace-dialog"
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  noStore()
  const workspaces = await getWorkspaces()

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl">Workspaces</h1>
        <CreateWorkspaceDialog />
      </div>
      {workspaces.length === 0 ? (
        <p className="text-muted-foreground text-center">No workspaces found.</p>
      ) : (
        <ul className="space-y-2">
          {workspaces.map((workspace) => (
            <li key={workspace.id} className="border p-4 rounded">
              <p className="font-medium">Name: {workspace.title}</p>
              <p className="text-sm text-muted-foreground">ID: {workspace.id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}