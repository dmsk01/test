import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  const { t } = useTranslate();
  return (
    <Button
      component={RouterLink}
      href={CONFIG.auth.redirectPath}
      variant="outlined"
      sx={{
        backgroundColor: (theme) => theme.vars.palette.grey[900],
        color: (theme) => theme.vars.palette.grey[200],
        ...sx,
      }}
      {...other}
    >
      {t('shared.signIn')}
    </Button>
  );
}
