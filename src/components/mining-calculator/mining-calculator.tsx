import type { ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';

import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Stack,
  Select,
  Switch,
  Divider,
  Tooltip,
  MenuItem,
  useTheme,
  TextField,
  Typography,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

type PaymentPeriod = 'day' | 'week' | 'month';

type PeriodsLabels = {
  title: string;
  value: PaymentPeriod;
};

type FiatCurrency = 'usd' | 'eur' | 'rub';

type FiatLabels = {
  title: string;
  value: FiatCurrency;
};

const periodsForCalc: PeriodsLabels[] = [
  { title: 'Day', value: 'day' },
  { title: 'Week', value: 'week' },
  { title: 'Month', value: 'month' },
];

const fiatCurrencies: FiatLabels[] = [
  { title: 'UDT', value: 'usd' },
  { title: 'EUR', value: 'eur' },
  { title: 'RUB', value: 'rub' },
];

const coinPrices: Record<FiatCurrency, number> = {
  usd: 100,
  eur: 95,
  rub: 9500,
};

// hashrate, consumptionKwh, elPrice, equipmentPrice, period, rewardPerDay, coinPriceInFiat

const calculateIncome = ({
  hashrate,
  consumptionKwh,
  elPrice,
  includeElectricity,
  equipmentPrice,
  period,
  rewardPerDay,
  coinPriceInFiat,
}: {
  hashrate: number;
  consumptionKwh: number;
  elPrice: number;
  includeElectricity: boolean;
  equipmentPrice: number;
  period: PaymentPeriod;
  rewardPerDay: number;
  coinPriceInFiat: number;
}) => {
  const periodDays =
    period === 'day'
      ? 1
      : period === 'week'
        ? 7
        : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  const coinReward = rewardPerDay * hashrate * periodDays;
  const incomeInFiat = coinReward * coinPriceInFiat;

  const electricityCost = includeElectricity ? elPrice * consumptionKwh * periodDays : 0;
  const netProfit = incomeInFiat - electricityCost;
  const roi = equipmentPrice > 0 ? (netProfit / equipmentPrice) * 100 : 0;

  return { coinReward, incomeInFiat, netProfit, electricityCost, roi };
};

export const MiningCalculator = () => {
  const { t } = useTranslate();
  const theme = useTheme();
  const [period, setPeriod] = useState<PaymentPeriod>('day');
  const [currency, setCurrency] = useState<FiatCurrency>('usd');
  const [hashrate, setHashrate] = useState<number>(200);
  const [elPrice, setElPrice] = useState<number>(5);
  const [equipmentPrice, setEquipmentPrice] = useState<number>(200);
  const [consumptionKwh, setConsumptionKwh] = useState<number>(3);
  const [includeElectricity, setIncludeElectricity] = useState(true);

  const rewardPerDay = 0.035;
  const coinPriceInFiat = coinPrices[currency];

  const { coinReward, incomeInFiat, netProfit, roi } = calculateIncome({
    hashrate,
    consumptionKwh,
    elPrice,
    includeElectricity,
    equipmentPrice,
    period,
    rewardPerDay,
    coinPriceInFiat,
  });

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          marginBottom: { xs: 3, md: 1.5 },
          color: theme.vars.palette.grey[800],
        }}
      >
        {t('chart.calc')}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center">
        <Stack direction="row" alignItems="center">
          <Switch
            id="include-el-cost"
            checked={includeElectricity}
            onChange={(e) => setIncludeElectricity(e.target.checked)}
          />
          <InputLabel htmlFor="include-el-cost">Учитывать расходы на потребление</InputLabel>
        </Stack>
        <Select
          onChange={(e: SelectChangeEvent) => setPeriod(e.target.value as PaymentPeriod)}
          size="small"
          inputProps={{ id: 'period-select-label' }}
          sx={{
            ml: 2,
            outline: 'none',
            minWidth: '120px',
            color: '#919EAB', // Это для текста самого Select-а
            '& .MuiSelect-select': {
              color: '#919EAB', // На всякий случай, если основной не сработает
            },
          }}
          value={period}
        >
          {periodsForCalc.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        flexWrap="wrap"
        gap={1.5}
        sx={{ mt: 3, mb: 1.5 }}
      >
        <Stack
          gap={1}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 8px)' }, // 8px = 1 * 8px gap
          }}
        >
          <TextField
            size="medium"
            label="Мощность оборудования"
            fullWidth
            value={hashrate}
            id="hashrate"
            onChange={(e) => setHashrate(Number(e.target.value) || 0)}
            placeholder="Hashrate value"
            inputMode="numeric"
          />
        </Stack>
        <Stack
          gap={1}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 8px)' }, // 8px = 1 * 8px gap
          }}
        >
          <TextField
            label="Потребление (квтч)"
            fullWidth
            value={consumptionKwh}
            id="consumptionKwh"
            onChange={(e) => setConsumptionKwh(Number(e.target.value) || 0)}
            placeholder="Consumption Kwh"
            inputMode="numeric"
          />
        </Stack>
        <Stack
          gap={1}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 8px)' }, // 8px = 1 * 8px gap
          }}
        >
          <TextField
            label="Стоимость (квтч)"
            fullWidth
            value={elPrice}
            id="elPrice"
            onChange={(e) => setElPrice(Number(e.target.value) || 0)}
            placeholder="Electricity price"
            inputMode="numeric"
          />
        </Stack>
        <Stack
          gap={1}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 8px)' }, // 8px = 1 * 8px gap
          }}
        >
          <TextField
            label="Стоимость оборудования в закупке"
            fullWidth
            value={equipmentPrice}
            id="equipment-cost"
            onChange={(e) => setEquipmentPrice(Number(e.target.value) || 0)}
            placeholder="Стоимость оборудования"
            inputMode="numeric"
          />
        </Stack>
      </Stack>

      <Divider />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="start"
        flexWrap="wrap"
        gap={1.5}
        sx={{ mt: 1.5 }}
      >
        <Stack
          gap={1}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 8px)' },
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            label={coinReward ? coinReward.toFixed(6) : 'Сумма дохода в монете'}
            disabled
          />
        </Stack>
        <Stack
          gap={1}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 8px)' },
          }}
          direction="row"
          alignItems="center"
        >
          <TextField
            variant="outlined"
            label="Сумма дохода"
            value={incomeInFiat ? incomeInFiat.toFixed(2) : ''}
            sx={{ width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TextField
                    select
                    variant="standard"
                    value={currency}
                    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                      setCurrency(e.target.value as FiatCurrency)
                    }
                    sx={{
                      minWidth: '80px',
                    }}
                    SelectProps={{
                      IconComponent: (props) => <KeyboardArrowDownIcon {...props} />,
                      sx: {
                        '& .MuiSelect-select': {
                          borderLeft: '2px solid #eaeaea', // левая граница
                          paddingLeft: '12px', // отступ текста от границы
                          paddingRight: '36px',
                        },
                      },
                    }}
                    InputProps={{
                      disableUnderline: true, // убираем подчеркивание
                    }}
                  >
                    {fiatCurrencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          gap={1}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 8px)' },
          }}
        >
          <Stack
            sx={{ position: 'relative' }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              variant="outlined"
              fullWidth
              label={roi ? `${roi.toFixed(2)}%` : 'ROI'}
              disabled
            />
            <Tooltip
              sx={{ position: 'absolute', right: 0, p: 2 }}
              title="Показатели окупаемости будут активны при заполнении параметров стоимости оборудования и расходов на электроэнергию"
            >
              <IconButton>
                <Iconify icon="eva:info-outline" width={16} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 8px)' },
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            label={netProfit ? netProfit.toFixed(2) : 'Чистая прибыль'}
            disabled
          />
        </Stack>
      </Stack>
    </Box>
  );
};
