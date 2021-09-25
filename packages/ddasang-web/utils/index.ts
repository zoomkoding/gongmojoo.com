import { IStock, IStockSecurity } from "@/../types";

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getMoneyNeededForOne(stock: IStock, security: IStockSecurity) {
  if (!stock.확정공모가) return 0;
  const 공모가기준증거금 = stock.확정공모가 * stock.증거금비율 * 0.01;
  return numberWithCommas(공모가기준증거금 * security.비례경쟁률);
}

export function getLocalDate(x?: string) {
  if (!x) return;
  return new Date(x).toLocaleDateString("kr", {
    month: "narrow",
    day: "2-digit",
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
