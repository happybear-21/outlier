'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CircleIcon } from 'lucide-react';
import { filesByWorkspace } from '@/data/files';
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";


function Editor() {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get('workspace-id');
  const fileId = searchParams.get('file-id');
  const editor = useCreateBlockNote();

  let filename = '';
  if (workspaceId && fileId && filesByWorkspace[workspaceId]) {
    const file = filesByWorkspace[workspaceId].find(f => f.id === fileId);
    filename = file ? file.name : '';
  }

  return (
    <div className="h-[90svh] flex flex-col w-full">
      {filename ? (
        <>
          <div className="text-xl font-semibold px-8 pt-6 pb-2 bg-background shadow-sm shrink-0">
            {filename}
          </div>
          <div className="flex-1 min-h-0 w-full overflow-auto">
            <BlockNoteView editor={editor} className="h-full w-full" />
          </div>
        </>
      ) : (
        <div className="text-muted-foreground flex-1 flex items-center justify-center">No file selected</div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className='flex flex-row items-center justify-center h-[90svh]'><CircleIcon /></div>}>
      <Editor />
    </Suspense>
  );
}
