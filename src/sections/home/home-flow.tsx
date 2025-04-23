import type { BoxProps } from '@mui/material';

import { Box, Stack, useTheme, Container, Typography } from '@mui/material'; // Обновлен путь к изображению телефона

import { useTranslate } from 'src/locales';
import SeoIllustration from 'src/assets/illustrations/flow-icons/seo-illustration';
import PaymentsIllustration from 'src/assets/illustrations/flow-icons/payments-illustration';
import ServerErrorIllustration from 'src/assets/illustrations/flow-icons/server-error-illustration';

import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

export function HomeFlow({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();

  const theme = useTheme();

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <Container>
        <SectionTitle
          title={t('pages.home.flow.sectionTitle1')}
          txtGradient={t('pages.home.flow.sectionTitle2')}
          sx={{ maxWidth: '570px', mb: 6 }}
        />
        <Stack direction={{ md: 'row' }} gap={3} sx={{ mb: { xs: 5, sm: 7, md: 10 } }}>
          <Stack justifyContent="center" alignItems="center" sx={{ flexBasis: 'calc(50% - 24px)' }}>
            <SeoIllustration />
          </Stack>
          <Box sx={{ flexBasis: 'calc(50% - 24px)' }}>
            <Typography sx={{ mb: 3 }} variant="h2">
              {t('pages.home.flow.card1.title')}
            </Typography>
            <Typography sx={{ mb: { xs: 3.5, md: 7 } }}>
              {t('pages.home.flow.card2.text')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '40px', sm: '80px', md: '120px' },
                lineHeight: 1,
                fontWeight: 500,
                color: theme.palette.primary.light,
              }}
            >
              01
            </Typography>
          </Box>
        </Stack>
        <Stack direction={{ md: 'row-reverse' }} gap={3} sx={{ mb: { xs: 5, sm: 7, md: 10 } }}>
          <Stack justifyContent="center" alignItems="center" sx={{ flexBasis: 'calc(50% - 24px)' }}>
            <ServerErrorIllustration />
          </Stack>
          <Box sx={{ flexBasis: 'calc(50% - 24px)' }}>
            <Typography sx={{ mb: 3 }} variant="h2">
              {t('pages.home.flow.card2.title')}
            </Typography>
            <Typography sx={{ mb: { xs: 3.5, md: 7 } }}>
              {t('pages.home.flow.card2.text')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '40px', sm: '80px', md: '120px' },
                lineHeight: 1,
                fontWeight: 500,
                color: theme.palette.primary.light,
              }}
            >
              02
            </Typography>
          </Box>
        </Stack>
        <Stack direction={{ md: 'row' }} gap={3} sx={{ mb: { xs: 5, sm: 7, md: 10 } }}>
          <Stack justifyContent="center" alignItems="center" sx={{ flexBasis: 'calc(50% - 24px)' }}>
            <PaymentsIllustration />
          </Stack>
          <Box sx={{ flexBasis: 'calc(50% - 24px)' }}>
            <Typography sx={{ mb: 3 }} variant="h2">
              {t('pages.home.flow.card3.title')}
            </Typography>
            <Typography sx={{ mb: { xs: 3.5, md: 7 } }}>
              {t('pages.home.flow.card3.text')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '40px', sm: '80px', md: '120px' },
                lineHeight: 1,
                fontWeight: 500,
                color: theme.palette.primary.light,
              }}
            >
              03
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
