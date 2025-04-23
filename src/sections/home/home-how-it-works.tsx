import { useTabs } from 'minimal-shared/hooks';

import { tabClasses } from '@mui/material/Tab';
import {
  Box,
  Tab,
  Tabs,
  Paper,
  Stack,
  useTheme,
  Container,
  Typography,
  tabsClasses,
  useMediaQuery,
} from '@mui/material';

import { CONFIG } from 'src/global-config';
import { useTranslate } from 'src/locales';

import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import { SectionTitle } from './components/section-title';

type WorkCardItem = {
  value: string;
  name: string;
  content: {
    image: string;
    title: string;
    text: string[];
  };
};

const DATA: WorkCardItem[] = [
  {
    value: 'one',
    name: 'Пул решает задачу майнинг-оборудованию',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/01.png`,
      title: 'Оборудование решает задачу',
      text: [
        'Аппараты решают задачи с разной скоростью в зависимость от хешрейта.',
        'Хешрейт — это показатель вычислительной мощности в секунду. Он измеряется в хешах в секунду и показывает, сколько вычислений оборудование выполняет за секунду. Измеряется в Е, GH/s, MH/s.Хешрейт пула можно отслеживать на дашборде в личном кабинете. Дашборд — набор модулей, которые постоянно собирают и обновляют информацию о процессе майнинга оборудования, а также выплатах.',
      ],
    },
  },
  {
    value: 'two',
    name: 'Оборудование задачу майнинг-оборудованию',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/02.png`,
      title: 'Оборудование решает задачу',
      text: [
        '=====Text for 2d tab.',
        ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.Repellendus, et eligendi sequi incidunt expedita similique non asperiores vitae nam delectus ? ',
      ],
    },
  },
  {
    value: 'three',
    name: 'Решенные задачи отправляют на сервер',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/03.png`,
      title: 'Оборудование решает задачу',
      text: [
        '123Text for 3d tab.',
        ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.Repellendus, et eligendi sequi incidunt expedita similique non asperiores vitae nam delectus ? ',
      ],
    },
  },
  {
    value: 'four',
    name: 'Пул принимает решение шары',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/04.png`,
      title: 'Оборудование решает задачу',
      text: [
        '---------Text for 3d tab.',
        ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.Repellendus, et eligendi sequi incidunt expedita similique non asperiores vitae nam delectus ? ',
      ],
    },
  },
  {
    value: 'five',
    name: 'Пул рассчитывает доход по режиму PPS+',
    content: {
      image: `${CONFIG.assetsDir}/assets/images/home/05.png`,
      title: 'Оборудование решает задачу',
      text: [
        '123Text for 3d tab.',
        ' Lorem ipsum dolor sit, amet consectetur adipisicing elit.Repellendus, et eligendi sequi incidunt expedita similique non asperiores vitae nam delectus ? ',
      ],
    },
  },
];

function WorkCardItem({ item }: { item: WorkCardItem; index: number }) {
  const theme = useTheme();
  return (
    <Stack
      justifyContent="flex-end"
      key={item.value}
      sx={{
        px: 5,
        py: 6,
        borderRadius: 2,
        background: `url(${item.content.image})`,
        height: '100%',
        color: theme.vars.palette.grey[200],
        '& > p:not(:last-child)': {
          mb: 2,
        },
      }}
    >
      <Typography variant="h4" sx={{ mb: 1 }}>
        {item.content.title}
      </Typography>
      {item.content.text.map((text, textIndex) => (
        <Typography component="p" key={textIndex}>
          {text}
        </Typography>
      ))}
    </Stack>
  );
}

export function CarouselAlign({ data }: { data: WorkCardItem[] }) {
  const carousel = useCarousel({
    containScroll: false,
    slidesToShow: '100%',
    slideSpacing: '20px',
  });

  return (
    <>
      <Carousel carousel={carousel}>
        {data.map((item, index) => (
          <WorkCardItem key={item.value} item={item} index={index} />
        ))}
      </Carousel>

      <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
          // slotProps={{
          //   dot: {
          //     selected: {
          //       color: theme.vars.palette.warning.main,
          //     },
          //   },
          // }}
        />
      </Box>
    </>
  );
}

export const HomeHowItWorks = () => {
  const theme = useTheme();
  const { t } = useTranslate();
  const basicTabs = useTabs('one');
  const mdUp = useMediaQuery((th) => th.breakpoints.up('md'));

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1368px', py: { xs: 5, lg: 7.5 } }}>
        <SectionTitle
          title={t('pages.home.howTitle1')}
          txtGradient={t('pages.home.howTitle2')}
          sx={{ mb: 6 }}
        />
        {mdUp ? (
          <Stack
            sx={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
              alignItems: 'unset',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              gap: 1,
              p: 0,
            }}
          >
            <Tabs
              orientation="vertical"
              onChange={basicTabs.onChange}
              value={basicTabs.value}
              sx={{
                gap: 0,
                flex: '0 0 32%',
                maxWidth: '32%',

                [`& .${tabsClasses.flexContainer}`]: {
                  gap: 0,
                  flexDirection: 'column',
                  textAlign: 'left',
                  alignItems: 'flex-start',
                  width: '100%',
                },
                [`& .${tabsClasses.scroller}`]: {
                  p: 1,
                },
                [`& .${tabsClasses.root}`]: {
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  minWidth: '100%',
                },
                [`& .${tabsClasses.indicator}`]: {
                  py: 1,
                  '& > span': {
                    width: 1,
                    height: 1,
                    display: 'block',
                    textAlign: 'left',
                    boxShadow: (th) => th.customShadows.z1,
                  },
                },
                [`& .${tabClasses.root}`]: {
                  py: 4,
                  px: 3,
                  justifyContent: 'flex-start',
                  zIndex: 1,
                  minHeight: 'auto',
                  width: '100%',
                  minWidth: '100%',
                  borderTop: `1px solid ${theme.vars.palette.grey[200]}`,
                  [`&:last-child`]: {
                    borderBottom: `1px solid ${theme.vars.palette.grey[200]}`,
                  },
                  [`&.${tabClasses.selected}`]: {
                    width: '100%',
                    minWidth: '100%',
                    bgcolor: theme.vars.palette.grey[200],
                  },
                },
              }}
              TabIndicatorProps={{
                sx: {
                  bgcolor: theme.vars.palette.primary.main,
                  width: '8px',
                },
              }}
            >
              {DATA.map((tab, index) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        textAlign: 'left',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          color: theme.vars.palette.primary.main,
                          display: 'flex',
                          alignItems: 'start',
                          justifyContent: 'flex-start',
                          fontSize: 16,
                          textAlign: 'left',
                        }}
                      >
                        {index + 1}.
                      </Box>
                      {tab.name}
                    </Box>
                  }
                />
              ))}
            </Tabs>

            <Paper
              variant="outlined"
              sx={{ typography: 'body2', borderRadius: 1.5, flex: '0 1 auto' }}
            >
              {DATA.map((tab, index) =>
                tab.value === basicTabs.value ? (
                  <WorkCardItem key={index + tab.value} item={tab} index={index} />
                ) : null
              )}
            </Paper>
          </Stack>
        ) : (
          <CarouselAlign data={DATA} />
        )}
      </Container>
  );
};
