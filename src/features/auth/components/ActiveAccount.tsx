import { AutorenewRounded, ErrorRounded, TaskAltRounded } from '@mui/icons-material';
import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { authApi } from 'api';
import { PageTitle } from 'components/common';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { themeMixins } from 'utils/theme';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';

enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

const statusOptions = {
  color: {
    [Status.PENDING]: 'warning.main',
    [Status.SUCCESS]: 'success.main',
    [Status.ERROR]: 'error.main',
  },
  icon: {
    [Status.PENDING]: AutorenewRounded,
    [Status.SUCCESS]: TaskAltRounded,
    [Status.ERROR]: ErrorRounded,
  },
};

export interface ActiveAccountProps {
  token: string;
}

export default function ActiveAccount({ token }: ActiveAccountProps) {
  const { t } = useTranslation('auth');
  const { toast: toastTranslation } = translateFiles('toast');

  const [status, setStatus] = useState<Status>(Status.PENDING);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await authApi.active(token);
        setStatus(Status.SUCCESS);
      } catch (error) {
        setStatus(Status.ERROR);
        showErrorToast(error);
      }
    })();
  }, [token]);

  const handleReactive = async () => {
    setSubmitting(true);
    try {
      const { _id }: { _id: string } = jwtDecode(token);
      await authApi.reactive(_id);
      toast.info(toastTranslation.auth.activeAccount);
    } catch (error) {
      showErrorToast(error);
    }
    setSubmitting(false);
  };

  const renderIcon = (status: Status) => {
    const StatusIcon = statusOptions.icon[status];
    return <StatusIcon fontSize="medium" color="inherit" />;
  };

  return (
    <>
      <PageTitle title={t('pageTitle.active')} />

      <Container maxWidth="sm">
        <Box mt={3} p={3} sx={{ ...themeMixins.paperBorder() }}>
          <Stack spacing={1} alignItems="center" color={statusOptions.color[status]}>
            {renderIcon(status)}

            <Typography color="inherit" fontSize={20} fontWeight={600}>
              {t(`active.status.${status}`)}
            </Typography>
          </Stack>

          {status === Status.SUCCESS && (
            <Typography fontSize={16}>{t('active.description')}</Typography>
          )}

          {status === Status.ERROR && (
            <Button
              variant="contained"
              size="small"
              disabled={submitting}
              startIcon={submitting && <CircularProgress size={14} />}
              onClick={handleReactive}
              sx={{ mt: 2 }}
            >
              {t('active.reactive')}
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
}
