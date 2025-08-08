import { Button } from "./ui/button";
import Link from "next/link";

interface WorkspaceCardProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function WorkspaceCard({
  id,
  name,
  createdAt,
  updatedAt,
}: WorkspaceCardProps) {
  return (
    <div className="flex flex-col justify-between px-4 py-4 border-[2px] w-full relative h-[10rem] rounded">
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-md font-medium">{name}</h1>
        <Button asChild>
          <Link href={`/editor?workspace-id=${id}`}>Open</Link>
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>Created On: {createdAt}</p>
        <p>Updated On: {updatedAt}</p>
      </div>
    </div>
  );
}

