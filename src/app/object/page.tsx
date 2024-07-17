'use client';

import { Object } from '@/templates/Object';
import { useSearchParams } from 'next/navigation';

export default function ObjectScreen() {
  const search = useSearchParams();
  const idObject = search.get('idObject');

  return <Object idObject={idObject} />;
}
