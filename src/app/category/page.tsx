import { Suspense } from 'react';
import { Category } from '@/templates';

export default function ObjectPage() {
  return (
    <Suspense>
      <Category />
    </Suspense>
  );
}
