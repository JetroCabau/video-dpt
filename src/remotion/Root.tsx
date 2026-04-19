import React from "react";
import { Composition } from "remotion";
import { TitleCard } from "./compositions/TitleCard";
import { TextOverlay } from "./compositions/TextOverlay";
import { FullBleedText } from "./compositions/FullBleedText";
import { SplitLayout } from "./compositions/SplitLayout";
import { TextReveal } from "./compositions/TextReveal";
import { LogoStinger } from "./compositions/LogoStinger";
import { TaglineStinger } from "./compositions/TaglineStinger";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TitleCard"
        component={TitleCard}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ text: "Title", subtitle: "" }}
      />
      <Composition
        id="TextOverlay"
        component={TextOverlay}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ text: "", subtitle: "" }}
      />
      <Composition
        id="FullBleedText"
        component={FullBleedText}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ text: "" }}
      />
      <Composition
        id="SplitLayout"
        component={SplitLayout}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ left: "", right: "" }}
      />
      <Composition
        id="TextReveal"
        component={TextReveal}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ text: "Knowledge|that matters", subtitle: "Xebia · 2025" }}
      />
      <Composition
        id="LogoStinger"
        component={LogoStinger}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="TaglineStinger"
        component={TaglineStinger}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
