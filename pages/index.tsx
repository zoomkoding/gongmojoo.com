import PageHeader from "@/components/PageHeader";
import type { NextPage } from "next";
import Head from "next/head";
import classes from "./Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={classes.container}>
      <Head>
        <title>공모주닷컴</title>
        <meta name="description" content="공모주에 대한 모든 것" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <PageHeader />
        <h1 className={classes.title}>
          공모주의 모든 것<br />
          이곳에서 쉽고 간편하게
        </h1>

        <p className={classes.description}>10월 중 서비스 예정!</p>
      </main>
    </div>
  );
};

export default Home;
