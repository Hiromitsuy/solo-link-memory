import type { User } from 'firebase/auth';
import { createContext, useContext } from 'react';

export type AuthContextType = {
  authInfo: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  authInfo: null,
  isLoading: false,
});

export default function useAuthContext() {
  return useContext(AuthContext);
}
