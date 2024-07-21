'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/config/axios';
import { setCookie } from '@/actions/set-cookie';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '@/actions/get-cookie';
import { deleteCookie } from '@/actions/delete-cookie';

export const AuthContext = createContext<{
  payload: PayloadDto | any;
  signIn: (email: string, password: string) => any;
  signOut: () => any;
  logged: boolean;
}>({
  payload: { sub: '', type: '' },
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
    console.log('payload: ', payloadFound);

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
      const payloadFormated = { idUser: decoded.sub, type: decoded.type };
      setPayload(payloadFormated);

      await setCookie('payload', JSON.stringify(payloadFormated));
      await setCookie('token', payloadFound.token);

      router.push('/');
    }

    return payloadFound;
  };

  const signOut = () => {
    setPayload(undefined);
    deleteCookie('user');
    router.push('/login');
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
