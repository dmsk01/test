'use client';

import type { BoxProps } from '@mui/material/Box';

import React from 'react';

import { Box, Stack, Container, useMediaQuery } from '@mui/material';

import { CoinCard } from './components/coin-card';
import { CoinTable } from './components/coin-table';

import type { CoinInfo } from './components/coin-card';

// ----------------------------------------------------------------------

// type HashrateCardInfo = {
//   title: string;
//   address: string;
//   ports: Array<number>;
//   workers: Array<string>;
//   password: string;
// };

// type CryptoTokensInfo = Record<CryptoTokenType, HashrateCardInfo>;

// const btcInfo: HashrateCardInfo = {
//   title: 'BTC Connection Details',
//   address: 'stratum+tcp://enter.rupool.pro',
//   ports: [8888, 3333, 443],
//   workers: ['accountname.1', 'accountname.1x1'],
//   password: 'x',
// };

// const ltcInfo: HashrateCardInfo = {
//   title: 'LTC Connection Details',
//   address: 'stratum+tcp://msk.ru.ltc.rupool.pro',
//   ports: [8888, 3333, 443, 25],
//   workers: ['accountname.1', 'accountname.1x1'],
//   password: 'x',
// };

// const cryptoList: CryptoTokensInfo = {
//   [CryptoTokenList.BTC]: btcInfo,
//   [CryptoTokenList.LTC]: ltcInfo,
// };

// Компонент для отображения информации о подключении
// const ConnectionInfo = ({ token }: { token: CryptoTokenType }) => {
//   const theme = useTheme();
//   const data = cryptoList[token] ?? btcInfo;
//   return (
//     <Box
//       sx={{
//         ...bgGradient({
//           color: `135deg, ${theme.vars.palette.info.main}, ${theme.vars.palette.info.dark}`,
//         }),
//         p: 5,
//         borderRadius: 2,
//         position: 'relative',
//         color: 'common.white',
//         height: '100%',
//       }}
//     >
//       <Box
//         component="img"
//         alt="invite"
//         src={`${CONFIG.assetsDir}/assets/illustrations/characters/character-5.webp`}
//         sx={{
//           bottom: 0,
//           right: 16,
//           zIndex: 1,
//           width: 233,
//           height: 375,
//           position: 'absolute',
//           [theme.breakpoints.down('lg')]: {
//             width: 150,
//             height: 241,
//           },
//           [theme.breakpoints.down('sm')]: {
//             width: 60,
//             height: 97,
//           },
//         }}
//       />
//       <Box sx={{ position: 'relative', zIndex: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
//           {data.title}
//         </Typography>
//         <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'block' }}>
//           Address:
//         </Typography>
//         <Typography variant="body2" sx={{ marginBottom: '15px' }}>
//           {data.address}
//         </Typography>
//         <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'block' }}>
//           Ports:
//         </Typography>
//         <Typography variant="body2" sx={{ marginBottom: '15px' }}>
//           {data.ports.join(', ')}
//         </Typography>
//         <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'block' }}>
//           Worker:
//         </Typography>
//         <Typography variant="body2" sx={{ marginBottom: '15px' }}>
//           {data.workers.join(', ')}
//         </Typography>
//         <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'block' }}>
//           Password:
//         </Typography>
//         <Typography variant="body2">{data.password}</Typography>
//       </Box>
//     </Box>
//   );
// };

const CRYPTO_DATA: CoinInfo[] = [
  {
    coin: 'Bitcoin',
    ticker: 'BTC',
    price: '30000 USD',
    algorithm: 'SHA256',
    poolHashrate: '150 TH/s',
  },
  {
    coin: 'Litecoin',
    ticker: 'LTC',
    price: '50 USD',
    algorithm: 'Scrypt',
    poolHashrate: '80 GH/s',
  },
  {
    coin: 'Bitcoin Cash',
    ticker: 'BCH',
    price: '20000 USD',
    algorithm: 'SHA256',
    poolHashrate: '100 TH/s',
  },
  {
    coin: 'Dash',
    ticker: 'DASH',
    price: '100 USD',
    algorithm: 'SHA256',
    poolHashrate: '10 TH/s',
  },
  {
    coin: 'Junkcoin',
    ticker: 'JKC',
    price: '100 USD',
    algorithm: 'SHA256',
    poolHashrate: '10 TH/s',
  },
];

export function HomePools({ sx, ...other }: BoxProps) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 20 },
        ...sx,
      }}
      {...other}
    >
      <Container>
        {isDesktop ? (
          <CoinTable cryptoList={CRYPTO_DATA} />
        ) : (
          <Stack gap={3}>
            {CRYPTO_DATA.map((coin) => (
              <CoinCard key={coin.ticker} crypto={coin} />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
