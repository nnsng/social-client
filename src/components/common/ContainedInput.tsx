import { SendRounded } from '@mui/icons-material';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';

interface ContainedInputProps extends OutlinedInputProps {
  onSubmit?: () => void;
}

export function ContainedInput({ onSubmit, sx, ...props }: ContainedInputProps) {
  return (
    <OutlinedInput
      endAdornment={
        <SendRounded color="primary" sx={{ ml: 1, cursor: 'pointer' }} onClick={onSubmit} />
      }
      sx={{
        borderRadius: 40,
        bgcolor: 'action.selected',
        '& fieldset': {
          border: '0 !important',
        },
        ...sx,
      }}
      {...props}
    />
  );
}
