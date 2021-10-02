import HrefButton from "@/components/HrefButton";
import Section from "@/components/Section";
import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import { getLocalDate, getStockCurrentStatus } from "@/utils";
import { IStock } from "@@/types";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import classes from "./Details.module.scss";

export interface IDetailPageProps {
  stock: IStock;
}

const Detail: NextPage<IDetailPageProps> = ({ stock }) => {
  const status = getStockCurrentStatus(stock);

  if (!stock) {
    return (
      <DefaultPageLayout>
        <div className={classes.notFound}>
          해당 페이지가
          <br /> 존재하지 않습니다.
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout
      title={`${stock.이름} 공모주 청약일정, 공모주 분석 - 공모주닷컴`}
      description={`${stock.이름} 청약에 필요한 공모주 청약일정, 공모주 분석, 공모가, 기관경쟁률, 의무보유확약 정보 등 다양한 정보를 제공합니다.`}
    >
      <div className={classes.liveDetailPage}>
        <div className={classes.pageContent}>
          <div className={classes.stockInfo}>
            <div
              className={classes.stockStatus}
              style={{ color: status.color }}
            >
              {status.value}
            </div>
            <div className={classes.stockName}>{stock.이름}</div>
            <div className={classes.stockSecurities}>
              {stock.주간사.join(", ")}
            </div>
          </div>

          {status.value === "🚨 청약진행중" && (
            <div className={classes.liveButton}>
              <HrefButton
                href={`/live/${stock.id}`}
                buttonText="🔥 실시간 경쟁률 보러가기"
              />
            </div>
          )}

          <Section title="🧞‍♂️ 공모 정보">
            <div className={classes.roundedContainer}>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>종목업종</div>
                <div className={classes.stockInfoValue}>{stock.업종}</div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>희망공모가</div>
                <div className={classes.stockInfoValue}>
                  {stock.희망공모가상단 === stock.희망공모가하단
                    ? `${stock.희망공모가하단}원`
                    : `${stock.희망공모가하단}원 ~ ${stock.희망공모가상단}원`}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>확정공모가</div>
                <div className={classes.stockInfoValue}>
                  {stock.확정공모가 ? `${stock.확정공모가}원` : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>기관경쟁률</div>
                <div className={classes.stockInfoValue}>
                  {stock.기관경쟁률 ? `${stock.기관경쟁률}:1` : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>총의무보유확약</div>
                <div className={classes.stockInfoValue}>
                  {stock.총의무보유확약비율
                    ? `${stock.총의무보유확약비율}%`
                    : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>증거금비율</div>
                <div className={classes.stockInfoValue}>
                  {stock.증거금비율 ? `${stock.증거금비율}%` : "-"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>상장일종가</div>
                <div className={classes.stockInfoValue}>
                  {stock.상장일종가 ? `${stock.상장일종가}원` : "-"}
                </div>
              </div>
            </div>
          </Section>
          <Section title="🗓 공모 일정">
            <div className={classes.roundedContainer}>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>수요예측일</div>
                <div className={classes.stockInfoValue}>
                  {stock.수요예측시작일
                    ? `${getLocalDate(stock.수요예측시작일)} ~ ${getLocalDate(
                        stock.수요예측종료일
                      )}`
                    : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>공모청약일</div>
                <div className={classes.stockInfoValue}>
                  {stock.공모청약시작일
                    ? `${getLocalDate(stock.공모청약시작일)} ~ ${getLocalDate(
                        stock.공모청약종료일
                      )}`
                    : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>배정공고일</div>
                <div className={classes.stockInfoValue}>
                  {stock.배정공고일 ? getLocalDate(stock.배정공고일) : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>환불일</div>
                <div className={classes.stockInfoValue}>
                  {stock.배정공고일 ? getLocalDate(stock.배정공고일) : "미정"}
                </div>
              </div>
              <div className={classes.stockInfoItem}>
                <div className={classes.stockInfoLabel}>상장일</div>
                <div className={classes.stockInfoValue}>
                  {stock.상장일 ? getLocalDate(stock.상장일) : "미정"}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </DefaultPageLayout>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps<IDetailPageProps> = async (
  context
) => {
  if (!context.params?.id) return { notFound: true };
  const res = await fetch(
    `${process.env.API_URL}/gongmo/stock/${context.params.id}`
  );
  if (res.status >= 400) return { notFound: true };

  const props: IDetailPageProps = await res.json();
  if (!props.stock) return { notFound: true };

  return { props };
};
