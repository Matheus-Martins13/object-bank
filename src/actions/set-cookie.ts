'use server';
import { cookies } from 'next/headers';

export const setCookie = async (name: string, value: any) => {
  'use server';
  cookies().set(name, value, {
    expires: Date.now() + 24 * 60 * 60 * 1000 * 7,
    httpOnly: true,
    secure: true,
  });
};
