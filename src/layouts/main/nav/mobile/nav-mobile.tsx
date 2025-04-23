import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';

import { SignUpButton } from 'src/layouts/components/sign-up-button';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { Nav, NavUl } from '../components';
import { NavList } from './nav-mobile-list';
import { SignInButton } from '../../../components/sign-in-button';

import type { NavMainProps } from '../types';

// ----------------------------------------------------------------------

export type NavMobileProps = NavMainProps & {
  open: boolean;
  onClose: () => void;
  slots?: {
    topArea?: React.ReactNode;
    middleArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavMobile({ data, open, onClose, slots, sx }: NavMobileProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: [
            {
              display: 'flex',
              flexDirection: 'column',
              width: 'var(--layout-nav-mobile-width)',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}
    >
      {slots?.topArea ?? (
        <Box
          sx={{
            pt: 3,
            pb: 2,
            pl: 2.5,
            display: 'flex',
          }}
        >
          <Logo />
        </Box>
      )}

      <Scrollbar fillContent>
        <Nav
          sx={{
            pb: 3,
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
          }}
        >
          <NavUl>
            {data.map((list) => (
              <NavList key={list.title} data={list} />
            ))}
          </NavUl>
        </Nav>
        <Stack
          gap={2}
          flexGrow={1}
          sx={{
            pt: 3,
            pb: 2,
            px: 2.5,
          }}
        >
          {slots?.middleArea ?? null}
        </Stack>
      </Scrollbar>

      <Stack
        alignItems="center"
        sx={{
          py: 3,
          px: 2.5,
          gap: 1.5,
        }}
      >
        {slots?.bottomArea ?? (
          <>
            <SignUpButton
              fullWidth
              sx={(theme) => ({
                background: theme.vars.palette.primary.main,
              })}
            />

            <SignInButton fullWidth />
          </>
        )}
      </Stack>
    </Drawer>
  );
}
