'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CircleIcon } from 'lucide-react';
import { filesByWorkspace } from '@/data/files';

function Editor() {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get('workspace-id');
  const fileId = searchParams.get('file-id');

  let filename = '';
  if (workspaceId && fileId && filesByWorkspace[workspaceId]) {
    const file = filesByWorkspace[workspaceId].find(f => f.id === fileId);
    filename = file ? file.name : '';
  }

  return (
    <div className='px-4 py-2 md:px-6 md:py-4 lg:px-8 h-[90svh]'>
      {filename ? (
        <div className="text-xl font-semibold">{filename}</div>
      ) : (
        <div className="text-muted-foreground">No file selected</div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div><CircleIcon /></div>}>
      <Editor />
    </Suspense>
  );
}
