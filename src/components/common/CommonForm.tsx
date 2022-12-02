import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { MuiTextField } from 'components/formFields';
import { FormField } from 'models';
import { ReactNode } from 'react';
import { useForm, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ObjectSchema } from 'yup';

export interface CommonFormProps {
  name: string;
  fieldList: FormField[];
  control: Control<any>;
  onSubmit?: (formValues: any) => void;
  submitting?: boolean;
  commonProps?: { [key: string]: any };
  avatarField?: ReactNode;
  onForgotPassword?: () => void;
}

export function CommonForm(props: CommonFormProps) {
  const {
    name,
    fieldList,
    control,
    onSubmit,
    submitting,
    commonProps,
    avatarField,
    onForgotPassword,
  } = props;

  const { t } = useTranslation(name);

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Stack direction="column" spacing={2}>
        {fieldList.map((field) =>
          field.name === 'avatar' ? (
            avatarField
          ) : (
            <MuiTextField
              key={field.name}
              name={field.name}
              control={control}
              variant="outlined"
              placeholder={t(`label.${field.name}`)}
              title={t(`label.${field.name}`)}
              rounded
              // sx={{ maxWidth: 400 }}
              {...(commonProps || {})}
              {...(field.props || {})}
            />
          )
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            startIcon={submitting && <CircularProgress size={20} />}
            sx={{ borderRadius: 40, fontSize: 13 }}
          >
            {t('submit')}
          </Button>

          {onForgotPassword && (
            <Button
              onClick={onForgotPassword}
              sx={{
                mt: { xs: 1, sm: 0 },
                ml: { xs: 0, sm: 3 },
              }}
            >
              {t('forgotPassword')}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
