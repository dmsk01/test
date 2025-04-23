import type { BoxProps } from '@mui/material/Box';
import type { Theme } from '@mui/material/styles'; // Импортируем тип Theme

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, Link, Button, useTheme, useMediaQuery, LinearProgress } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { _mock } from 'src/_mock';

import { Label } from 'src/components/label';
import { MotionViewport } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  carouselBreakpoints,
  CarouselArrowFloatButtons,
} from 'src/components/carousel';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const toPercent = (value: number, max = 10) => (value / max) * 100;

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <Card key={item.id} sx={{ p: 3 }}>
      <Stack key={item.id}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ typography: 'subtitle2' }}>
          <Label variant="filled" color="success" sx={{ fontWeight: 400 }}>
            {item.rating}
          </Label>
          <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
            {fDate(item.postedAt)}
          </Box>
        </Stack>

        <Typography
          sx={(theme: Theme) => ({
            ...theme.mixins.maxLine({ line: 6, persistent: theme.typography.body1 }),
            mt: 2,
            mb: 3,
          })}
        >
          {item.content}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={item.name} src={item.avatar} sx={{ width: 48, height: 48 }} />
          <Stack sx={{ typography: 'subtitle1' }}>
            <Box component="span">{item.name}</Box>
            <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
              майнер
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

export function HomeTestimonials({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const downMd = useMediaQuery((th) => th.breakpoints.down('md'));
  const showMore = useBoolean();

  const renderLines = (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{ top: 64, left: 80, position: 'absolute', transform: 'translateX(-15px)' }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon sx={{ width: 30, height: 15, opacity: 0.24, position: 'static' }} />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '16px' },
      [carouselBreakpoints.xl]: { slideSpacing: '24px' },
    },
  });

  const params = [
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      title: 'Удобство майнинга',
      performance: 8.2,
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
      title: 'Оперативность поддерки',
      performance: 7.6,
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      title: 'Вывод моненты',
      performance: 8.7,
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
      title: 'Доступность пользования',
      performance: 5.8,
    },
  ];

  const renderProgress = (
    <Box sx={{ mt: 4 }}>
      {params.map((row) => (
        <Stack key={row.id} sx={{ width: 1 }}>
          <Typography variant="subtitle1">{row.title}</Typography>
          <Stack
            key={row.id}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ width: 1, height: 1 }}
          >
            <LinearProgress
              value={toPercent(row.performance)}
              variant="determinate"
              color={row.performance <= 2 ? 'error' : row.performance < 7 ? 'warning' : 'primary'}
              sx={{ width: 1, height: 8 }}
            />
            <Typography variant="caption" sx={{ width: 20 }}>
              {row.performance}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Box>
  );

  const renderAverageRating = (
    <Stack direction="row" alignItems="center" justifyContent="flex-start" flexWrap="wrap" gap={2}>
      <Label
        variant="filled"
        color="success"
        sx={{ fontSize: '40px', lineHeight: '56px', px: 3, py: 3 }}
      >
        8.1
      </Label>
      <Typography sx={{ color: theme.vars.palette.grey[800] }} variant="h5">
        Очень хорошо
      </Typography>
      <Link
        color="inherit"
        variant="body2"
        target="_blank"
        rel="noopener"
        href={paths.freeUI}
        sx={{
          gap: 0.5,
          color: theme.vars.palette.grey[600],
          fontWeight: 700,
          alignItems: 'center',
          justifyItems: 'center',
          display: 'inline-flex',
        }}
      >
        12 отзывов
      </Link>
      <Button
        component={RouterLink}
        href={paths.dashboard.root}
        color="inherit"
        size="large"
        variant="text"
        sx={{ color: theme.vars.palette.primary.main }}
      >
        Оставить отзыв
      </Button>
    </Stack>
  );

  const renderDescription = (
    <>
      <SectionTitle
        title="Что говорят наши "
        txtGradient="пользователи"
        sx={{ mb: { xs: 3, md: 1 }, textAlign: 'left' }}
      />
      <Typography
        sx={{ color: theme.vars.palette.grey[600], maxWidth: '540px', mb: { xs: 3, md: 2 } }}
      >
        Ниже представлены отзывы профессиональных майнеров о работе команды RuPool
      </Typography>
    </>
  );

  const renderContent = (
    <Stack
      sx={{
        position: 'relative',
        pt: { xs: 3, md: 8 },
        px: { xs: 2, md: 1 },
        maxWidth: '90%',
        mx: 'auto',
      }}
    >
      <Carousel carousel={carousel}>
        {TESTIMONIALS.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </Carousel>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: { xs: 5, md: 8 } }}
      >
        <CarouselArrowFloatButtons
          slotProps={{
            prevBtn: {
              svgSize: 30,
              sx: {
                left: { xs: -16, md: -40 },
                borderRadius: '50%',
              },
            },
            nextBtn: {
              svgSize: 30,
              sx: {
                right: { xs: -16, md: -40 },
                borderRadius: '50%',
              },
            },
          }}
          sx={{ bgcolor: 'transparent', color: 'text.primary' }}
          {...carousel.arrows}
          options={carousel.options}
        />
      </Stack>
    </Stack>
  );

  const renderMobileContent = (
    <>
      <Stack spacing={2}>
        {(showMore.value ? TESTIMONIALS : TESTIMONIALS.slice(0, 4)).map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </Stack>

      <Stack alignItems="flex-start" sx={{ p: 2 }}>
        {!showMore.value ? (
          <Button fullWidth variant="contained" onClick={showMore.onToggle}>
            Show more
          </Button>
        ) : null}
      </Stack>
    </>
  );

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container>
          {renderDescription}
          {renderAverageRating}
          {downMd && renderProgress}
          {downMd ? renderMobileContent : renderContent}
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

type Testimonial = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  category: string;
  content: string;
  postedAt: string;
};

const base = (index: number) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatar: _mock.image.avatar(index),
  rating: 5,
});

const TESTIMONIALS: Testimonial[] = [
  {
    ...base(1),
    rating: 8.2,
    category: 'User Experience',
    content: `Пользуюсь Рупулом более 3 лет, всегда своевременные выплаты без порога, цена за 1th одна из самых высоких, оперативная поддержка в чате, информативный удобный сайт и есть мобильное приложение. Бонусом начисляется собственная монета пула.`,
    postedAt: 'March 15, 2024 12:00:00',
  },
  {
    ...base(2),
    rating: 8.8,
    category: 'Customer Support',
    content: `На данном пуле практически с самого его появления. Был на многих пулах. Перешел сюда и уходить не хочется. Поддержка на высоте, оперативное решение всех вопросов. Рекомендую!`,
    postedAt: 'February 10, 2024 14:30:00',
  },
  {
    ...base(3),
    rating: 7.8,
    category: 'Performance',
    content: `Я очень доволен своим опытом майнинга на RUPOOL.PRO! Интерфейс понятный, выплаты приходят быстро, а поддержка всегда на связи. Доходы намного выше чем у любого пула! Рекомендую всем, кто интересуется стабильным и высоким хешрейтом!`,
    postedAt: 'January 25, 2024 08:45:00',
  },
  {
    ...base(4),
    rating: 8.5,
    category: 'Ease of Use',
    content: `Просто отличный русский пул. Легко пользоваться, быстро платят, и всегда помогают, если возникают проблемы. Спасибо команде!`,
    postedAt: 'December 15, 2023 10:15:00',
  },
  {
    ...base(5),
    rating: 9.1,
    category: 'Reliability',
    content: `Не знаю. Наш пул хорош. Комиссия мизер, проблем нет. Были, но парни решили все проблемы.`,
    postedAt: 'November 20, 2023 18:00:00',
  },
  {
    ...base(6),
    rating: 8.8,
    category: 'Customer Support',
    content: `Поддержка и вам привет. За долгое время наблюдения пришёл к тому, что вы возможно одни из лучших (был на 3 пулах до вас, один из них Poolin). На сегодня пока так. Не подведите.`,
    postedAt: 'October 10, 2023 09:00:00',
  },
  {
    ...base(7),
    rating: 8.2,
    category: 'Satisfaction',
    content: `Добрый день! Да, давненько тут. В общем-то, меня всё устраивает. С пулом проблем нет. Админ отвечает довольно быстро, если возникают, какие-либо вопросы. Рекомендую к использованию.`,
    postedAt: 'September 5, 2023 13:45:00',
  },
  {
    ...base(8),
    rating: 8.2,
    category: 'Community',
    content: `Привет всему сообществу майнеров, хочу поделиться опытом в сотрудничестве с RUPOOL.PRO. Первые машинки подключил ещё в 2022 году по совету более опытных друзей и по сей день не пожалел. Поддержка работает на 5+, бонусом начисляются монеты пула. Рекомендую всем.`,
    postedAt: 'August 15, 2023 11:00:00',
  },
  {
    ...base(9),
    rating: 8.0,
    category: 'Trust',
    content: `Более 4 лет был в теме майнинга. Тестировал разные варианты работы, пулы. С 2021 года стал постоянным членом клуба Rupool. Всегда все чётко, вовремя и как договаривались. Спасибо команде за отличное сотрудничество.`,
    postedAt: 'July 20, 2023 17:30:00',
  },
];
