import type {FC} from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {monoFamily, syneFamily} from "../fonts";
import {getSceneAt, previousEra, SCENES} from "../timeline";
import {bone, boneDim, ink, palette, signalValue} from "../theme";
import {progress} from "./motion";

const Waveform: FC<{frame: number; color: string; era: ReturnType<typeof getSceneAt>["era"]}> = ({
  frame,
  color,
  era,
}) => {
  const points = Array.from({length: 140}, (_, i) => {
    const p = i / 139;
    const y = 18 - signalValue(era, p, frame) * 14;
    return `${(p * 1760 + 80).toFixed(1)},${y.toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      width="1920"
      height="36"
      viewBox="0 0 1920 36"
      style={{position: "absolute", left: 0, top: 96}}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.9}
      />
    </svg>
  );
};

export const Backdrop: FC = () => {
  const frame = useCurrentFrame();
  const scene = getSceneAt(frame);
  const colors = palette[scene.era];
  const pulse = 0.82 + Math.sin(frame / 14) * 0.18;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1100px 720px at 50% 46%, ${colors.wash}, transparent 70%)`,
        opacity: pulse,
      }}
    />
  );
};

export const Chrome: FC = () => {
  const frame = useCurrentFrame();
  const scene = getSceneAt(frame);
  const local = frame - scene.start;
  const colors = palette[scene.era];
  const eraChanged = previousEra(scene) !== null && previousEra(scene) !== scene.era;
  const flash = eraChanged
    ? interpolate(local, [0, 12], [0.55, 0], {extrapolateRight: "clamp"})
    : interpolate(local, [0, 7], [0.22, 0], {extrapolateRight: "clamp"});
  const wipe = progress(local, 0, 12, -8, 108);
  const words = scene.caption.split(" ");
  const shownWords = Math.max(
    1,
    Math.round(progress(local, 0, Math.min(18, scene.frames - 1), 1, words.length)),
  );

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 16%, transparent 32%)",
        }}
      />
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.16,
          mixBlendMode: "overlay",
        }}
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <Waveform frame={frame} color={colors.accent} era={scene.era} />

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: monoFamily,
          color: bone,
        }}
      >
        <div style={{display: "flex", gap: 18, alignItems: "baseline"}}>
          <span style={{color: colors.accent, fontWeight: 500, letterSpacing: "0.14em"}}>
            {String(scene.index).padStart(2, "0")}
          </span>
          <span style={{letterSpacing: "0.18em", fontSize: 16, color: boneDim}}>
            HISTORY OF AI
          </span>
          <span style={{fontSize: 16, color: bone}}>{scene.title.toUpperCase()}</span>
        </div>
        <div style={{display: "flex", gap: 16, alignItems: "baseline"}}>
          <span style={{letterSpacing: "0.16em", fontSize: 14, color: colors.accent}}>
            {colors.label}
          </span>
          <span
            style={{
              fontFamily: syneFamily,
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.04em",
            }}
          >
            {scene.year}
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 78,
          left: 72,
          right: 72,
          display: "flex",
          gap: 4,
          height: 4,
        }}
      >
        {SCENES.map((item) => {
          const seen = frame >= item.start + item.frames;
          const active = item.id === scene.id;
          const fill = seen ? 1 : active ? local / item.frames : 0;
          return (
            <div
              key={item.id}
              style={{
                flex: item.frames,
                height: 4,
                background: "rgba(244,239,230,0.14)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${fill * 100}%`,
                  height: "100%",
                  background: active ? palette[item.era].accent : "rgba(244,239,230,0.55)",
                }}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 120,
          bottom: 46,
        }}
      >
        <div
          style={{
            fontFamily: monoFamily,
            fontSize: 30,
            lineHeight: 1.3,
            color: bone,
            textShadow: "0 2px 16px rgba(0,0,0,0.65)",
            minHeight: 40,
          }}
        >
          {words.slice(0, shownWords).join(" ")}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 28,
          border: "1px solid rgba(244,239,230,0.16)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 90,
          left: `${wipe}%`,
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
          opacity: local < 14 ? 0.55 : 0,
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          background: eraChanged ? colors.accent : bone,
          opacity: flash,
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill style={{boxShadow: `inset 0 0 180px ${ink}`}} />
    </AbsoluteFill>
  );
};
