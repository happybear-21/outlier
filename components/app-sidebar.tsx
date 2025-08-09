"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ChevronDown, PlusCircle, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { workspaces } from "@/data/workspaces";
import { filesByWorkspace } from "@/data/files";

export function AppSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspace-id");
  const fileId = searchParams.get("file-id");

  const [workspaceSearch, setWorkspaceSearch] = useState("");
  const [fileSearch, setFileSearch] = useState("");

  // Automatically select first file when workspace changes
  React.useEffect(() => {
    if (!workspaceId) return;
    const files = getFilesForWorkspace(workspaceId);
    if (files.length === 0) return;
    // If no file-id in URL or file-id is not in current files, set to first file
    if (!fileId || !files.some(f => f.id === fileId)) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("workspace-id", workspaceId);
      params.set("file-id", files[0].id);
      router.replace(`?${params.toString()}`);
    }
  }, [workspaceId]);

  const getFilteredWorkspaces = () =>
    workspaces.filter((w) =>
      w.name.toLowerCase().includes(workspaceSearch.toLowerCase())
    );

  const getCurrentWorkspace = () =>
    workspaces.find((w) => w.id === workspaceId) || null;

  const getFilesForWorkspace = (id: string | null) =>
    id ? filesByWorkspace[id] || [] : [];

  const setWorkspaceId = (id: string) => {
    const files = getFilesForWorkspace(id);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("workspace-id", id);
    if (files.length > 0) {
      params.set("file-id", files[0].id);
    } else {
      params.delete("file-id");
    }
    router.push(`?${params.toString()}`);
    setFileSearch("");
    setWorkspaceSearch("");
  };

  const handleCreateFile = () => {
    alert("Create New File clicked");
  };

  const filteredWorkspaces = getFilteredWorkspaces();
  const currentWorkspace = getCurrentWorkspace();
  const currentFiles = getFilesForWorkspace(workspaceId);

  // Filter files based on fileSearch input
  const filteredFiles = currentFiles.filter((file) =>
    file.name.toLowerCase().includes(fileSearch.toLowerCase())
  );

  return (
    <Sidebar>
      <SidebarHeader className="space-y-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {currentWorkspace ? currentWorkspace.name : "Select Workspace"}
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[16rem] max-h-64 overflow-y-auto space-y-2 p-2">
                <Input
                  placeholder="Search workspaces..."
                  value={workspaceSearch}
                  onChange={(e) => setWorkspaceSearch(e.target.value)}
                  className="w-full text-sm"
                  autoFocus
                />
                {filteredWorkspaces.length > 0 ? (
                  filteredWorkspaces.map((workspace) => (
                    <DropdownMenuItem
                      key={workspace.id}
                      onClick={() => setWorkspaceId(workspace.id)}
                    >
                      {workspace.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground p-2">
                    No workspaces found
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
              onClick={handleCreateFile}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create New File
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup title="Files" className="list-none">
          <Input
            placeholder="Search files..."
            value={fileSearch}
            onChange={(e) => setFileSearch(e.target.value)}
            className="mb-2 w-full text-sm px-2 py-1"
          />
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <SidebarMenuItem key={file.id}>
                <SidebarMenuButton
                  onClick={() => {
                    const params = new URLSearchParams(Array.from(searchParams.entries()));
                    params.set("workspace-id", workspaceId || "");
                    params.set("file-id", file.id);
                    router.push(`?${params.toString()}`);
                  }}
                  className={
                    fileId === file.id
                      ? "bg-accent text-accent-foreground"
                      : undefined
                  }
                >
                  {file.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          ) : (
            <div className="text-sm text-muted-foreground px-4 py-2">
              No files found.
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start text-sm text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Trash
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
