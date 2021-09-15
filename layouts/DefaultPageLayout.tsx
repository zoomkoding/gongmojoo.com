import PageHeader from "@/components/PageHeader";
import Head from "next/head";
import React, { ReactNode } from "react";
import classes from "./DefaultPageLayout.module.scss";

export interface IDefaultPageLayoutProps {
  children: ReactNode;
}

function DefaultPageLayout({ children }: IDefaultPageLayoutProps) {
  return (
    <div className={classes.defaultPageLayout}>
      <Head>
        <meta
          name="google-site-verification"
          content="c0gtAYO2TBUvjFC3scycauGVmPPzOmd96LC6RIbKIiQ"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G8M1X540VP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G8M1X540VP');
            `,
          }}
        />
      </Head>
      <PageHeader />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default DefaultPageLayout;
