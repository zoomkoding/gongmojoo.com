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
      </Head>
      <PageHeader />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default DefaultPageLayout;
