import { getWorkspaceById } from "@/lib/db/queries/workspaces";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';
import { BackButton } from "@/components/ui/back-button";

interface WorkspacePageProps {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  noStore();

  const workspace = await getWorkspaceById(params.workspaceId);

  if (!workspace) {
    notFound();
  }

  return (
    <div className="px-6 py-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <BackButton href="/" />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{workspace.title}</h1>
        <p className="text-muted-foreground mt-1">
          Workspace ID: {workspace.id}
        </p>
        {workspace.createdAt && (
          <p className="text-muted-foreground text-sm">
            Created: {new Date(workspace.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Workspace Content</h2>
        {workspace.data ? (
          <p className="text-muted-foreground">{workspace.data}</p>
        ) : (
          <p className="text-muted-foreground italic">No content available</p>
        )}
      </div>
    </div>
  );
}