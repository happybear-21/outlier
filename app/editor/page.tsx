'use client';

import { useSearchParams } from 'next/navigation';

export default function Editor() {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get('workspace-id');

  return (
    <div className='px-4 py-2 md:px-6 md:py-4 lg:px-8 h-[90svh]'>
      {workspaceId}
    </div>
  );
}
