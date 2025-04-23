import type { BoxProps } from '@mui/material';

import { Box, Stack, useTheme, Container, Typography } from '@mui/material'; // Обновлен путь к изображению телефона

import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/global-config';

import { Image } from 'src/components/image';

import { StoreButtons } from './components/store-buttons';

// ----------------------------------------------------------------------

export function HomeApp({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();

  const theme = useTheme();

  const renderMobileAppSection = (
    <Stack
      direction={{ xs: 'column-reverse', md: 'row' }}
      alignItems={{ xs: 'center', md: 'end' }}
      justifyContent="center"
      spacing={5}
      sx={[
        (th) => ({
          ...th.mixins.bgGradient({
            images: [
              `linear-gradient(45deg, ${th.vars.palette.primary.dark} 0%, ${th.vars.palette.primary.main} 55%, ${theme.vars.palette.primary.lighter} 100% )`,
            ],
          }),
          ...th.applyStyles('dark', {
            ...th.mixins.bgGradient({
              images: [
                `linear-gradient(45deg, ${th.vars.palette.primary.dark} 0%, ${th.vars.palette.primary.main} 55%, ${theme.vars.palette.primary.lighter} 100% )`,
              ],
            }),
          }),
          position: 'relative',
          pt: { xs: 5, md: 0 },
          px: { xs: 2 },
          mt: { xs: 2, md: 5 },
          mx: { xs: -2, md: 0 },
          borderRadius: 1,
          textAlign: 'left',
          [theme.breakpoints.down('md')]: {
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: '50%',
              bottom: 0,
              zIndex: 1,
              height: 240,
              width: '200%',
              boxShadow: 'inset 0px 10px 20px rgba(244, 170, 22, 0.5)',
              background:
                'linear-gradient(180deg, rgba(255, 232, 160, 0.5) 0%, rgba(244, 170, 22, 1) 100%)',
              transform: 'rotate(-7deg) translate(-50%,0)',
              opacity: 0.7,
              pointerEvents: 'none',
              filter: 'blur(140px)',
            },
          },
        }),
      ]}
    >
      <Box>
        <Image
          src={`${CONFIG.assetsDir}/assets/illustrations/iphone.png`}
          alt="Mobile App Screenshot"
          sx={{
            maxWidth: 450,
            width: '100%',
            mt: { xs: 0, md: -5 },
            // [theme.breakpoints.down('md')]: {
            //   boxShadow: '0 4px 6px rgba(255, 232, 160, 0.5), 0 10px 15px rgba(244, 170, 22, 1)',
            // },
          }}
        />
      </Box>
      <Stack
        alignItems={{ xs: 'start', md: 'start' }}
        sx={{
          gap: { xs: 2, md: 3 },
          py: { xs: 0, md: 10 },
          maxWidth: { xs: 'none', sm: 480 },
        }}
      >
        <Typography variant="h3" sx={{ color: 'text.primary' }}>
          {t('pages.home.forTheBest')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          {t('pages.home.mineCall')}
        </Typography>
        <Stack
          width="100%"
          direction="row"
          justifyContent={{ xs: 'center', md: 'start' }}
          sx={{
            [theme.breakpoints.down('md')]: {
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translate(-50%,0)',
              zIndex: 2,
            },
          }}
        >
          <StoreButtons />
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <Container maxWidth="xl">{renderMobileAppSection}</Container>
    </Box>
  );
}
