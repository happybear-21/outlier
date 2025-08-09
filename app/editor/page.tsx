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
    <div className="h-[90svh] w-full flex flex-col items-center overflow-auto">
      {filename ? (
        <>
          <div className="w-full h-48 md:h-56 lg:h-64 rounded-b-2xl shadow bg-gradient-to-br from-gray-800 to-black text-white" />
          <div className="w-full max-w-6xl -mt-12 md:-mt-16 lg:-mt-20 px-4 md:px-0 z-10">
            <div className="flex flex-col items-start">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                {filename}
              </h1>
              <div className="w-full h-[600px] rounded-lg overflow-auto border border-white/10 bg-transparent">
                <BlockNoteView
                  editor={editor} data-theming-css-variables-demo
                  className="h-full w-full bg-secondary text-white prose prose-invert"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-muted-foreground flex-1 flex items-center justify-center">
          No file selected
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className='flex flex-row items-center justify-center h-[90svh]'>
          <CircleIcon className="animate-spin text-muted" />
        </div>
      }
    >
      <Editor />
    </Suspense>
  );
}
