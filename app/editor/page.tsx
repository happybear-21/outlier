'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CircleIcon } from 'lucide-react';

function Editor() {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get('workspace-id');
  console.log(workspaceId);

  return (
    <div className='px-4 py-2 md:px-6 md:py-4 lg:px-8 h-[90svh]'>
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
