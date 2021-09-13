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
        <title>따상 | 공모주의 모든 것</title>
        <meta name="description" content="공모주에 대한 모든 것" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default DefaultPageLayout;
