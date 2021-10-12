import { IVideo } from "@@/types";
import React from "react";
import YouTube from "react-youtube";
import SectionHeader from "./SectionHeader";
import classes from "./VerticalYouTubeListSection.module.scss";

export interface IVerticalYouTubeListSectionProps {
  videos: IVideo[];
}

function VerticalYouTubeListSection({
  videos,
}: IVerticalYouTubeListSectionProps) {
  return (
    <div className={classes.section}>
      <SectionHeader
        title="👋 공모주 청약이 뭔가요?"
        subtitle="공모주가 처음이시라면 아래 영상을 참고하세요!"
        selfIndent
      />
      <div className={classes.content}>
        {videos.map((video) => (
          <YouTube
            key={video.id}
            opts={{ height: "100%", width: "100%" }}
            className={classes.video}
            videoId={video.videoId}
          />
        ))}
      </div>
    </div>
  );
}
export default VerticalYouTubeListSection;
