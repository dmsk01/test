import type { TFunction } from 'i18next';
import type { ApexOptions } from 'apexcharts';
import type { BoxProps } from '@mui/material/Box';
import type { ChartProps } from 'src/components/chart';
import type { CoinInfo } from 'src/sections/home/components/coin-card';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Stack, Button, Typography, CircularProgress } from '@mui/material';

import { useTranslate } from 'src/locales';

import { chartClasses } from 'src/components/chart/classes';

interface SeriesData {
  name: string;
  type: string;
  data: number[];
}

const mockDataByRange = {
  '1d': {
    categories: ['17:00', '19:00', '21:00', '23:00', '01:00', '03:00', '05:00', '07:00', '09:00'],
    series: [
      {
        name: 'Price',
        type: 'line',
        data: [30000, 35000, 45000, 55000, 65000, 75000, 85000, 90000, 95000],
      },
      {
        name: 'Hashrate',
        type: 'line',
        data: [100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000],
      },
      {
        name: 'Difficulty',
        type: 'line',
        data: [1.0, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 2.9, 3.0],
      },
    ],
  },
  '7d': {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      {
        name: 'Price',
        type: 'line',
        data: [32000, 34000, 36000, 40000, 42000, 44000, 47000],
      },
      {
        name: 'Hashrate',
        type: 'line',
        data: [100000, 120000, 140000, 160000, 150000, 170000, 190000],
      },
      {
        name: 'Difficulty',
        type: 'line',
        data: [1.1, 1.3, 1.6, 1.9, 2.2, 2.6, 3.0],
      },
    ],
  },
  '30d': {
    categories: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    series: [
      {
        name: 'Price',
        type: 'line',
        data: Array.from({ length: 30 }, (_, i) => 30000 + i * 1000),
      },
      {
        name: 'Hashrate',
        type: 'line',
        data: Array.from({ length: 30 }, (_, i) => 100000 + i * 1500),
      },
      {
        name: 'Difficulty',
        type: 'line',
        data: Array.from({ length: 30 }, (_, i) => 1 + i * 0.1),
      },
    ],
  },
};

const mapSeriesNames = (series: SeriesData[], t: TFunction) => series.map((serie) => ({
    ...serie,
    name: t(`chart.${serie.name.toLowerCase()}`),
  }));

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 280, 
      }}
    >
      <CircularProgress size={24} />
    </Box>
  ),
});

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  className,
  width = '100%',
  ...other
}: BoxProps & ChartProps) {
  return (
    <Box
      dir="ltr"
      className={chartClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <ApexChart type={type} series={series} options={options} width="100%" height="100%" />
    </Box>
  );
}

const MiningChart = ({ coin }: { coin: CoinInfo }) => {
  console.log('Cart for ', coin);

  const theme = useTheme();
  const { t } = useTranslate();
  const [range, setRange] = useState<'1d' | '7d' | '30d'>('1d');

  const data = mockDataByRange[range];

  const chartOptions: ApexOptions = {
    colors: ['#FFAB00', '#1C252E', '#FBB8AA'],
    chart: {
      type: 'line',
      toolbar: { show: false }, // отключаем иконки
    },
    stroke: { width: [2, 2, 2] },
    fill: { type: ['solid', 'solid', 'solid'] },
    legend: {
      show: true,
      position: 'bottom',
      offsetY: 5,
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 500,
      labels: {
        colors: '#1D1D1F',
        useSeriesColors: false,
      },
      markers: {
        size: 5,
        shape: 'circle',
      },
      itemMargin: {
        horizontal: 2,
        vertical: 2,
      },
    },
    xaxis: {
      type: 'category',
      categories: data.categories,
      labels: {
        style: {
          colors: '#919EAB', // Цвет меток оси Y для сложности
        },
      },
    },
    yaxis: [
      {
        seriesName: t('chart.price'),
        min: 0,
        max: 150000,
        title: { text: undefined },
        labels: {
          formatter: (value) => `$${value}`,
          style: {
            colors: '#919EAB', // Цвет меток оси Y для сложности
          },
        },
      },
      {
        seriesName: t('chart.hashrate'),
        show: false, // ось скрыта
      },
      {
        seriesName: t('chart.difficulty'),
        min: 0,
        max: 5,
        opposite: true,
        title: { text: undefined },
        labels: {
          formatter: (value) => `${(value * 100).toFixed(0)}%`,
          style: {
            colors: '#919EAB', // Цвет меток оси Y для сложности
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value, { seriesIndex }) => {
          if (seriesIndex === 0) return `$${value}`;
          if (seriesIndex === 1) return `${value}`;
          if (seriesIndex === 2) return `${(value * 100).toFixed(0)}%`;
          return value.toString();
        },
      },
    },
    grid: {
      borderColor: '#e0e0e0',
      xaxis: {
        lines: {
          show: true, // Показать вертикальные линии сетки
        },
      },
      yaxis: {
        lines: {
          show: false, // Скрыть горизонтальные линии сетки
        },
      },
    },
  };

  const chartTabs = (
    <Stack
      direction="row"
      justifyContent={{ xs: 'center', md: 'center' }}
      spacing={1}
      sx={{ position: 'relative', zIndex: 1 }}
    >
      {['1d', '7d', '30d'].map((key) => (
        <Button
          key={key}
          variant={range === key ? 'contained' : 'outlined'}
          onClick={() => setRange(key as '1d' | '7d' | '30d')}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 1,
            ...(range === key && {
              bgcolor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }),
          }}
        >
          {t(`chart.${key}`)}
        </Button>
      ))}
    </Stack>
  );

  const mappedSeries = mapSeriesNames(data.series, t);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          marginBottom: { xs: 3, md: 1.5 },
          color: theme.vars.palette.grey[800],
        }}
      >
        {t('chart.title')}
      </Typography>
      {chartTabs}
      <Chart type="line" series={mappedSeries} options={chartOptions} height={280} />
    </>
  );
};

export default MiningChart;
