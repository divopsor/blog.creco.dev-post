'use client';

import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      {/* add this */}
      <head>
        <link rel='icon' href='/box/favicon.ico'/>
        <title>creco's box</title>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
