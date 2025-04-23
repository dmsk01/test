import type { Theme, SxProps} from '@mui/material';

import { Stack, IconButton, Typography } from '@mui/material';

import { Image } from '../image';

type Props = {
  link: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

const DownloadAppButton = ({ link, children, sx }: Props) => (
    <IconButton
      component="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '7px',
        borderRadius: 1,
        backgroundColor: (theme) => theme.vars.palette.grey[900],
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
        ...sx,
      }}
    >
      {children}
    </IconButton>
  );

export const AppleApplicationButton = () => (
    <DownloadAppButton link="http://google.com" sx={{ pr: '9px' }}>
      <Image src="/assets/icons/apps/apple-white.svg" />
    </DownloadAppButton>
  );

export const AndroidApplicationButton = () => (
    <DownloadAppButton link="http://google.com" sx={{ pl: '9px' }}>
      <Image src="/assets/icons/apps/android-white.svg" />
    </DownloadAppButton>
  );

export const AllApplicationsButton = () => (
    <DownloadAppButton link="http://google.com" sx={{ px: 2 }}>
      <Stack direction="row" gap={1}>
        <Typography variant="button" sx={{ color: (theme) => theme.vars.palette.grey[50] }}>
          Скачать приложение
        </Typography>
        <Image src="/assets/icons/apps/apple-white.svg" />
        <Image src="/assets/icons/apps/android-white.svg" />
      </Stack>
    </DownloadAppButton>
  );
