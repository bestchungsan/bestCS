import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "베스트청산 | 관리비 추심 전문 컨설팅 - 빠르고 확실한 관리비 회수",
  description:
    "전문가가 직접 처리하는 관리비 추심 서비스. 법적조치부터 실제 추심까지 원스톱 진행. 성공보수 방식으로 안전하게 관리비를 회수하세요. 전국 어디서나 상담 가능.",
  keywords:
    "관리비 추심, 관리비 회수, 미납 관리비, 관리비 컨설팅, 법적조치, 채권추심, 아파트 관리비, 상가 관리비, 관리단, 관리사무소",
  authors: [{ name: "베스트청산" }],
  creator: "베스트청산",
  publisher: "베스트청산",
  icons: {
    icon: [
      { url: '/logo2.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo2.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/logo2.png',
    shortcut: '/logo2.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bestchungsan.com",
    title: "베스트청산 | 관리비 추심 전문 컨설팅",
    description:
      "전문가가 직접 처리하는 관리비 추심 서비스. 법적조치부터 실제 추심까지 원스톱 진행.",
    siteName: "베스트청산",
  },
  twitter: {
    card: "summary_large_image",
    title: "베스트청산 | 관리비 추심 전문 컨설팅",
    description:
      "전문가가 직접 처리하는 관리비 추심 서비스. 법적조치부터 실제 추심까지 원스톱 진행.",
  },
  verification: {
    google: "", // 구글 서치 콘솔 인증 코드 추가 시 사용
    other: {
      "naver-site-verification": "", // 네이버 웹마스터 도구 인증 코드 추가 시 사용
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "베스트청산",
    description: "전문가가 직접 처리하는 관리비 추심 서비스",
    url: "https://bestchungsan.com",
    telephone: "031-313-9990",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "경기도",
    },
    openingHours: "Mo-Fr 09:00-18:00",
    serviceType: "관리비 추심 컨설팅",
    areaServed: {
      "@type": "Country",
      name: "대한민국",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "관리비 추심 서비스",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "관리비 추심",
            description: "미납 관리비 전문 추심 서비스",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "법률 상담",
            description: "관리비 관련 법률 상담 서비스",
          },
        },
      ],
    },
  };

  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2563eb" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://bestchungsan.com" />


        {/* 추가 메타 태그 */}
        <meta name="geo.region" content="KR" />
        <meta name="geo.country" content="KR" />
        <meta name="ICBM" content="37.5665, 126.9780" />

        {/* Pretendard 폰트 */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />

        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
