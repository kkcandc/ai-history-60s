import {mkdirSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {DURATION, FPS, getSceneAt, type Era} from "../src/timeline.ts";

const rate = 32000;
const samples = Math.round((DURATION / FPS) * rate);
const data = Buffer.alloc(44 + samples * 2);

data.write("RIFF", 0);
data.writeUInt32LE(36 + samples * 2, 4);
data.write("WAVE", 8);
data.write("fmt ", 12);
data.writeUInt32LE(16, 16);
data.writeUInt16LE(1, 20);
data.writeUInt16LE(1, 22);
data.writeUInt32LE(rate, 24);
data.writeUInt32LE(rate * 2, 28);
data.writeUInt16LE(2, 32);
data.writeUInt16LE(16, 34);
data.write("data", 36);
data.writeUInt32LE(samples * 2, 40);

let brown = 0;

const tone = (era: Era) => {
  switch (era) {
    case "prologue":
      return {root: 110, fifth: 164.81, air: 0.02, pulse: 0};
    case "birth":
      return {root: 98, fifth: 146.83, air: 0.015, pulse: 0};
    case "neural":
      return {root: 87.31, fifth: 130.81, air: 0.02, pulse: 0};
    case "winter":
      return {root: 73.42, fifth: 110, air: 0.045, pulse: 0};
    case "expert":
      return {root: 82.41, fifth: 123.47, air: 0.02, pulse: 0.4};
    case "deep":
      return {root: 73.42, fifth: 110, air: 0.02, pulse: 1};
    case "attention":
      return {root: 87.31, fifth: 138.59, air: 0.015, pulse: 0.7};
    case "language":
      return {root: 98, fifth: 146.83, air: 0.012, pulse: 0.5};
    case "agents":
      return {root: 110, fifth: 164.81, air: 0.018, pulse: 1.3};
    case "coda":
      return {root: 110, fifth: 164.81, air: 0.01, pulse: 0.2};
    default: {
      const neverEra: never = era;
      return neverEra;
    }
  }
};

for (let i = 0; i < samples; i++) {
  const t = i / rate;
  const frame = Math.min(DURATION - 1, Math.floor(t * FPS));
  const scene = getSceneAt(frame);
  const local = (frame - scene.start) / FPS;
  const {root, fifth, air, pulse} = tone(scene.era);
  const fadeIn = Math.min(1, t / 1.2);
  const fadeOut = Math.min(1, (DURATION / FPS - t) / 2.4);
  const master = fadeIn * fadeOut;

  const drone =
    Math.sin(2 * Math.PI * root * t) * 0.11 +
    Math.sin(2 * Math.PI * root * 2 * t) * 0.04 +
    Math.sin(2 * Math.PI * fifth * t) * 0.06;
  const tremolo = 0.85 + Math.sin(2 * Math.PI * 0.12 * t) * 0.15;

  brown = brown * 0.985 + (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.02;
  const noise = (brown - 0.01) * air;

  const beat = pulse > 0 ? Math.exp(-((t % 0.5) * 28)) * 0.05 * pulse : 0;
  const tickAge = local;
  const blip = Math.exp(-tickAge * 7) * Math.sin(2 * Math.PI * (fifth * 2) * t) * 0.07;

  const mixed = (drone * tremolo + noise + beat + blip) * master;
  const shaped = Math.tanh(mixed * 1.6);
  const int = Math.max(-32767, Math.min(32767, Math.round(shaped * 32767)));
  data.writeInt16LE(int, 44 + i * 2);
}

const destination = resolve(dirname(fileURLToPath(import.meta.url)), "../public/score.wav");
mkdirSync(dirname(destination), {recursive: true});
writeFileSync(destination, data);
console.log(`score written · ${destination} · ${(data.length / 1024 / 1024).toFixed(1)} MB`);
