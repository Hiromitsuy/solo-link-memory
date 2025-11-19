import { Button } from 'antd';
import useAuthContext from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../controller/auth';

export default function SingOutButton() {
  const { authInfo } = useAuthContext();

  const onClickSignOut = () => {
    signOut(auth);
  };

  if (!authInfo) return <></>;
  return (
    <Button variant="outlined" onClick={onClickSignOut}>
      サインアウト
    </Button>
  );
}
