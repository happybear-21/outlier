import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FolderOpen, Trash2 } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Workspace {
  id: string;
  title: string;
  createdAt: string | null;
  data?: string | null;
  inTrash?: string | null;
}

interface WorkspaceCardProps {
  workspace: Workspace;
  onDelete?: (workspaceId: string) => void;
}

export const WorkspaceCard = memo(function WorkspaceCard({ workspace, onDelete }: WorkspaceCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formattedDate = useMemo(() => formatDate(workspace.createdAt), [workspace.createdAt]);

  const handleClick = () => {
    router.push(`/${workspace.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/workspaces/${workspace.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete?.(workspace.id);
      } else {
        throw new Error('Failed to delete workspace');
      }
    } catch (error) {
      console.error('Error deleting workspace:', error);
      // You could add a toast notification here
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <Card
        className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20 h-full"
        onClick={handleClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-semibold truncate flex-1">
              {workspace.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              <button
                onClick={handleDeleteClick}
                className="p-1 rounded-sm hover:bg-destructive/10 transition-colors"
                title="Delete workspace"
              >
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hover:text-destructive transition-colors" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Created {formattedDate}</span>
          </div>
          {workspace.data && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2 break-words">
              {workspace.data}
            </p>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Workspace"
        description={`Are you sure you want to delete "${workspace.title}"? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}); 