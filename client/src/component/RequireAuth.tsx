import SignIn from '../pages/signin';
import useAuthContext from './AuthContext';

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authInfo, isLoading } = useAuthContext();
  if (isLoading) {
    return <></>;
  }
  return authInfo ? children : <SignIn />;
}
