import type { BoxProps } from '@mui/material/Box';

import Image from 'next/image';
import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { MotionViewport } from 'src/components/animate';

import { FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function HomeVip({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();
  const renderLines = (
    <>
      <FloatPlusIcon sx={{ left: 72, top: '50%', mt: -1 }} />
      <FloatLine vertical sx={{ top: 0, left: 80, height: 'calc(50% + 64px)' }} />
      <FloatLine sx={{ top: '50%', left: 0 }} />
    </>
  );

  const renderVipConditions = (
    <Stack
      sx={{
        maxWidth: { md: '600px' },
        height: { xs: '100%' },
        flex: { xs: 1 },
        textAlign: 'left',
        py: { xs: 0, md: 8, lg: 16 },
        background: (theme) =>
          `linear-gradient(270deg, ${varAlpha(theme.vars.palette.primary.main, 0.08)}, ${varAlpha(theme.vars.palette.primary.main, 0)})`,
        borderRadius: 2,
      }}
    >
      <Box
        component={m.h2}
        sx={{
          mt: 0,
          mb: 1,
          minHeight: '100%',
          color: 'common.white',
          typography: { xs: 'h4', sm: 'h3', md: 'h2' },
        }}
      >
        {t('pages.home.forVip')}
      </Box>
      <Typography sx={{ color: 'common.white', flex: { xs: '1 1 auto' } }}>
        {t('pages.home.vipCall')}
      </Typography>
      <Button
        color="primary"
        size="large"
        variant="contained"
        target="_blank"
        rel="noopener"
        href="https://t.me/smrnv"
        sx={{
          fontWeight: 500,
          mt: 4,
          color: '#fff',
          alignSelf: { xs: 'stretch', md: 'flex-start' },
        }}
      >
        {t('pages.home.getVip')}
      </Button>
    </Stack>
  );

  const renderImg = (
    <m.div>
      <Box
        sx={{
          width: { xs: '360px', lg: '674px' },
          height: { xs: '300px', lg: '425px' },
          flexShrink: 0,
          position: { xs: 'absolute', md: 'static' },
          bottom: 0,
          left: 0,
          opacity: { xs: 0.15, md: 1 },
        }}
      >
        <Image
          width={674}
          height={425}
          style={{
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          alt="Bitcoin for vip"
          src={`${CONFIG.assetsDir}/assets/images/home/btc.png`}
        />
      </Box>
    </m.div>
  );

  const renderBlur = (
    <Box
      sx={{
        top: 0,
        right: 0,
        zIndex: 7,
        width: 240,
        height: 240,
        bgcolor: 'grey.500',
        position: 'absolute',
        filter: 'blur(200px)',
      }}
    />
  );

  return (
    <Box component="section" sx={{ position: 'relative', py: 8, ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container maxWidth="xl" sx={{ p: { xs: 0, md: 2 }, position: 'relative', zIndex: 9 }}>
          <Stack
            spacing={5}
            alignItems="flex-end"
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              px: { xs: 2, md: 5 },
              borderRadius: 3,
              minHeight: { xs: '512px', md: 'auto' },
              overflow: 'hidden',
              bgcolor: 'grey.900',
              position: 'relative',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {renderImg}

            {renderVipConditions}

            {renderBlur}
          </Stack>
        </Container>
      </MotionViewport>
    </Box>
  );
}
