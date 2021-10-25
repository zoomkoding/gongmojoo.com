import PageHeader from "@/components/PageHeader";
import Head from "next/head";
import React, { ReactNode } from "react";
import classes from "./DefaultPageLayout.module.scss";

export interface IDefaultPageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

function DefaultPageLayout({
  title = "공모주닷컴 - 공모주의 모든 것",
  description = "다가오는 공모주 청약을 위한 계좌 개설 준비부터 실시간 청약 경쟁률까지 아쉬움 없는 공모주 청약을 도와드립니다.",
  children,
}: IDefaultPageLayoutProps) {
  return (
    <div className={classes.defaultPageLayout}>
      <Head>
        <meta
          name="google-site-verification"
          content="c0gtAYO2TBUvjFC3scycauGVmPPzOmd96LC6RIbKIiQ"
        />
        <meta
          name="naver-site-verification"
          content="86b00ee4834e9c3a8bfe31188e58024b6d31aff9"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-01SXZPCD2W"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-01SXZPCD2W');
            `,
          }}
        />
        <title>{title}</title>
        <meta
          name="description"
          content={description}
          data-react-helmet="true"
        />
        <meta
          property="og:site_title"
          content={title}
          data-react-helmet="true"
        />
        <meta
          property="og:site_title"
          content={title}
          data-react-helmet="true"
        />
        <meta property="og:title" content={title} data-react-helmet="true" />
        <meta
          property="og:description"
          content={description}
          data-react-helmet="true"
        />
        <meta property="og:type" content="website" data-react-helmet="true" />
        <link rel="icon" href="/favicon.ico" data-react-helmet="true" />
        <link rel="icon" href="/favicon.ico" data-react-helmet="true" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>
      <PageHeader />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default DefaultPageLayout;
