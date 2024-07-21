'use server';

import { cookies } from 'next/headers';

export const getCookie = async (name: string) => {
  'use server';

  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie;
};
