import { IStock, IStockSecurity } from "@/../types";
import dayjs from "dayjs";

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getMoneyNeededForOne(stock: IStock, security: IStockSecurity) {
  if (!stock.확정공모가) return null;
  const 공모가기준증거금 = stock.확정공모가 * stock.증거금비율 * 0.01;
  return numberWithCommas(공모가기준증거금 * security.비례경쟁률);
}

export function getLocalDate(x?: string, version?: "simple" | "normal") {
  if (!x) return;
  if (version === "simple") return dayjs(x).format("M/D");
  return dayjs(x).format("M월 D일");
}

export function getLocalTime(x?: string) {
  if (!x) return;
  return new Date(x).toLocaleTimeString("kr", {
    month: "narrow",
    day: "numeric",
  });
}

export function get상승률({ 확정공모가, 상장일종가 }: IStock): {
  color: "black" | "red" | "blue";
  value: string;
} {
  if (!확정공모가 || !상장일종가) return { color: "black", value: "-" };
  const rate = (상장일종가 / 확정공모가) * 100;
  return {
    color: rate === 100 ? "black" : rate > 100 ? "red" : "blue",
    value: `${rate.toFixed(1)}%`,
  };
}

export function getTagFor기관경쟁률({ 기관경쟁률 }: IStock): {
  // color?: "black" | "red" | "blue";
  value?: string;
} {
  if (!기관경쟁률) return {};
  if (기관경쟁률 > 1400) return { value: "매우좋음😍" };
  if (기관경쟁률 > 1100) return { value: "좋음😎" };
  if (기관경쟁률 > 800) return { value: "나쁘지않음🙂" };
  if (기관경쟁률 > 700) return { value: "흐음🤔" };
  return { value: "나쁨🤮" };
}

export function getDateDiff(from?: Date | string, to?: Date | string) {
  if (!from || !to) return undefined;
  const dateFrom = dayjs(dayjs(from).format("YYYY-MM-DD"));
  const dateTo = dayjs(dayjs(to).format("YYYY-MM-DD"));
  return dateFrom.diff(dateTo, "day");
}

export function getStockCurrentStatus(stock: IStock) {
  const 청약시작일차이 = getDateDiff(stock.공모청약시작일, new Date());
  if (!청약시작일차이 || 청약시작일차이 >= 0) {
    return {
      color: "black",
      value: "🎯 청약예정",
    };
  }

  const 청약종료일 = getDateDiff(stock.공모청약종료일, new Date());
  if (!청약종료일 || 청약종료일 >= 0) {
    return {
      color: "black",
      value: "🚨 청약진행중",
    };
  }

  const 상장일차이 = getDateDiff(stock.상장일, new Date());
  if (!상장일차이 || 상장일차이 >= 0) {
    return {
      color: "black",
      value: "🐣 상장예정",
    };
  }

  return {
    color: "black",
    value: "🐥 상장완료",
  };
}
