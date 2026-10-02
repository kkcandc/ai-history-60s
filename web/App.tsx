import {Player, type PlayerRef} from "@remotion/player";
import {useEffect, useRef, useState} from "react";
import {HistoryOfAI} from "../src/HistoryOfAI";
import {DURATION, FPS, HEIGHT, SCENES, WIDTH, getSceneAt} from "../src/timeline";

const clock = (frame: number) => {
  const seconds = Math.floor(frame / FPS);
  return `0:${String(seconds).padStart(2, "0")}`;
};

export const App = () => {
  const ref = useRef<PlayerRef>(null);
  const [frame, setFrame] = useState(0);
  const scene = getSceneAt(frame);

  useEffect(() => {
    const player = ref.current;
    if (!player) {
      return;
    }
    const onFrame = (event: {detail: {frame: number}}) => {
      setFrame(event.detail.frame);
    };
    player.addEventListener("frameupdate", onFrame);
    return () => {
      player.removeEventListener("frameupdate", onFrame);
    };
  }, []);

  return (
    <main className="page">
      <div className="eyebrow">A SIXTY-SECOND FILM</div>
      <h1>History of AI</h1>
      <p className="deck">Dartmouth, neural nets, transformers, agents.</p>
      <div className="stage">
        <Player
          ref={ref}
          component={HistoryOfAI}
          durationInFrames={DURATION}
          compositionWidth={WIDTH}
          compositionHeight={HEIGHT}
          fps={FPS}
          controls
          clickToPlay
          spaceKeyToPlayOrPause
          acknowledgeRemotionLicense
          style={{width: "100%", aspectRatio: "16 / 9"}}
        />
      </div>
      <div className="meta">
        <span>
          {String(scene.index).padStart(2, "0")} · {scene.title}
        </span>
        <span>{scene.caption}</span>
        <span>{clock(frame)}</span>
      </div>
      <div className="chapters">
        {SCENES.map((item) => (
          <button
            key={item.id}
            className="chapter"
            data-active={item.id === scene.id}
            type="button"
            onClick={() => ref.current?.seekTo(item.start)}
          >
            <span>
              {String(item.index).padStart(2, "0")} {item.title}
            </span>
            <small>
              {item.year} · {clock(item.start)}
            </small>
          </button>
        ))}
      </div>
      <p className="foot">
        Captions carry the film with the sound off. The picture is drawn in code.
        Nothing here calls a paid generative API. Render the master with{" "}
        <code>npm run render</code>.
      </p>
    </main>
  );
};
