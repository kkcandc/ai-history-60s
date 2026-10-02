import type {FC} from "react";
import {Composition} from "remotion";
import {HistoryOfAI} from "./HistoryOfAI";
import {DURATION, FPS, HEIGHT, WIDTH} from "./timeline";

export const RemotionRoot: FC = () => {
  return (
    <Composition
      id="HistoryOfAI"
      component={HistoryOfAI}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
