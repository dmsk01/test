import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, TableRow, TableCell, IconButton } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { CONFIG } from 'src/global-config';

import type { CoinInfo } from './coin-card';

export type CoinTableRowType = {
  crypto: CoinInfo;
  onClick: () => void;
  expanded: string | false;
};

export const CoinTableRow = ({ crypto, onClick, expanded }: CoinTableRowType) => {
  const { t } = useTranslate();
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell sx={{ width: { xs: '30px', lg: '50px' }, padding: '0', textAlign: 'center' }}>
        <Image
          src={`/assets/icons/coins/${crypto.ticker?.toUpperCase()}.svg`}
          alt={crypto.ticker}
          width={36}
          height={36}
          style={{ borderRadius: '50%' }}
        />
      </TableCell>
      <TableCell
        sx={{
          width: { xs: '30px', md: '50px' },
          textAlign: 'left',
          height: '64px',
          fontWeight: 600,
        }}
      >
        {crypto.coin}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', height: '64px' }}>{crypto.ticker}</TableCell>
      <TableCell sx={{ textAlign: 'center', height: '64px' }}>{crypto.price}</TableCell>
      <TableCell sx={{ textAlign: 'center', height: '64px' }}>{crypto.algorithm}</TableCell>
      <TableCell sx={{ textAlign: 'center', height: '64px' }}>{crypto.poolHashrate}</TableCell>
      <TableCell sx={{ textAlign: 'center', height: '64px', whiteSpace: 'nowrap' }}>
        <Button
          component={RouterLink}
          href={CONFIG.auth.redirectPath}
          variant="contained"
          sx={{
            width: { xs: '130px', md: '150px' },
            backgroundColor: theme.vars.palette.primary.lighter,
            color: theme.vars.palette.primary.main,
          }}
        >
          {t('hashTable.callForMine')}
        </Button>
      </TableCell>
      <TableCell sx={{ width: { xs: '30px', md: '50px' }, padding: '0', textAlign: 'center' }}>
        <IconButton
          onClick={() => onClick()}
          aria-expanded={expanded === crypto.coin ? 'true' : 'false'}
          aria-label="expand row"
          size="small"
        >
          <ExpandMoreIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
