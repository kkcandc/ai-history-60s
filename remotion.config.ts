import {Config} from "@remotion/cli/config";
import fs from "node:fs";

Config.setEntryPoint("./src/index.ts");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

const fromEnv = process.env.REMOTION_BROWSER_EXECUTABLE;
const systemChrome = "/usr/bin/google-chrome";
const browser = fromEnv ?? (fs.existsSync(systemChrome) ? systemChrome : undefined);

if (browser) {
  Config.setBrowserExecutable(browser);
}
