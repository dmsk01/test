'use client';

import type { IPostItem, IPostFilters } from 'src/types/blog';

import { orderBy } from 'es-toolkit';
import { useState, useCallback } from 'react';
import { useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { useGetPosts } from 'src/actions/blog';

import { Label } from 'src/components/label';

// import news from './news.json';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { NewsListHorizontal } from '../components/news-list-horizontal';
import { Container } from '@mui/material';

const NEWS_FILTER_BY = {
  all: 'all',
  mining: 'mining',
  invest: 'investments',
  crypto: 'cryptocurrency',
};

// ----------------------------------------------------------------------

export function NewsListView() {
  const { posts, postsLoading } = useGetPosts();

  const [sortBy, setSortBy] = useState('latest');

  const { state, setState } = useSetState<IPostFilters>({ publish: 'all' });

  const dataFiltered = applyFilter({ inputData: posts, filters: state, sortBy });

  const handleFilterPublish = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setState({ publish: newValue });
    },
    [setState]
  );

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Новости"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.post.root },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Tabs value={state.publish} onChange={handleFilterPublish} sx={{ mb: { xs: 3, md: 5 } }}>
        {['all', 'published', 'draft'].map((tab) => (
          <Tab
            key={tab}
            iconPosition="end"
            value={tab}
            label={tab}
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <NewsListHorizontal posts={dataFiltered} loading={postsLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IPostItem[];
  filters: IPostFilters;
  sortBy: string;
};

function applyFilter({ inputData, filters, sortBy }: ApplyFilterProps) {
  const { publish } = filters;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  if (publish !== 'all') {
    inputData = inputData.filter((post) => post.publish === publish);
  }

  return inputData;
}
