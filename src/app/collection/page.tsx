import { Suspense } from 'react';
import { Collection } from '@/templates';

export default function ObjectPage() {
  return (
    <Suspense>
      <Collection />
    </Suspense>
  );
}
