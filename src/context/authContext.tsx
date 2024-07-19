'use client';

import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/config/axios';
import { setCookie } from '@/utils/set-cookie';

export const AuthContext = createContext<{
  payload: PayloadDto | any;
  signIn: (email: string, password: string) => any;
  logged: boolean;
}>({
  payload: { token: '', expiresIn: '' },
  signIn: () => {},
  logged: false,
});

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [payload, setPayload] = useState();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    const payloadFound = await login(email, password);
    if (!payloadFound) return false;

    if (payloadFound.token) {
      setPayload(payload);
      setCookie('payload', payload);
      router.push('/');
    }

    return payloadFound;
  };

  return (
    <AuthContext.Provider
      value={{
        payload,
        signIn,
        logged: !!payload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
