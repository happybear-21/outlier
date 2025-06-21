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
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-none">
        <div className="mb-6">
          <BackButton href="/" />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">{workspace.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Workspace ID: {workspace.id}
          </p>
          {workspace.createdAt && (
            <p className="text-muted-foreground text-sm">
              Created: {new Date(workspace.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="bg-card border rounded-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">Workspace Content</h2>
          {workspace.data ? (
            <p className="text-muted-foreground text-sm sm:text-base whitespace-pre-wrap break-words">{workspace.data}</p>
          ) : (
            <p className="text-muted-foreground italic text-sm sm:text-base">No content available</p>
          )}
        </div>
      </div>
    </div>
  );
}