import {DURATION, FPS, SCENES} from "../src/timeline.ts";

const ids = new Set<string>();
let frames = 0;

if (SCENES.length !== 30) {
  throw new Error(`Expected 30 scenes, got ${SCENES.length}`);
}

for (const scene of SCENES) {
  if (ids.has(scene.id)) {
    throw new Error(`Duplicate scene id ${scene.id}`);
  }
  ids.add(scene.id);
  if (scene.frames < 30) {
    throw new Error(`${scene.id} is shorter than one second`);
  }
  if (!scene.caption.trim() || scene.caption.length > 78) {
    throw new Error(`${scene.id} caption must be one readable line`);
  }
  if (scene.start !== frames) {
    throw new Error(`${scene.id} start ${scene.start} does not match running total ${frames}`);
  }
  frames += scene.frames;
}

if (frames !== 1800 || DURATION !== 1800) {
  throw new Error(`Duration must be 1800 frames, got ${frames}`);
}

if (FPS !== 30 || DURATION / FPS !== 60) {
  throw new Error("Film must be exactly 60 seconds at 30 fps");
}

console.log(`timeline ok · ${SCENES.length} scenes · ${DURATION / FPS}s`);
