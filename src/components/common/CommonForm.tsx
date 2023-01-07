import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MuiTextField } from '~/components/formFields';
import { FormField } from '~/models';

export interface CommonFormProps {
  name: string;
  fieldList: FormField[];
  control: Control<any>;
  submitting?: boolean;
  commonProps?: { [key: string]: any };
  avatarField?: ReactNode;
  horizontal?: boolean;
  labelWidth?: number;
  action?: ReactNode;
  onSubmit?: (formValues: any) => void;
}

export function CommonForm(props: CommonFormProps) {
  const {
    name,
    fieldList,
    control,
    submitting,
    commonProps = {},
    avatarField = null,
    horizontal,
    labelWidth = 120,
    action = null,
    onSubmit,
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
              horizontal={horizontal}
              labelWidth={labelWidth}
              {...commonProps}
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
            sx={{
              ml: horizontal ? `${labelWidth}px` : 0,
              borderRadius: 40,
              fontSize: 13,
            }}
          >
            {t('submit')}
          </Button>

          {action}
        </Stack>
      </Stack>
    </Box>
  );
}
