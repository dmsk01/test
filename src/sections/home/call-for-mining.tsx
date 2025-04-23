import type { BoxProps } from '@mui/material';

import Image from 'next/image';

import { Box, Stack, useTheme, Container, Typography } from '@mui/material'; // Обновлен путь к изображению телефона

import { useTranslate } from 'src/locales';

import { CallForConnectButtons } from './components/call-for-connect-buttons';

// ----------------------------------------------------------------------

export function CallForMining({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();

  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        background: theme.vars.palette.grey[200],
        ...sx,
      }}
      {...other}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1368px', px: { xs: 0 } }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          gap={5}
          sx={{ position: 'relative' }}
        >
          <Stack
            sx={{
              position: 'relative',
              zIndex: 1,
              flexBasis: '50% - 16px',
              height: '100%',
              minHeight: 400,
              px: { xs: 2 },
            }}
            alignItems={{ md: 'start' }}
            justifyContent="center"
          >
            <Typography mb={2} variant="h3">
              {t('shared.callForConnect.title')}
            </Typography>
            <Typography mb={6}> {t('shared.callForConnect.text')}</Typography>
            <CallForConnectButtons width={{ xs: '100%', md: '80%' }} />
          </Stack>
          <Box
            sx={{
              width: { md: '50% - 100px' },
              height: '100%',
              position: { xs: 'absolute', md: 'static' },
              bottom: 0,
              opacity: { xs: 0.15, md: 1 },
            }}
          >
            <Image
              src="/assets/images/home/asic.png"
              alt="Asic miner image"
              width={690}
              height={380}
              style={{
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'left',
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
