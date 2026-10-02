import type {Era} from "./timeline";

export const ink = "#07080c";
export const bone = "#f4efe6";
export const boneDim = "rgba(244,239,230,0.68)";

export const palette: Record<
  Era,
  {accent: string; wash: string; label: string}
> = {
  prologue: {accent: "#f4efe6", wash: "rgba(244,239,230,0.16)", label: "QUESTION"},
  birth: {accent: "#f0b429", wash: "rgba(240,180,41,0.20)", label: "DARTMOUTH"},
  neural: {accent: "#3ee0c5", wash: "rgba(62,224,197,0.16)", label: "NEURAL NETS"},
  winter: {accent: "#c5d5e4", wash: "rgba(176,198,214,0.14)", label: "WINTER"},
  expert: {accent: "#c4b5fd", wash: "rgba(196,181,253,0.16)", label: "EXPERTS"},
  deep: {accent: "#ff4d6d", wash: "rgba(255,77,109,0.16)", label: "DEEP LEARNING"},
  attention: {accent: "#f5d76e", wash: "rgba(245,215,110,0.18)", label: "TRANSFORMERS"},
  language: {accent: "#7dd3fc", wash: "rgba(125,211,252,0.16)", label: "LANGUAGE"},
  agents: {accent: "#a78bfa", wash: "rgba(167,139,250,0.20)", label: "AGENTS"},
  coda: {accent: "#f4efe6", wash: "rgba(244,239,230,0.12)", label: "NOW"},
};

export function signalValue(era: Era, p: number, frame: number): number {
  const t = frame / 30;
  const x = p * Math.PI * 2;
  switch (era) {
    case "prologue":
      return Math.sin(x * 0.85 + t * 0.7) * 0.55;
    case "birth":
      return Math.sin(x * 1.3 + t) * 0.4 + Math.sin(x * 4 + t) * 0.08;
    case "neural":
      return Math.tanh(Math.sin(x * 2.4 + t * 2.2) * 1.5) * 0.62;
    case "winter":
      return Math.sin(x * 14 + t * 2) > 0.93 ? -0.85 : Math.sin(t * 0.8) * 0.04;
    case "expert":
      return Math.sin(x * 4 + t * 1.6) > 0 ? 0.42 : -0.42;
    case "deep":
      return Math.sin(x * 5 + t * 3) * 0.28 + Math.sin(x * 13 + t * 6) * 0.16;
    case "attention":
      return (
        Math.sin(x * 1.6 + t) * 0.28 +
        Math.sin(x * 2.8 - t * 1.4) * 0.2 +
        Math.sin(x * 6.5 + t * 0.5) * 0.1
      );
    case "language":
      return Math.sin(x * 1.15 + t * 0.9) * 0.4 + Math.sin(x * 7) * 0.05;
    case "agents":
      return Math.sin(x * 2 + t * 2.1) * (0.55 + Math.cos(t * 1.4) * 0.25);
    case "coda":
      return Math.sin(x * 0.8 + t * 0.45) * 0.36;
    default: {
      const _never: never = era;
      return _never;
    }
  }
}
