import type {CSSProperties, FC, ReactNode} from "react";
import {AbsoluteFill, Easing, interpolate} from "remotion";
import {bone, boneDim} from "../theme";
import {monoFamily, serifFamily, syneFamily} from "../fonts";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const progress = (
  frame: number,
  from: number,
  to: number,
  outFrom = 0,
  outTo = 1,
) =>
  interpolate(frame, [from, to], [outFrom, outTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

export const fade = (frame: number, from: number, dur = 14) =>
  progress(frame, from, from + dur, 0, 1);

export const Safe: FC<{children: ReactNode}> = ({children}) => (
  <AbsoluteFill
    style={{
      padding: "168px 88px 200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Rise: FC<{
  frame: number;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  children: ReactNode;
}> = ({frame, delay = 0, y = 28, style, children}) => {
  const t = fade(frame, delay, 16);
  return (
    <div style={{opacity: t, translate: `0 ${(1 - t) * y}px`, ...style}}>
      {children}
    </div>
  );
};

export const Kicker: FC<{
  color?: string;
  children: ReactNode;
  style?: CSSProperties;
}> = ({color = boneDim, children, style}) => (
  <div
    style={{
      fontFamily: monoFamily,
      fontWeight: 500,
      fontSize: 18,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Display: FC<{
  children: ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  style?: CSSProperties;
}> = ({children, size = 112, color = bone, weight = 800, style}) => (
  <div
    style={{
      fontFamily: syneFamily,
      fontWeight: weight,
      fontSize: size,
      letterSpacing: "-0.045em",
      lineHeight: 0.9,
      color,
      textWrap: "balance",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Serif: FC<{
  children: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}> = ({children, size = 54, color = bone, style}) => (
  <div
    style={{
      fontFamily: serifFamily,
      fontWeight: 400,
      fontStyle: "italic",
      fontSize: size,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      color,
      textWrap: "balance",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Mono: FC<{
  children: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}> = ({children, size = 22, color = bone, style}) => (
  <div
    style={{
      fontFamily: monoFamily,
      fontWeight: 400,
      fontSize: size,
      letterSpacing: "-0.01em",
      lineHeight: 1.35,
      color,
      fontVariantNumeric: "tabular-nums",
      ...style,
    }}
  >
    {children}
  </div>
);
