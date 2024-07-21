'use server';

import { cookies } from 'next/headers';

export const hasCookie = (name: string) => {
  'use server';

  const cookieStore = cookies();
  const cookie = cookieStore.has(name);
  return cookie;
};
