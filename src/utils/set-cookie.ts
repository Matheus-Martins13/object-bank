'use server';
import { cookies } from 'next/headers';

export const setCookie = (name: string, value: any) => {
  'use server';
  cookies().set(name, value);
};
