import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';

import tailwind from '~/tailwind.css?url';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useEffect } from 'react';

type LoaderData = {
  ENV: {
    RECAPTCHA_SITE_KEY: string;
  };
};

export const loader: LoaderFunction = () =>
  json({
    ENV: {
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY || '',
    },
  });

function loadRecaptchaScript() {
  if (typeof window !== 'undefined' && !document.querySelector('script[src*="recaptcha"]')) {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THCHCPS5');`,
          }}
        />
        {/* End Google Tag Manager */}
        <Meta />
        <Links />
      </head>
      <body className="bg-secondary">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THCHCPS5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { ENV } = useLoaderData<LoaderData>();

  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={ENV.RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: true,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <Outlet />
    </GoogleReCaptchaProvider>
  );
}
