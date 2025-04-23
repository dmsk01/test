import type { TooltipProps } from '@mui/material';

import { QRCodeSVG } from 'qrcode.react';

import { Box, Stack, Button, styled, Tooltip, tooltipClasses } from '@mui/material';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export function StoreButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <HtmlTooltip
        title={
          <Box sx={{ backgroundColor: 'white', p: 1, boxShadow: 3 }}>
            <QRCodeSVG
              value="https://play.google.com/store/apps/details?id=com.rupoolpro"
              size={128}
            />
          </Box>
        }
      >
        <Button
          startIcon={<GooglePlayIcon />}
          component="a"
          href="https://apps.apple.com/kz/app/rupool-pro-crypto-mining-pool/id1658998956"
          variant="contained"
          sx={{ bgcolor: '#000', fontWeight: 400 }}
        >
          Google Play
        </Button>
      </HtmlTooltip>

      <HtmlTooltip
        title={
          <Box sx={{ backgroundColor: 'white', p: 1, boxShadow: 3 }}>
            <QRCodeSVG
              value="https://apps.apple.com/kz/app/rupool-pro-crypto-mining-pool/id1658998956"
              size={128}
            />
          </Box>
        }
      >
        <Button
          startIcon={<AppleIcon />}
          component="a"
          href="https://apps.apple.com/kz/app/rupool-pro-crypto-mining-pool/id1658998956"
          variant="contained"
          sx={{ bgcolor: '#000', fontWeight: 400 }}
        >
          App Store
        </Button>
      </HtmlTooltip>
    </Stack>
  );
}

const GooglePlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" viewBox="0 0 256 283">
    <path
      fill="#ea4335"
      d="M119.553 134.916L1.06 259.061a32.14 32.14 0 0 0 47.062 19.071l133.327-75.934z"
    />
    <path
      fill="#fbbc04"
      d="M239.37 113.814L181.715 80.79l-64.898 56.95l65.162 64.28l57.216-32.67a31.345 31.345 0 0 0 0-55.537z"
    />
    <path
      fill="#4285f4"
      d="M1.06 23.487A30.6 30.6 0 0 0 0 31.61v219.327a32.3 32.3 0 0 0 1.06 8.124l122.555-120.966z"
    />
    <path
      fill="#34a853"
      d="m120.436 141.274l61.278-60.483L48.564 4.503A32.85 32.85 0 0 0 32.051 0C17.644-.028 4.978 9.534 1.06 23.399z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 2 22 22">
    <path
      fill="currentColor"
      d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
    />
  </svg>
);
