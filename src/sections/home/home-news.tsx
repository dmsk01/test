'use client';

import type { BoxProps} from '@mui/material';

import { Box, Card, Link, Stack, Container } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { Image } from 'src/components/image';

import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

type NewsCardItem = {
  id: string;
  name: string;
  href: string;
  createdAt: string;
  content: {
    image: string;
    title: string;
  };
};

const posts: NewsCardItem[] = [
  {
    id: 'one',
    name: 'Основные факторы, определяющие доход майнеров Kaspa в 2025 году',
    href: '2',
    createdAt: '2024-03-02T05:55:31+00:00',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/posts/01.png`,
      title: 'Основные факторы, определяющие доход майнеров Kaspa в 2025 году',
    },
  },
  {
    id: 'two',
    name: 'Годовой Отчет: Итоги Майнинга за 2024 и Прогноз на 2025 Год',
    href: '3',
    createdAt: '2024-02-28T05:55:31+00:00',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/posts/02.png`,
      title: 'Годовой Отчет: Итоги Майнинга за 2024 и Прогноз на 2025 Год',
    },
  },
  {
    id: 'three',
    name: 'Dingocoin (DINGO): что это такое и как его майнить?',
    href: '4',
    createdAt: '2024-02-18T05:55:31+00:00',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/posts/03.png`,
      title: 'Dingocoin (DINGO): что это такое и как его майнить?',
    },
  },
  {
    id: 'four',
    name: 'Cтабильный рост хешрейта и лидирующие позиции мультимонетных пулов',
    href: '5',
    createdAt: '2024-02-02T05:55:31+00:00',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/posts/04.png`,
      title: 'Cтабильный рост хешрейта и лидирующие позиции мультимонетных пулов',
    },
  },
];

export default function HomeNews({ sx }: BoxProps) {
  const { t } = useTranslate();
  // const { posts, postsLoading } = useGetPosts();

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1368px', py: { xs: 5, lg: 7.5 }, ...sx }}>
      <SectionTitle
        title={t('pages.home.newsTitle1')}
        txtGradient={t('pages.home.newsTitle2')}
        sx={{ textAlign: 'left', mb: 5 }}
      />
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
      >
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

export function NewsCard({ post }: { post: NewsCardItem }) {
  return (
    <Card key={post.id}>
      <Stack spacing={1} flexGrow={1} sx={{ borderRadius: 1.5 }}>
        <Box
          sx={{
            height: '195px',
            width: '100%',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <Image
            alt={post.content.title}
            src={post.content.image}
            sx={{ height: '195px', width: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Stack
          justifyContent="space-between"
          spacing={1}
          flexGrow={1}
          sx={{ p: 2, minHeight: '150px', height: '100%' }}
        >
          <Link
            component={RouterLink}
            href={paths.dashboard.post.details(post.href)}
            color="inherit"
            variant="subtitle2"
            sx={[
              (theme) => ({
                ...theme.mixins.maxLine({ line: 2 }),
              }),
            ]}
          >
            {post.content.title}
          </Link>
          <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
            {fDate(post.createdAt)}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
