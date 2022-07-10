import { CheckBoxRounded, CloseRounded, SquareRounded } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioProps,
  Stack,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { configActions, selectLanguage, selectThemeColor } from 'features/common/configSlice';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedThemeColors } from 'utils/theme';
import { supportedLanguages } from 'utils/translation';
import { ThemeSwitch } from '.';

export interface IAppearanceDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AppearanceDialog(props: IAppearanceDialogProps) {
  const { open, onClose } = props;

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const themeColor = useAppSelector(selectThemeColor);
  const language = useAppSelector(selectLanguage);

  const handleUpdateConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(configActions.update({ [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ m: 0, px: 3, py: 2 }}>
        <Typography fontSize={18} fontWeight={600}>
          {t('appearanceDialog.title')}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          px: 3,
          py: 3,
          '& .MuiTypography-root': {
            width: 120,
            mr: 2,
          },
        }}
      >
        <Stack direction="column" spacing={3}>
          <Stack
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
            }}
          >
            <Typography fontWeight={500}>{t('appearanceDialog.darkMode')}</Typography>
            <ThemeSwitch sx={{ ml: '2px' }} />
          </Stack>

          <Stack
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
              '& .MuiSvgIcon-root': {
                fontSize: 28,
              },
            }}
          >
            <Typography fontWeight={500}>{t('appearanceDialog.themeColor')}</Typography>
            <Stack sx={{ ml: '-3px' }}>
              {supportedThemeColors.map((color) => (
                <ColorRadio
                  key={color}
                  name="color"
                  value={color}
                  iconColor={color}
                  checked={themeColor === color}
                  onChange={handleUpdateConfig}
                />
              ))}
            </Stack>
          </Stack>

          <Stack
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
            }}
          >
            <Typography fontWeight={500}>{t('appearanceDialog.language')}</Typography>

            <Stack
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                ml: 1,
              }}
            >
              {supportedLanguages.map(({ code, name }) => (
                <FormControlLabel
                  key={code}
                  control={
                    <Radio
                      name="lang"
                      value={code}
                      checked={language === code}
                      onChange={handleUpdateConfig}
                    />
                  }
                  label={name}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

interface IColorRatioProps extends RadioProps {
  iconColor: string;
}

function ColorRadio({ iconColor, ...otherProps }: IColorRatioProps) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      checkedIcon={<CheckBoxRounded sx={{ color: iconColor }} />}
      icon={<SquareRounded sx={{ color: iconColor }} />}
      {...otherProps}
    />
  );
}
