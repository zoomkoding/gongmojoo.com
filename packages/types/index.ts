export interface ISecurity {
  id: number;
  이름: string;
  이십일제한여부: boolean;
  연계개설가능은행?: string[];
  당일개설청약가능여부: boolean;
  주간공모주: IStock[];
  updatedAt: string;
  createdAt: string;
}
export interface IStock {
  id: number;
  이름: string;
  주간사: string[];
  업종: string;
  최종청약경쟁률?: number;
  확정공모가?: number;
  상장일종가?: number;
  희망공모가상단: number;
  희망공모가하단: number;
  기관경쟁률?: number;
  증거금비율: number;
  총의무보유확약비율?: number;
  의무보유확약비율?: { 구분: string; 수량: number }[];
  수요예측?: { 구분: string; 수량: number }[];
  현재가?: string;
  수요예측시작일?: string;
  수요예측종료일?: string;
  공모청약시작일?: string;
  공모청약종료일?: string;
  배정공고일?: string;
  상장일?: string;
  updatedAt: string;
  createdAt: string;
}

export interface IStockSecurity {
  id: number;
  공모주이름: string;
  증권사이름: string;
  일반경쟁률: number;
  비례경쟁률: number;
  총청약건수: number;
  일반균등물량: number;
  일반비례물량: number;
  updatedAt: string;
  createdAt: string;
}
