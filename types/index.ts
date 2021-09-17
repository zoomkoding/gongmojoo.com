export interface IStockEvent {
  이름:
    | "수요예측시작일"
    | "수요예측종료일"
    | "청약시작일"
    | "청약종료일"
    | "배정공고일"
    | "납입일"
    | "환불일"
    | "상장일";
  날짜: string;
  updatedAt: string;
  createdAt: string;
}

export interface ISecurity {
  id: number;
  이름: string;
  이십일제한여부: boolean;
  연계개설가능은행: string[];
  당일개설청약가능여부: boolean;
  주간공모주: IStock[];
  updatedAt: string;
  createdAt: string;
}

export interface IStock {
  id: number;
  이름: string;
  주간사: IStockSecurity[];
  일정: IStockEvent[];
  업종: string;
  최종청약경쟁률?: number;
  확정공모가?: number;
  상장일종가?: number;
  예상공모가상단: number;
  예상공모가하단: number;
  기관경쟁률?: number;
  증거금비율: number;
  총의무보유확약비율?: number;
  의무보유확약비율?: {
    구분: string;
    수량: number;
  }[];
  수요예측?: {
    구분: string;
    수량: number;
  }[];
  현재가?: string;
  updatedAt: string;
  createdAt: string;
}

export interface IStockSecurity {
  securityId: number;
  stockId: number;
  증권사이름: string;
  일반경쟁률: number;
  비례경쟁률: number;
  총청약건수: number;
  일반균등물량: number;
  일반비례물량: number;
  updatedAt: string;
  createdAt: string;
}
