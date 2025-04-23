import React, { useState } from 'react';

import { Table, TableRow, TableHead, TableCell, TableBody, TableContainer } from '@mui/material';

import { useTranslate } from 'src/locales';

import { CoinTableRow } from './coin-table-row';
import { CoinExpandedInfo } from './coin-expanded-info';

import type { CoinInfo } from './coin-card';

type CoinTableProps = {
  cryptoList: CoinInfo[];
};

export const CoinTable = ({ cryptoList }: CoinTableProps) => {
  const [expanded, setExpanded] = useState<string | false>('BTC');

  const handleExpandClick = (cryptoSymbol: string) => {
    setExpanded(expanded === cryptoSymbol ? false : cryptoSymbol);
  };

  const { t } = useTranslate();

  return (
    <TableContainer>
      <Table aria-label="crypto data table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                textAlign: 'center',
                verticalAlign: 'middle',
                height: '64px',
                width: '50px',
              }}
            />
            <TableCell
              sx={{
                textAlign: 'center',
                height: '64px',
                fontWeight: 'bold',
              }}
            >
              {t('hashTable.coin')}
            </TableCell>
            <TableCell
              sx={{
                textAlign: 'center',
                height: '64px',
                fontWeight: 'bold',
              }}
            >
              {t('hashTable.ticker')}
            </TableCell>
            <TableCell
              sx={{
                textAlign: 'center',
                height: '64px',
                fontWeight: 'bold',
              }}
            >
              {t('hashTable.price')}
            </TableCell>
            <TableCell
              sx={{
                textAlign: 'center',
                height: '64px',
                fontWeight: 'bold',
              }}
            >
              {t('hashTable.algorithm')}
            </TableCell>
            <TableCell
              sx={{
                textAlign: 'center',
                height: '64px',
                fontWeight: 'bold',
              }}
            >
              {t('hashTable.hashrate')}
            </TableCell>
            <TableCell
              sx={{
                textAlign: 'center',
                verticalAlign: 'middle',
                height: '64px',
                width: '50px',
              }}
            />
            <TableCell
              sx={{
                textAlign: 'center',
                height: '64px',
                fontWeight: 'bold',
              }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptoList.map((crypto) => (
            <React.Fragment key={crypto.coin}>
              <CoinTableRow
                crypto={crypto}
                onClick={() => handleExpandClick(crypto.coin)}
                expanded={expanded}
              />
              {expanded === crypto.coin && (
                <TableRow key={`${crypto.coin}-expanded`}>
                  <TableCell colSpan={10} sx={{ padding: 0 }}>
                    <CoinExpandedInfo coin={crypto} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
