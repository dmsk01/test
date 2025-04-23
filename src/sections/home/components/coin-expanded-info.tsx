'use client';

import { Box, Stack } from '@mui/material';

import MiningChart from 'src/components/chart/mining-chart';
import { MiningCalculator } from 'src/components/mining-calculator';

import type { CoinInfo } from './coin-card';

export const CoinExpandedInfo = ({ coin }: { coin: CoinInfo }) => (
  <Stack
    direction={{ xs: 'column', lg: 'row' }}
    sx={{
      gap: { xs: 3, md: 2 },
      maxWidth: '100%',
      py: 1,
      px: 2,
    }}
  >
    <Box
      sx={{
        width: { xs: '100%', lg: '50%' },
        p: { xs: 2, md: 5 },
        borderRadius: 2,
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.12), 0px -4px 4px rgba(0, 0, 0, 0.04)',
      }}
    >
      <MiningChart coin={coin} />
    </Box>
    <Box
      sx={{
        width: { xs: '100%', lg: '50%' },
        p: { xs: 3, md: 5 },
        borderRadius: 2,
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.12), 0px -4px 4px rgba(0, 0, 0, 0.04)',
      }}
    >
      <MiningCalculator />
    </Box>
  </Stack>
);
