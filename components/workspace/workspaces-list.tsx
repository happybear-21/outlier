"use client";

import { useState, useMemo, memo } from "react";
import { WorkspaceCard } from "./workspace-card";
import { WorkspaceSearch } from "./workspace-search";
import { Search } from "lucide-react";

interface Workspace {
  id: string;
  title: string;
  createdAt: string | null;
  data?: string | null;
  inTrash?: string | null;
}

interface WorkspacesListProps {
  initialWorkspaces: Workspace[];
}

export const WorkspacesList = memo(function WorkspacesList({ initialWorkspaces }: WorkspacesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);

  // Client-side filtering
  const filteredWorkspaces = useMemo(() => {
    if (!searchQuery.trim()) {
      return workspaces;
    }

    const query = searchQuery.toLowerCase().trim();
    return workspaces.filter(workspace =>
      workspace.title.toLowerCase().includes(query) ||
      (workspace.data && workspace.data.toLowerCase().includes(query))
    );
  }, [workspaces, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDeleteWorkspace = (workspaceId: string) => {
    setWorkspaces(prev => prev.filter(workspace => workspace.id !== workspaceId));
  };

  const workspaceCards = useMemo(() => {
    return filteredWorkspaces.map((workspace) => (
      <WorkspaceCard
        key={workspace.id}
        workspace={workspace}
        onDelete={handleDeleteWorkspace}
      />
    ));
  }, [filteredWorkspaces]);

  return (
    <div className="space-y-6 w-full">
      <div className="w-full max-w-md">
        <WorkspaceSearch onSearch={handleSearch} />
      </div>

      {filteredWorkspaces.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {searchQuery.trim() ? `No workspaces found for "${searchQuery}"` : "No workspaces found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
          {workspaceCards}
        </div>
      )}
    </div>
  );
}); 