'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/axios';
import { setCookie } from '@/actions/set-cookie';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '@/actions/get-cookie';
import { deleteCookie } from '@/actions/delete-cookie';

export const AuthContext = createContext<{
  payload: { idUser: string; type: string } | any;
  signIn: (email: string, password: string) => any;
  signOut: () => any;
  logged: boolean;
}>({
  payload: { idUser: '', type: '' },
  signIn: () => {},
  signOut: () => {},
  logged: false,
});

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [payload, setPayload] = useState<{ idUser: string; type: string }>();

  const router = useRouter();

  const getPayload = async () => {
    const payloadFound = await getCookie('payload');

    if (payloadFound) {
      setPayload(JSON.parse(payloadFound.value));
    }
  };

  useEffect(() => {
    getPayload();
  }, []);

  const signIn = async (email: string, password: string) => {
    const payloadFound = await login(email, password);
    if (!payloadFound) return false;

    if (payloadFound.token) {
      const decoded: PayloadDto = jwtDecode(payloadFound.token);
      const payloadFormatted = { idUser: decoded.sub, type: decoded.type };
      setPayload(payloadFormatted);

      await setCookie('payload', JSON.stringify(payloadFormatted));
      await setCookie('token', payloadFound.token);

      router.push('/');
    }

    return payloadFound;
  };

  const signOut = async () => {
    setPayload(undefined);
    await deleteCookie('payload');
    await deleteCookie('token');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        payload,
        signIn,
        signOut,
        logged: !!payload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
