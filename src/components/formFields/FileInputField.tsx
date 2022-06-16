import { useAppDispatch } from 'app/hooks';
import { uploadActions } from 'features/common/uploadSlice';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import { getImageUrlFromCDN } from 'utils/common';
import { showErrorToast } from 'utils/toast';

export interface IFileInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
}

export function FileInputField(props: IFileInputFieldProps) {
  const { name, control, ...inputProps } = props;

  const {
    field: { onChange },
  } = useController({ name, control });

  const dispatch = useAppDispatch();

  const handleFileInputChange = async (e: any) => {
    dispatch(uploadActions.setLoading(true));

    try {
      const image = e.target.files[0];
      const imageUrl = await getImageUrlFromCDN(image);
      onChange(imageUrl);
    } catch (error) {
      showErrorToast(error);
    }

    dispatch(uploadActions.setLoading(false));
  };

  return (
    <input type="file" accept="image/*" onChange={handleFileInputChange} hidden {...inputProps} />
  );
}
