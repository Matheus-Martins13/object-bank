'use client';

import { Suspense } from 'react';
import { Object } from '@/templates/Object';

export default function ObjectPage() {
  return (
    <Suspense>
      <Object />
    </Suspense>
  );
}
