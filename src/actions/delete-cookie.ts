'use server';
import { cookies } from 'next/headers';

export const deleteCookie = async (name: string) => {
  'use server';
  cookies().delete(name);
};
