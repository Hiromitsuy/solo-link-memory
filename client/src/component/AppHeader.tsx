import { Menu, Layout, Typography } from 'antd';
const { Header } = Layout;

export default function AppHeader() {
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography style={{ color: '#fcfcfc', fontFamily: 'Delius Unicase' }}>
        Memo LINK
      </Typography>
      <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
    </Header>
  );
}
