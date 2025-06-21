import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FolderOpen } from "lucide-react";
import { memo, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Workspace {
  id: string;
  title: string;
  createdAt: string | null;
  data?: string | null;
  inTrash?: string | null;
}

interface WorkspaceCardProps {
  workspace: Workspace;
}

export const WorkspaceCard = memo(function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();

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

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold truncate">
            {workspace.title}
          </CardTitle>
          <FolderOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Created {formattedDate}</span>
        </div>
        {workspace.data && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {workspace.data}
          </p>
        )}
      </CardContent>
    </Card>
  );
}); 