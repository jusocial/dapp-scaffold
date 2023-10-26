import { Box } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ErrorComponentProps {
  error?: Error,
  str?: string
}

export function ErrorComponent({ error, str }: ErrorComponentProps) {

  return (
    <Box
      mt={'30px'}
      textAlign={'center'}
      color={theme => theme.palette.divider}
    >
      <WarningAmberIcon fontSize='large'  sx={{ margin: 'auto' }} />

      <Box
        margin={'auto'}
      >
        {str ? str : 'Something went wrong'}
      </Box>

    </Box>
  )
}
