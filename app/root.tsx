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

// Google Tag Managerをクライアントサイドで読み込む関数
function loadGTM() {
  if (typeof window !== 'undefined') {
    // dataLayerの初期化
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    
    // GTMスクリプトタグの作成
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-THCHCPS5`;
    
    // ドキュメントに追加
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
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

// 型定義を追加
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadGTM();
  }, []);

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-secondary">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THCHCPS5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
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
