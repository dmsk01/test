import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';

import { NewsSkeleton } from './news-skeleton';
import { NewsItemHorizontal } from './news-item-horizontal';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  loading?: boolean;
};

export function NewsListHorizontal({ posts, loading }: Props) {
  const renderLoading = () => <NewsSkeleton variant="horizontal" />;

  const renderList = () =>
    posts.map((post) => (
      <NewsItemHorizontal
        key={post.id}
        post={post}
        detailsHref={paths.dashboard.post.details(post.title)}
        editHref={paths.dashboard.post.edit(post.title)}
      />
    ));

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        }}
      >
        {loading ? renderLoading() : renderList()}
      </Box>

      {posts.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
