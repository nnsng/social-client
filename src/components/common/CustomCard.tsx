import { Card } from '@mui/material';
import { themeMixins } from '~/utils/theme';

export function CustomCard(props: any) {
  return (
    <Card
      {...props}
      sx={{
        ...themeMixins.paperBorder(),
        width: '100%',
        p: 2,
        mb: 2,
        ...props.sx,
      }}
    />
  );
}
