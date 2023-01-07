import { Grid } from '@mui/material';
import { HashtagInput } from '~/components/common';
import { Control, useController } from 'react-hook-form';

export interface HashtagInputFieldProps {
  name: string;
  control: Control<any>;
  max?: number;
  label?: string;
  placeholder?: string;
  errorText?: string;
}

export function HashtagInputField(props: HashtagInputFieldProps) {
  const { name, control, ...hashtagInputProps } = props;

  const {
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <Grid item xs>
      <HashtagInput name={name} value={value} onChange={onChange} {...hashtagInputProps} />
    </Grid>
  );
}
