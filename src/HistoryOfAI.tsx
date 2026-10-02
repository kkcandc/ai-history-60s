import type {FC} from "react";
import {AbsoluteFill, Audio, Sequence, staticFile} from "remotion";
import {Backdrop, Chrome} from "./components/chrome";
import "./fonts";
import {SceneView} from "./scenes";
import {SCENES} from "./timeline";
import {ink} from "./theme";

export const HistoryOfAI: FC = () => {
  return (
    <AbsoluteFill style={{background: ink, overflow: "hidden"}}>
      <Backdrop />
      {SCENES.map((scene) => (
        <Sequence key={scene.id} from={scene.start} durationInFrames={scene.frames}>
          <SceneView id={scene.id} />
        </Sequence>
      ))}
      <Chrome />
      <Audio src={staticFile("score.wav")} volume={0.8} />
    </AbsoluteFill>
  );
};
