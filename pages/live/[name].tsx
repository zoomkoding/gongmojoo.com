import { 현재진행중인공모주 } from "@/dummy/공모주";
import DefaultPageLayout from "@/layouts/DefaultPageLayout";
import classNames from "classnames";
import { ChevronRight, QuestionCircle } from "framework7-icons-plus/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import classes from "./LiveDetail.module.scss";

const LiveDetail: NextPage = () => {
  const router = useRouter();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const currentStock = useMemo(
    () =>
      현재진행중인공모주.find(({ 종목이름 }) => router.query.name === 종목이름),
    [router.query.name]
  );

  if (!currentStock) {
    return <></>;
  }

  return (
    <DefaultPageLayout>
      <div className={classes.liveDetailPage}>
        <div className={classes.pageContent}>
          <div className={classes.pageName}>
            공모주 실시간 경쟁률
            <QuestionCircle />
          </div>

          {/* <div className={classes.pageDescription}>
          현재 경쟁률을 기반으로 배당 받을 수 있는 수량을 확인합니다.
        </div> */}
          <div className={classNames([classes.section, classes.white])}>
            <div className={classes.sectionContent}>
              <div className={classes.sectionHeader}>종목 정보</div>
              <div className={classes.stockName}>{currentStock.종목이름}</div>
              <div className={classes.stockDescription}>
                {currentStock.업종}
              </div>
              <div className={classes.stockDetails}>
                <div className={classes.stockInfoItem}>
                  <div className={classes.stockInfoLabel}>확정공모가</div>
                  <div className={classes.stockInfoValue}>
                    {currentStock.확정공모가}원
                  </div>
                </div>
                <div className={classes.stockInfoItem}>
                  <div className={classes.stockInfoLabel}>기관경쟁률</div>
                  <div className={classes.stockInfoValue}>
                    {currentStock.기관경쟁률}:1
                  </div>
                </div>
                <div className={classes.stockInfoItem}>
                  <div className={classes.stockInfoLabel}>의무보유확약</div>
                  <div className={classes.stockInfoValue}>
                    {currentStock.총의무보유확약비율}%
                  </div>
                </div>
              </div>

              <div className={classes.moreInfoButton}>
                <div className={classes.button}>
                  더보기 <ChevronRight />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              실시간 경쟁률
              <div className={classes.lastUpdatedTime}>오늘 18:37 기준</div>
            </div>

            <div className={classes.securityInfoItems}>
              <div
                className={classNames([
                  classes.securityInfoItem,
                  classes.tableHeader,
                ])}
              >
                <div className={classes.securityName}>증권사</div>
                <div className={classes.rate}>비례경쟁률</div>
                <div className={classes.rate}>균등경쟁률</div>
              </div>
              {currentStock.주간사경쟁률.map((item) => (
                <div className={classes.securityInfoItem} key={item.증권사이름}>
                  <div className={classes.securityName}>{item.증권사이름}</div>
                  <div className={classes.rate}>{item.일반비례경쟁률}:1</div>
                  <div className={classes.rate}>404.29:1</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
};

export default LiveDetail;
