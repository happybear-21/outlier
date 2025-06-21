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

  // Client-side filtering
  const filteredWorkspaces = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialWorkspaces;
    }

    const query = searchQuery.toLowerCase().trim();
    return initialWorkspaces.filter(workspace =>
      workspace.title.toLowerCase().includes(query) ||
      (workspace.data && workspace.data.toLowerCase().includes(query))
    );
  }, [initialWorkspaces, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const workspaceCards = useMemo(() => {
    return filteredWorkspaces.map((workspace) => (
      <WorkspaceCard key={workspace.id} workspace={workspace} />
    ));
  }, [filteredWorkspaces]);

  return (
    <div className="space-y-6">
      <div className="max-w-md">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaceCards}
        </div>
      )}
    </div>
  );
}); 