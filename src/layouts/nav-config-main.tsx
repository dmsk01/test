import { paths } from 'src/routes/paths';

import type { NavItemDataProps } from './main/nav/types';

/**
 * Создание локализованных пунктов меню
 * @param t функция перевода из i18n (`useTranslation().t`)
 */
export function createNavData(t: (key: string) => string): NavItemDataProps[] {
  return [
    {
      title: t('nav.mining'),
      path: paths.mining,
    },
    {
      title: t('nav.about'),
      path: paths.about,
    },
    {
      title: t('nav.news'),
      path: paths.news,
    },
    {
      title: t('nav.contact'),
      path: paths.contact,
    },
  ];
}

// export function createNavData(t: (key: string) => string): NavItemDataProps[] {
//   return [
//     {
//       title: t('nav.home'),
//       path: '/',
//       icon: <Iconify icon="solar:home-angle-bold-duotone" width={22} />,
//     },
//     {
//       title: t('nav.components'),
//       path: paths.components,
//       icon: <Iconify icon="solar:atom-bold-duotone" width={22} />,
//     },
//     {
//       title: t('nav.pages'),
//       path: '/pages',
//       icon: <Iconify icon="solar:file-bold-duotone" width={22} />,
//       children: [
//         {
//           subheader: t('nav.other'),
//           items: [
//             { title: t('nav.about'), path: paths.about },
//             { title: t('nav.contact'), path: paths.contact },
//             { title: t('nav.faqs'), path: paths.faqs },
//             { title: t('nav.pricing'), path: paths.pricing },
//             { title: t('nav.payment'), path: paths.payment },
//             { title: t('nav.maintenance'), path: paths.maintenance },
//             { title: t('nav.comingSoon'), path: paths.comingSoon },
//           ],
//         },
//         {
//           subheader: t('nav.concepts'),
//           items: [
//             { title: t('nav.shop'), path: paths.product.root },
//             { title: t('nav.product'), path: paths.product.demo.details },
//             { title: t('nav.checkout'), path: paths.product.checkout },
//             { title: t('nav.posts'), path: paths.post.root },
//             { title: t('nav.post'), path: paths.post.demo.details },
//           ],
//         },
//         {
//           subheader: t('nav.authDemo'),
//           items: [
//             { title: t('nav.signInSplit'), path: paths.authDemo.split.signIn },
//             { title: t('nav.signUpSplit'), path: paths.authDemo.split.signUp },
//             { title: t('nav.resetPasswordSplit'), path: paths.authDemo.split.resetPassword },
//             { title: t('nav.updatePasswordSplit'), path: paths.authDemo.split.updatePassword },
//             { title: t('nav.verifySplit'), path: paths.authDemo.split.verify },

//             { title: t('nav.signInCentered'), path: paths.authDemo.centered.signIn },
//             { title: t('nav.signUpCentered'), path: paths.authDemo.centered.signUp },
//             { title: t('nav.resetPasswordCentered'), path: paths.authDemo.centered.resetPassword },
//             { title: t('nav.updatePasswordCentered'), path: paths.authDemo.centered.updatePassword },
//             { title: t('nav.verifyCentered'), path: paths.authDemo.centered.verify },
//           ],
//         },
//         {
//           subheader: t('nav.error'),
//           items: [
//             { title: t('nav.page403'), path: paths.page403 },
//             { title: t('nav.page404'), path: paths.page404 },
//             { title: t('nav.page500'), path: paths.page500 },
//           ],
//         },
//         {
//           subheader: t('nav.dashboard'),
//           items: [
//             { title: t('nav.dashboard'), path: CONFIG.auth.redirectPath },
//           ],
//         },
//       ],
//     },
//     {
//       title: t('nav.docs'),
//       path: paths.docs,
//       icon: <Iconify icon="solar:notebook-bold-duotone" width={22} />,
//     },
//   ];
// }
