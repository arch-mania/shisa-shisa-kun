import { Meta, Links, Outlet, Scripts, useLoaderData, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useEffect } from 'react';

import tailwind from '~/tailwind.css?url';

type LoaderData = {
  ENV: {
    RECAPTCHA_SITE_KEY: string;
  };
};

export const loader: LoaderFunction = () =>
  json({
    ENV: {
      RECAPTCHA_SITE_KEY:
        process.env.RECAPTCHA_SITE_KEY || '6LcR_TAoAAAAAJjM3b_QGYkLXYPzkzODh8gmT8Tx',
    },
  });

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwind },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Lato:wght@400;700&display=swap',
  },
];

function loadRecaptchaScript() {
  if (typeof window !== 'undefined' && !document.querySelector('script[src*="recaptcha"]')) {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?hl=ja';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-secondary">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<LoaderData>();

  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
        }}
      />
      <Outlet />
    </>
  );
}
