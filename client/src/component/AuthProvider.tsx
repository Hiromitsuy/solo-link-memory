import { useEffect, useState } from 'react';
import { auth } from '../controller/auth';
import { AuthContext, type AuthContextType } from './AuthContext';
import type { User } from 'firebase/auth';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authInfo, setAuthInfo] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  const value: AuthContextType = {
    authInfo,
    isLoading,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log(user);
      setAuthInfo(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext value={value}>{children}</AuthContext>;
}
