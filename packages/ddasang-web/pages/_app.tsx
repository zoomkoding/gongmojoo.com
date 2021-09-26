import "dayjs/locale/ko";
import "framework7-icons/css/framework7-icons.css";
import type { AppProps } from "next/app";
import "../styles/fonts.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
