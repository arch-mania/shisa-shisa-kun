import { Outlet } from '@remix-run/react';
import { Layout } from '~/components/layout/Layout';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'msapplication-TileColor', content: '#ffffff' },
    { name: 'application-name', content: 'シサシサくん' },
    { name: 'apple-mobile-web-app-title', content: 'シサシサくん' },
    { link: { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } },
    
  ];
};

export default function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
