import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export function SignUpButton({ sx, ...other }: ButtonProps) {
  const { t } = useTranslate();
  return (
    <Button
      component={RouterLink}
      href={paths.auth.jwt.signUp}
      variant="contained"
      sx={sx}
      {...other}
    >
      {t('shared.signUp')}
    </Button>
  );
}
