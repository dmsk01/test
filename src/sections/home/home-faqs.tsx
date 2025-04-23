import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const FAQs = [
  {
    question: 'How can I get the update?',
    answer: (
      <Typography>
        You will get 12 months of free
        <Link
          href="https://support.mui.com/hc/en-us/articles/360008775240-How-do-I-get-access-to-an-item-I-purchased"
          target="_blank"
          rel="noopener"
          sx={{ mx: 0.5 }}
        >
          updates
        </Link>
        with the purchase. Please renew your license to get updates after that.
      </Typography>
    ),
  },
  {
    question: 'Which license is right for you?',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li> All licenses do not apply to open source.</li>
        <li> One licenses / one end product (3 licenses / 3 products...).</li>
        <li>
          <strong>Standard / Plus</strong> license used in free products (Internal management...).
        </li>
        <li>
          <strong>Extended</strong> license used in charge products, collect fees from users
          (SAAS...).
        </li>
        <li>
          Learn more about the
          <Link
            href="https://docs.minimals.cc/package/"
            target="_blank"
            rel="noopener"
            sx={{ mx: 0.5 }}
          >
            package & license
          </Link>
        </li>
      </Box>
    ),
  },
  {
    question: 'How long is my license valid for?',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li> The license is lifetime.</li>
        <li> You get 12 months of free updates.</li>
      </Box>
    ),
  },
  {
    question: 'Which platforms will the template support?',
    answer: (
      <Typography>
        {`The components in MUI are designed to work in the latest, stable releases of all major browsers, including Chrome, Firefox, Safari, and Edge. We don't support Internet Explorer 11. `}
        Learn more about the
        <Link
          href="https://mui.com/material-ui/getting-started/supported-platforms/"
          target="_blank"
          rel="noopener"
          sx={{ mx: 0.5 }}
        >
          supported platforms
        </Link>
      </Typography>
    ),
  },
  {
    question: 'For what kind of projects is the Standard license intended?',
    answer: (
      <Typography>
        The Standard license is designed for internal applications in which staff will access the
        application. An example could be the back-office dashboard of a public-facing e-commerce
        website in which staff would sign in and manage inventory, customers, etc.
      </Typography>
    ),
  },
  {
    question: 'Do you have a free demo to review the code before purchasing?',
    answer: (
      <Typography>
        Yes, you can check out our
        <Link
          href="https://mui.com/store/items/minimal-dashboard-free/"
          target="_blank"
          rel="noopener"
          sx={{ mx: 0.5 }}
        >
          open source
        </Link>
        dashboard template which should give you an overview of the code quality and folder
        structure. Keep in mind that some aspects may differ from this Paid version.
      </Typography>
    ),
  },
];

// ----------------------------------------------------------------------

export function HomeFAQs({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();
  const [expanded, setExpanded] = useState<string | false>(FAQs[0].question);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderDescription = (
    <Box
      sx={{
        flex: '0 0 32%',
        maxWidth: '32%',
        [theme.breakpoints.down('lg')]: {
          flex: '0 0 40%',
          maxWidth: '40%',
        },
        [theme.breakpoints.down('md')]: {
          flex: '0 1 100%',
          maxWidth: '100%',
        },
      }}
    >
      <SectionTitle
        title={t('pages.home.faqTitle1')}
        txtGradient={t('pages.home.faqTitle2')}
        sx={{ textAlign: 'left' }}
      />
    </Box>
  );

  const renderContent = (
    <Stack
      spacing={1}
      sx={{
        mx: 'auto',
        maxWidth: 1088,
      }}
    >
      {FAQs.map((item, index) => (
        <Accordion
          key={item.question}
          expanded={expanded === item.question}
          onChange={handleChange(item.question)}
          sx={{
            borderRadius: 2,
            transition: (th) =>
              th.transitions.create(['background-color'], {
                duration: th.transitions.duration.short,
              }),
            '&::before': { display: 'none' },
            '&:hover': {
              bgcolor: (th) => varAlpha(th.vars.palette.grey['500Channel'], 0.16),
            },
            '&:first-of-type, &:last-of-type': { borderRadius: 2 },
            [`&.${accordionClasses.expanded}`]: {
              m: 0,
              borderRadius: 2,
              boxShadow: 'none',
              bgcolor: (th) => varAlpha(th.vars.palette.grey['500Channel'], 0.08),
            },
            [`& .${accordionSummaryClasses.root}`]: {
              py: 3,
              px: 2.5,
              minHeight: 'auto',
              [`& .${accordionSummaryClasses.content}`]: {
                m: 0,
                [`&.${accordionSummaryClasses.expanded}`]: { m: 0 },
              },
            },
            [`& .${accordionDetailsClasses.root}`]: { px: 2.5, pt: 0, pb: 3 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Iconify
                width={20}
                icon={expanded === item.question ? 'mingcute:minimize-line' : 'mingcute:add-line'}
              />
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography variant="h6"> {item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={{ py: { xs: 5, md: 7.5 }, position: 'relative', ...sx }}
      {...other}
    >
      <TopLines />

      <Container maxWidth={false} sx={{ maxWidth: '1368px' }}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems="flex-start">
          {renderDescription}
          {renderContent}
        </Stack>
      </Container>

      <BottomLines />
    </Box>
  );
}

// ----------------------------------------------------------------------

function TopLines() {
  return (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          position: 'absolute',
          transform: 'translateX(-15px)',
        }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon
          sx={{
            position: 'static',
            opacity: 0.24,
            width: 30,
            height: 15,
          }}
        />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );
}

function BottomLines() {
  return (
    <>
      <FloatLine sx={{ top: 0, left: 0 }} />
      <FloatLine sx={{ bottom: 0, left: 0 }} />
      <FloatPlusIcon sx={{ top: -8, left: 72 }} />
      <FloatPlusIcon sx={{ bottom: -8, left: 72 }} />
    </>
  );
}
