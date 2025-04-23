import Image from 'next/image';
import { useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Stack,
  Table,
  Button,
  TableRow,
  useTheme,
  TableBody,
  TableCell,
  IconButton,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { CoinDetailsDialog } from './coin-card-details';

export type CoinInfo = {
  algorithm: string;
  coin: string;
  poolHashrate: string;
  price: string;
  ticker: string;
};

export const CoinCard = ({ crypto }: {crypto: CoinInfo}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslate();
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Image
          src={`/assets/icons/coins/${crypto.ticker?.toUpperCase()}.svg`}
          alt={crypto.ticker}
          width={36}
          height={36}
          style={{ borderRadius: '50%' }}
        />
        <IconButton onClick={() => setOpen(true)} aria-label="expand row" size="small">
          <ChevronRightIcon />
        </IconButton>
        <CoinDetailsDialog open={open} onClose={() => setOpen(false)} coin={crypto} />
      </Stack>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>тикер монеты</TableCell>
            <TableCell>BTC</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>стоимость</TableCell>
            <TableCell>82000 USD</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>алгоритм</TableCell>
            <TableCell>хешрейт пула</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        fullWidth
        component={RouterLink}
        href={CONFIG.auth.redirectPath}
        variant="contained"
        sx={{
          backgroundColor: theme.vars.palette.primary.lighter,
          color: theme.vars.palette.primary.main,
        }}
      >
        {t('hashTable.callForMine')}
      </Button>
    </>
  );
};
