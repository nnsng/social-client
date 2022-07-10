import { InputBase, InputBaseProps } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface IInputFieldProps extends InputBaseProps {
  name: string;
  control: Control<any>;
}

export function InputField(props: IInputFieldProps) {
  const { name, control, ...restProps } = props;

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid },
  } = useController({ name, control });

  return (
    <InputBase
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      fullWidth
      {...restProps}
    />
  );
}
