'use client';

import type { Breakpoint } from '@mui/material/styles';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, useMediaQuery } from '@mui/material';

import { allLangs, useTranslate } from 'src/locales';

import { Logo } from 'src/components/logo';
import { SupportLink } from 'src/components/links/support-link';
import {
  AllApplicationsButton,
  AppleApplicationButton,
  AndroidApplicationButton,
} from 'src/components/application/application-button';

import { Footer } from './footer';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { MainSection } from '../core/main-section';
import { createNavData } from '../nav-config-main';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
// import { navData as mainNavData } from '../nav-config-main';
import { SignInButton } from '../components/sign-in-button';
import { SignUpButton } from '../components/sign-up-button';

import type { FooterProps } from './footer';
import type { NavMainProps } from './nav/types';
import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';
import { LanguagePopover } from '../components/language-popover';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavMainProps['data'];
    };
    main?: MainSectionProps;
    footer?: FooterProps;
  };
};

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: MainLayoutProps) {
  const { t } = useTranslate('navbar');

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const navData = slotProps?.nav?.data ?? createNavData(t);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const authControls = (
    <>
      <SignUpButton
        sx={(theme) => ({
          background: theme.vars.palette.primary.main,
        })}
      />
      <SignInButton />
    </>
  );

  const mobileControls = (
    <>
      {authControls}
      <AllApplicationsButton />
    </>
  );

  const closeButton = (
    <IconButton
      edge="end"
      color="inherit"
      onClick={onClose}
      aria-label="close"
      sx={{ alignSelf: 'self-start', p: 2 }}
    >
      <CloseIcon />
    </IconButton>
  );

  const renderHeader = () => {
    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={(theme) => ({
              mr: 1,
              ml: -1,
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
            })}
          />
          <NavMobile
            data={navData}
            open={open}
            onClose={onClose}
            slots={{
              topArea: closeButton,
              middleArea: mobileControls,
              bottomArea: <SupportLink />,
            }}
          />

          {/** @slot Logo */}
          <Logo />
        </>
      ),
      rightArea: (
        <>
          {/** @slot Nav desktop */}
          <NavDesktop
            data={navData}
            sx={(theme) => ({
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: { mx: 2, flexGrow: 1, display: 'flex' },
            })}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.5 },
            }}
          >
            {isDesktop && <SupportLink />}

            {/** @slot Language popover */}
            <LanguagePopover data={allLangs} />

            {/** @slot Settings button */}
            {/* <SettingsButton /> */}

            {isDesktop && authControls}

            {isDesktop && <AppleApplicationButton />}

            {isDesktop && <AndroidApplicationButton />}
          </Box>
        </>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header?.slotProps}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => <Footer sx={slotProps?.footer?.sx} layoutQuery={layoutQuery} />;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={cssVars}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}
