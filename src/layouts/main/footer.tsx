import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Logo } from 'src/components/logo';

// ----------------------------------------------------------------------

const FooterRoot = styled('footer')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.vars.palette.background.default,
}));

export type FooterProps = React.ComponentProps<typeof FooterRoot>;

export function Footer({
  sx,
  layoutQuery = 'md',
  ...other
}: FooterProps & { layoutQuery?: Breakpoint }) {
  const { t } = useTranslate('footer');

  const LINKS = t('sections', { returnObjects: true }) as {
    headline: string;
    children: { name: string; href: string; external?: boolean }[];
  }[];

  return (
    <FooterRoot sx={sx} {...other}>
      <Divider />

      <Container
        sx={(theme) => ({
          pb: 5,
          pt: 10,
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        })}
      >
        <Logo />

        <Grid
          container
          sx={[
            (theme) => ({
              my: 3,
              justifyContent: 'center',
              [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
            }),
          ]}
        >
          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Typography
              variant="body2"
              sx={(theme) => ({
                mx: 'auto',
                maxWidth: 280,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              })}
            >
              {t('shared.callForUse')}
            </Typography>

            <Box
              sx={(theme) => ({
                mt: 3,
                mb: 5,
                display: 'flex',
                justifyContent: 'center',
                [theme.breakpoints.up(layoutQuery)]: { mb: 0, justifyContent: 'flex-start' },
              })}
            >
              <IconButton
                component="a"
                href="https://t.me/rupool_official"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.640625"
                    width="32"
                    height="32"
                    rx="6"
                    fill="url(#paint0_linear_2161_8028)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.72834 15.4921C11.6697 13.3392 14.9647 11.9199 16.6133 11.2342C21.3206 9.27627 22.2987 8.93616 22.9363 8.92492C23.0765 8.92245 23.39 8.9572 23.5931 9.12199C23.7646 9.26114 23.8117 9.4491 23.8343 9.58103C23.8569 9.71295 23.885 10.0135 23.8627 10.2483C23.6076 12.9285 22.5038 19.4328 21.9423 22.4347C21.7047 23.7049 21.2368 24.1308 20.7839 24.1725C19.7996 24.263 19.0521 23.5219 18.0987 22.897C16.6069 21.9191 15.7641 21.3103 14.316 20.356C12.6425 19.2532 13.7274 18.6471 14.6811 17.6565C14.9307 17.3973 19.2677 13.4524 19.3516 13.0946C19.3621 13.0498 19.3719 12.883 19.2727 12.7949C19.1736 12.7068 19.0274 12.7369 18.9218 12.7609C18.7722 12.7948 16.3889 14.3701 11.7721 17.4866C11.0956 17.9511 10.4829 18.1774 9.93391 18.1656C9.3287 18.1525 8.16451 17.8234 7.29906 17.542C6.23755 17.197 5.39389 17.0146 5.46735 16.4285C5.50561 16.1233 5.92595 15.8112 6.72834 15.4921Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2161_8028"
                      x1="16"
                      y1="0.640625"
                      x2="16"
                      y2="32.4033"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#2AABEE" />
                      <stop offset="1" stopColor="#229ED9" />
                    </linearGradient>
                  </defs>
                </svg>
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 8 }}>
            <Box
              sx={(theme) => ({
                gap: 5,
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' },
              })}
            >
              {LINKS.map((list) => (
                <Box
                  key={list.headline}
                  sx={(theme) => ({
                    gap: 2,
                    width: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    [theme.breakpoints.up(layoutQuery)]: { alignItems: 'flex-start' },
                  })}
                >
                  <Typography component="div" variant="overline" fontWeight={800}>
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider />

        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          justifyContent="space-between"
          sx={{ mt: 3 }}
          gap={2}
        >
          <Typography variant="body2">© All rights reserved.</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
            <Link
              component={RouterLink}
              href={paths.policy}
              color="inherit"
              variant="body2"
              sx={{ whiteSpace: 'nowrap' }}
            >
              {t('links.policy')}
            </Link>
            <Link
              component={RouterLink}
              href={paths.termsOfUse}
              color="inherit"
              variant="body2"
              sx={{ whiteSpace: 'nowrap' }}
            >
              {t('links.termsOfUse')}
            </Link>
          </Stack>
        </Stack>
      </Container>
    </FooterRoot>
  );
}

// ----------------------------------------------------------------------

export function HomeFooter({ sx, ...other }: FooterProps) {
  return (
    <FooterRoot
      sx={[
        {
          py: 5,
          textAlign: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <Logo />
        <Box sx={{ mt: 1, typography: 'caption' }}>
          © All rights reserved.
          <br /> made by
          <Link href="https://minimals.cc/"> minimals.cc </Link>
        </Box>
      </Container>
    </FooterRoot>
  );
}
