import { Suspense } from 'react';
import { Category } from '@/templates/category';

export default function ObjectPage() {
  return (
    <Suspense>
      <Category />
    </Suspense>
  );
}
