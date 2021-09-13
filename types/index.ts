export interface 기간 {
  시작일: Date;
  종료일: Date;
}

export interface 은행 {
  이름: number;
}

export interface 증권사 {
  이름: string;
  이십일제한여부: boolean;
  연계개설가능은행?: 은행[];
  당일개설청약가능여부: boolean;
  관련공모주: 공모주[];
}

export interface 주간사경쟁률 {
  증권사이름: string;
  일반비례경쟁률: number;
  총청약건수: number;
}

export interface 주간사 {
  증권사이름: string;
  배정주식수: number;
  일반균등물량?: number;
  일반비례물량?: number;
  최대청약수?: number;
}

export interface 공모주일정 {
  수요예측일: 기간;
  공모청약일: 기간;
  배정공고일: Date;
  납입일: Date;
  환불일: Date;
  상장일: Date;
}

export interface 공모주 {
  종목이름: string;
  주간사: 주간사[];
  업종: string;
  주간사경쟁률?: 주간사경쟁률[];
  최종주간사경쟁률?: 주간사경쟁률[];
  최종청약경쟁률?: number;
  확정공모가?: number;
  상장일종가?: number;
  예상공모가: {
    최고: number;
    최저: number;
  };
  기관경쟁률: number;
  일정: 공모주일정;
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
  현재가?: {
    가격: number;
    상승률: number;
  };
}

export interface 수요예측완료공모주 extends 공모주 {
  확정공모가: number;
  수요예측: {
    구분: string;
    수량: number;
  }[];
}

export interface 청약중인공모주 extends 수요예측완료공모주 {
  주간사경쟁률: 주간사경쟁률[];
  의무보유확약비율: {
    구분: string;
    수량: number;
  }[];
  총의무보유확약비율: number;
}

export interface 청약완료공모주 extends 청약중인공모주 {
  최종주간사경쟁률: 주간사경쟁률[];
  최종쳥약경쟁률: number;
}

export interface 상장완료공모주 extends 청약완료공모주 {
  상장일종가: number;
  현재가: {
    가격: number;
    상승률: number;
  };
}
