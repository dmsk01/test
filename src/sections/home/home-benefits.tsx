import { Box, Grid, Stack, Avatar, Container, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

const FEATURES = [
  {
    key: 'feature1',
    icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-raise.svg`,
  },
  {
    key: 'feature2',
    icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-payment.svg`,
  },
  {
    key: 'feature3',
    icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-account.svg`,
  },
  {
    key: 'feature4',
    icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-refund.svg`,
  },
];

export default function HomeBenefits() {
  const { t, i18n } = useTranslate();
  console.log(i18n.language);

  return (
    <Container sx={{ marginBottom: 10 }}>
      <Box sx={{ py: 8, mx: { xs: 'auto', md: 0 } }}>
        <Grid container spacing={4}>
          {FEATURES.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  alt={item.icon}
                  src={item.icon}
                  sx={{
                    width: 48,
                    height: 48,
                    mx: { xs: 0, md: 'auto' },
                  }}
                />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {t(`pages.home.features.${item.key}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`pages.home.features.${item.key}.description`)}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
