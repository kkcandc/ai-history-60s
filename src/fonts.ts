import {loadFont as loadMono} from "@remotion/google-fonts/IBMPlexMono";
import {loadFont as loadSerif} from "@remotion/google-fonts/InstrumentSerif";
import {loadFont as loadSyne} from "@remotion/google-fonts/Syne";

const syne = loadSyne("normal", {
  weights: ["500", "700", "800"],
  subsets: ["latin"],
});

const serifItalic = loadSerif("italic", {
  weights: ["400"],
  subsets: ["latin", "latin-ext"],
});

loadSerif("normal", {
  weights: ["400"],
  subsets: ["latin", "latin-ext"],
});

const mono = loadMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

export const syneFamily = syne.fontFamily;
export const serifFamily = serifItalic.fontFamily;
export const monoFamily = mono.fontFamily;
