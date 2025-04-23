import type { BoxProps } from '@mui/material';

import { Link, Stack, Button, useTheme } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

export const CallForConnectButtons = ({ sx }: BoxProps) => {
  const { t } = useTranslate();

  const theme = useTheme();
  return (
    <Stack
      sx={{
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        ...sx,
      }}
      alignItems="center"
      justifyContent="center"
      direction="row"
      spacing={2.5}
    >
      <Button
        sx={{
          backgroundColor: theme.vars.palette.primary.main,
          fontWeight: 500,
          width: { xs: '100%', md: 'auto' },
          whiteSpace: 'nowrap',
        }}
        component={RouterLink}
        href={paths.dashboard.root}
        color="inherit"
        size="large"
        variant="contained"
        //@ts-expect-error Iconify not recognized as valid ReactNode, but renders fine
        startIcon={<Iconify width={24} icon="iconoir:flash" />}
      >
        <span>{t('shared.callForConnect.callForConnect')}</span>
      </Button>

      <Link
        color="inherit"
        variant="body2"
        target="_blank"
        rel="noopener"
        href={paths.freeUI}
        sx={{
          gap: 0.5,
          alignItems: 'center',
          justifyItems: 'center',
          display: 'inline-flex',
        }}
      >
        {t('shared.howToConnect')}
        <Iconify width={16} icon="eva:diagonal-arrow-right-up-fill" />
      </Link>
    </Stack>
  );
};
