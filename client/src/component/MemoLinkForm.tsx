import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function MemoLinkForm() {
  return (
    <Box
      sx={{
        p: '1.5em',
        borderRadius: 4,
        border: 2,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h6" component="h2">
        興味のあるリンクをメモ
      </Typography>
      <Box>
        <form>
          <TextField id="" />
        </form>
      </Box>
    </Box>
  );
}
