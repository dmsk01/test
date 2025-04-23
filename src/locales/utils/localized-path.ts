export const localizedPath = (locale: string, path: string) =>
  `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
