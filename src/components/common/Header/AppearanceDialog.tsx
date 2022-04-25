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
import {
  configActions,
  selectLanguage,
  selectShowConfig,
  selectThemeColor,
} from 'features/common/configSlice';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedThemeColors } from 'utils/theme';
import { supportedLanguages } from 'utils/translation';
import ThemeSwitch from './ThemeSwitch';

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

export default function AppearanceDialog() {
  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const showConfig = useAppSelector(selectShowConfig);
  const themeColor = useAppSelector(selectThemeColor);
  const language = useAppSelector(selectLanguage);

  const closeDialog = () => {
    dispatch(configActions.setShowConfig(false));
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = event.target.value;
    dispatch(configActions.changeThemeColor(selectedColor));
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLanguage = event.target.value;
    dispatch(configActions.changeLanguage(selectedLanguage));
  };

  return (
    <div>
      <Dialog onClose={closeDialog} open={showConfig}>
        <DialogTitle sx={{ m: 0, px: 3, py: 2 }}>
          <Typography variant="h6" component="div" fontWeight={600}>
            {t('appearanceDialog.title')}
          </Typography>

          <IconButton
            onClick={closeDialog}
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
                flexFlow: { xs: 'column', sm: 'row' },
                alignItems: { sm: 'center' },
              }}
            >
              <Typography fontWeight={500}>{t('appearanceDialog.darkMode')}</Typography>
              <ThemeSwitch sx={{ ml: '2px' }} />
            </Stack>

            <Stack
              alignItems="center"
              sx={{
                flexFlow: { xs: 'column', sm: 'row' },
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
                    value={color}
                    iconColor={color}
                    checked={themeColor === color}
                    onChange={handleColorChange}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack
              sx={{
                flexFlow: { xs: 'column', sm: 'row' },
                alignItems: { sm: 'center' },
              }}
            >
              <Typography fontWeight={500}>{t('appearanceDialog.language')}</Typography>

              <Stack ml={1}>
                {supportedLanguages.map(({ code, name }) => (
                  <FormControlLabel
                    key={code}
                    control={
                      <Radio
                        value={code}
                        checked={language === code}
                        onChange={handleLanguageChange}
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
    </div>
  );
}
