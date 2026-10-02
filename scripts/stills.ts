import {execSync} from "node:child_process";
import {mkdirSync} from "node:fs";
import {SCENES} from "../src/timeline.ts";

mkdirSync("out/stills", {recursive: true});

for (const scene of SCENES) {
  const frame = scene.start + Math.min(24, scene.frames - 1);
  const file = `out/stills/${String(scene.index).padStart(2, "0")}-${scene.id}.png`;
  execSync(`npx remotion still HistoryOfAI ${file} --frame=${frame}`, {stdio: "inherit"});
}
