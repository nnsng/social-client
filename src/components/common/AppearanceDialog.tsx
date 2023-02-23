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
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, THEME_COLORS } from '~/constants';
import { UserConfigKey } from '~/models';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectUserConfig, userActions } from '~/store/slices/userSlice';
import { ThemeSwitch } from '.';

export interface AppearanceDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AppearanceDialog(props: AppearanceDialogProps) {
  const { open, onClose } = props;

  const { t } = useTranslation('appearanceDialog');

  const dispatch = useAppDispatch();
  const { mode, mainColor, language } = useAppSelector(selectUserConfig);
  const isDarkMode = mode === 'dark';

  const handleUpdateConfig = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as UserConfigKey;
    const value = e.target.value;
    dispatch(userActions.updateConfig({ name, value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ m: 0, px: 3, py: 2 }}>
        <Typography fontSize={18} fontWeight={600}>
          {t('title')}
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
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }}>
            <Typography fontWeight={500}>{t('darkMode')}:</Typography>

            <ThemeSwitch
              name="mode"
              value={isDarkMode ? 'light' : 'dark'}
              checked={isDarkMode}
              onChange={handleUpdateConfig}
              sx={{ ml: '2px' }}
            />
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 28,
              },
            }}
          >
            <Typography fontWeight={500}>{t('themeColor')}:</Typography>

            <Stack sx={{ ml: '-3px' }}>
              {THEME_COLORS.map((color) => (
                <ColorRadio
                  key={color}
                  name="mainColor"
                  value={color}
                  iconColor={color}
                  checked={mainColor === color}
                  onChange={handleUpdateConfig}
                />
              ))}
            </Stack>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }}>
            <Typography fontWeight={500}>{t('language')}:</Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} ml={1}>
              {LANGUAGES.map(({ code, name }) => (
                <FormControlLabel
                  key={code}
                  control={
                    <Radio
                      name="language"
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

interface ColorRadioProps extends RadioProps {
  iconColor: string;
}

function ColorRadio({ iconColor, ...props }: ColorRadioProps) {
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
      {...props}
    />
  );
}
