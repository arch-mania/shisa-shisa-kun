import { InterviewPage } from '~/components/pages/Interview';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'あなたの将来資金どれくらい？不動産エキスパートが監修「資産を試算・シサシサくん」' },
    {
      name: 'description',
      content:
        '老後もその部屋にひとり？家賃はほぼそのままで「持ち家」という資産を。完全無料で使える将来試算の自動計算サービス。人生で一番かかるお金「居住費」に対して考えることは、自分の人生を考えるということ。自分が住んでる賃貸に、この先どれくらいの家賃がかかるのか把握しよう。',
    },
    {
      property: 'og:title',
      content: 'あなたの将来資金どれくらい？不動産エキスパートが監修「資産を試算・シサシサくん」',
    },
    {
      property: 'og:description',
      content:
        '老後もその部屋にひとり？家賃はほぼそのままで「持ち家」という資産を。完全無料で使える将来試算の自動計算サービス。人生で一番かかるお金「居住費」に対して考えることは、自分の人生を考えるということ。自分が住んでる賃貸に、この先どれくらいの家賃がかかるのか把握しよう。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/ogp.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: '/ogp.png' },
    {
      name: 'twitter:title',
      content: 'あなたの将来資金どれくらい？不動産エキスパートが監修「資産を試算・シサシサくん」',
    },
    {
      name: 'twitter:description',
      content:
        '老後もその部屋にひとり？家賃はほぼそのままで「持ち家」という資産を。完全無料で使える将来試算の自動計算サービス。人生で一番かかるお金「居住費」に対して考えることは、自分の人生を考えるということ。自分が住んでる賃貸に、この先どれくらいの家賃がかかるのか把握しよう。',
    },
  ];
};

export default function App() {
  return <InterviewPage />;
}
