"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface WorkspaceSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function WorkspaceSearch({ onSearch, placeholder = "Search workspaces...", disabled = false }: WorkspaceSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        className="pl-10 pr-4 h-10"
        disabled={disabled}
      />
    </div>
  );
} 