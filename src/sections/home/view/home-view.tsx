'use client';

import Stack from '@mui/material/Stack';

import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import HomeNews from '../home-news';
import { HomeApp } from '../home-app';
import { HomeVip } from '../home-vip';
import { HomeHero } from '../home-hero';
import { HomeFlow } from '../home-flow';
import { HomeFAQs } from '../home-faqs';
import { HomePools } from '../home-pools';
import HomeBenefits from '../home-benefits';
import { HomeSeoText } from '../home-seo-text';
import { CallForMining } from '../call-for-mining';
import { HomeHowItWorks } from '../home-how-it-works';
import { HomeTestimonials } from '../home-testimonials';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      <BackToTopButton />

      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeBenefits />

        <HomeApp />

        <HomePools />

        <HomeFlow />

        <CallForMining />

        <HomeVip />

        <HomeTestimonials />

        <HomeHowItWorks />

        <HomeFAQs />

        <HomeNews />

        <HomeSeoText />

        <CallForMining sx={{ mb: { sx: 10, lg: 15 } }} />

        {/* <HomeMinimal />

        <HomeHugePackElements />

        <HomeForDesigner />

        <HomeHighlightFeatures />

        <HomeIntegrations />

        <HomePricing />

        <HomeTestimonials />

        <HomeFAQs />

        <HomeZoneUI />

        <HomeAdvertisement /> */}
      </Stack>
    </>
  );
}
