import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { NewsListView } from 'src/sections/news/view/news-list-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post list - ${CONFIG.appName}` };

export default async function Page() {
  return <NewsListView />;
}
