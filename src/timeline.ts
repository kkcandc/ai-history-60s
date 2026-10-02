export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export type Era =
  | "prologue"
  | "birth"
  | "neural"
  | "winter"
  | "expert"
  | "deep"
  | "attention"
  | "language"
  | "agents"
  | "coda";

export type SceneId =
  | "overture"
  | "turing"
  | "imitation"
  | "proposal"
  | "founders"
  | "dartmouth"
  | "promise"
  | "perceptron"
  | "network"
  | "eliza"
  | "ascent"
  | "winter1"
  | "quiet"
  | "expert"
  | "winter2"
  | "backprop"
  | "deepblue"
  | "data"
  | "alexnet"
  | "gpus"
  | "alphago"
  | "attention"
  | "transformer"
  | "scale"
  | "chatgpt"
  | "interface"
  | "multimodal"
  | "agents"
  | "loop"
  | "coda";

export type Scene = {
  id: SceneId;
  title: string;
  year: string;
  era: Era;
  frames: number;
  caption: string;
  start: number;
  index: number;
};

const RAW: Array<Omit<Scene, "start" | "index">> = [
  {
    id: "overture",
    title: "Can a machine think?",
    year: "—",
    era: "prologue",
    frames: 78,
    caption: "What if a machine could think?",
  },
  {
    id: "turing",
    title: "Turing, 1950",
    year: "1950",
    era: "prologue",
    frames: 60,
    caption: "1950. Alan Turing writes the question down.",
  },
  {
    id: "imitation",
    title: "The imitation game",
    year: "1950",
    era: "prologue",
    frames: 54,
    caption: "If you cannot tell which is which, the test is passed.",
  },
  {
    id: "proposal",
    title: "The proposal",
    year: "1955",
    era: "birth",
    frames: 66,
    caption: "Describe intelligence precisely enough to simulate it.",
  },
  {
    id: "founders",
    title: "Four authors",
    year: "1955",
    era: "birth",
    frames: 60,
    caption: "McCarthy, Minsky, Rochester, Shannon. One bet.",
  },
  {
    id: "dartmouth",
    title: "Dartmouth",
    year: "1956",
    era: "birth",
    frames: 72,
    caption: "Summer 1956. A workshop gives the field its name.",
  },
  {
    id: "perceptron",
    title: "The perceptron",
    year: "1958",
    era: "neural",
    frames: 66,
    caption: "1958. Rosenblatt's perceptron learns from examples.",
  },
  {
    id: "network",
    title: "Neural nets",
    year: "1958",
    era: "neural",
    frames: 54,
    caption: "Many small decisions, wired into a net.",
  },
  {
    id: "promise",
    title: "Twenty years",
    year: "1965",
    era: "birth",
    frames: 48,
    caption: "They believed a generation would be enough.",
  },
  {
    id: "eliza",
    title: "ELIZA",
    year: "1966",
    era: "neural",
    frames: 66,
    caption: "1966. ELIZA answers by turning your words around.",
  },
  {
    id: "ascent",
    title: "The climb",
    year: "1970",
    era: "neural",
    frames: 42,
    caption: "The programs climb. Confidence climbs with them.",
  },
  {
    id: "winter1",
    title: "First winter",
    year: "1974",
    era: "winter",
    frames: 60,
    caption: "1974. The promises miss. The first winter arrives.",
  },
  {
    id: "quiet",
    title: "The quiet",
    year: "1974",
    era: "winter",
    frames: 42,
    caption: "Most lights go out. A few people keep watch.",
  },
  {
    id: "expert",
    title: "Expert systems",
    year: "1980",
    era: "expert",
    frames: 60,
    caption: "The 1980s. Capture an expert. Write down the rules.",
  },
  {
    id: "backprop",
    title: "Backpropagation",
    year: "1986",
    era: "neural",
    frames: 54,
    caption: "1986. Error flows backward, and the net can learn.",
  },
  {
    id: "winter2",
    title: "Second winter",
    year: "1987",
    era: "winter",
    frames: 48,
    caption: "1987. The rules run out of road. A second winter.",
  },
  {
    id: "deepblue",
    title: "Deep Blue",
    year: "1997",
    era: "deep",
    frames: 66,
    caption: "May 1997. Deep Blue takes the match from Kasparov.",
  },
  {
    id: "data",
    title: "The data age",
    year: "1998–11",
    era: "deep",
    frames: 48,
    caption: "Then the world itself becomes the training set.",
  },
  {
    id: "alexnet",
    title: "AlexNet",
    year: "2012",
    era: "deep",
    frames: 72,
    caption: "2012. AlexNet. A deep net cuts the error nearly in half.",
  },
  {
    id: "gpus",
    title: "Compute",
    year: "2012",
    era: "deep",
    frames: 48,
    caption: "Depth was the old idea. Compute finally caught up.",
  },
  {
    id: "alphago",
    title: "AlphaGo",
    year: "2016",
    era: "deep",
    frames: 60,
    caption: "2016. Move 37. A play the masters would not choose.",
  },
  {
    id: "attention",
    title: "Attention",
    year: "2017",
    era: "attention",
    frames: 72,
    caption: "2017. Eight authors. One paper. A new default.",
  },
  {
    id: "transformer",
    title: "The transformer",
    year: "2017",
    era: "attention",
    frames: 66,
    caption: "Attention lets every token weigh every other token.",
  },
  {
    id: "scale",
    title: "Scale",
    year: "2018–20",
    era: "attention",
    frames: 54,
    caption: "Millions of parameters, then hundreds of billions.",
  },
  {
    id: "chatgpt",
    title: "ChatGPT",
    year: "2022",
    era: "language",
    frames: 78,
    caption: "November 30, 2022. The lab door opens.",
  },
  {
    id: "interface",
    title: "The conversation",
    year: "2023",
    era: "language",
    frames: 54,
    caption: "People skip the math and start a conversation.",
  },
  {
    id: "multimodal",
    title: "Many modalities",
    year: "2023",
    era: "language",
    frames: 48,
    caption: "Text, pictures, sound, and code share one model.",
  },
  {
    id: "agents",
    title: "Agents",
    year: "2024",
    era: "agents",
    frames: 72,
    caption: "The next step is action: tools, memory, a choice.",
  },
  {
    id: "loop",
    title: "The loop",
    year: "NOW",
    era: "agents",
    frames: 60,
    caption: "Perceive. Plan. Act. Observe. Then go again.",
  },
  {
    id: "coda",
    title: "Still being written",
    year: "1956–NOW",
    era: "coda",
    frames: 72,
    caption: "Dartmouth to agents. The story is still being written.",
  },
];

let cursor = 0;
export const SCENES: Scene[] = RAW.map((scene, index) => {
  const start = cursor;
  cursor += scene.frames;
  return {...scene, start, index: index + 1};
});

export const DURATION = cursor;

export function getSceneAt(frame: number): Scene {
  const clamped = Math.max(0, Math.min(frame, DURATION - 1));
  for (let i = SCENES.length - 1; i >= 0; i--) {
    if (clamped >= SCENES[i].start) {
      return SCENES[i];
    }
  }
  return SCENES[0];
}

export function previousEra(scene: Scene): Era | null {
  if (scene.index === 1) {
    return null;
  }
  return SCENES[scene.index - 2].era;
}
