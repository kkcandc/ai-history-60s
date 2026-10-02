import type {FC} from "react";
import type {SceneId} from "../timeline";
import {
  Ascent,
  Dartmouth,
  Eliza,
  Founders,
  Imitation,
  Network,
  Overture,
  Perceptron,
  PromiseScene,
  Proposal,
  Turing,
} from "./early";
import {
  AlexNet,
  AlphaGo,
  Backprop,
  DataAge,
  DeepBlue,
  Expert,
  Gpus,
  Quiet,
  WinterOne,
  WinterTwo,
} from "./middle";
import {
  Agents,
  Attention,
  ChatGpt,
  Coda,
  Interface,
  Loop,
  Multimodal,
  Scale,
  Transformer,
} from "./late";

const views: Record<SceneId, FC> = {
  overture: Overture,
  turing: Turing,
  imitation: Imitation,
  proposal: Proposal,
  founders: Founders,
  dartmouth: Dartmouth,
  promise: PromiseScene,
  perceptron: Perceptron,
  network: Network,
  eliza: Eliza,
  ascent: Ascent,
  winter1: WinterOne,
  quiet: Quiet,
  expert: Expert,
  winter2: WinterTwo,
  backprop: Backprop,
  deepblue: DeepBlue,
  data: DataAge,
  alexnet: AlexNet,
  gpus: Gpus,
  alphago: AlphaGo,
  attention: Attention,
  transformer: Transformer,
  scale: Scale,
  chatgpt: ChatGpt,
  interface: Interface,
  multimodal: Multimodal,
  agents: Agents,
  loop: Loop,
  coda: Coda,
};

export const SceneView: FC<{id: SceneId}> = ({id}) => {
  const View = views[id];
  return <View />;
};
