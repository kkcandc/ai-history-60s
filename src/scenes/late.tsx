import type {FC} from "react";
import {useCurrentFrame} from "remotion";
import {AttentionMatrix} from "../components/diagrams";
import {Display, Kicker, Mono, Rise, Safe, Serif, fade, progress} from "../components/motion";
import {monoFamily, syneFamily} from "../fonts";
import {bone, boneDim, palette} from "../theme";

const authors =
  "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Lukasz Kaiser, Polosukhin";

export const Attention: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.attention.accent}>arXiv:1706.03762</Kicker>
      </Rise>
      <Rise frame={frame} delay={4} style={{marginTop: 12}}>
        <Display size={118}>ATTENTION</Display>
        <Display size={118}>IS ALL YOU</Display>
        <Display size={118} color={palette.attention.accent}>
          NEED
        </Display>
      </Rise>
      <Rise frame={frame} delay={14} style={{marginTop: 18, maxWidth: 1200}}>
        <Mono size={18} color={boneDim}>
          {authors}
        </Mono>
      </Rise>
    </Safe>
  );
};

export const Transformer: FC = () => {
  const frame = useCurrentFrame();
  const chips = ["Q", "K", "V"];
  return (
    <Safe>
      <div style={{display: "flex", justifyContent: "space-between", gap: 24}}>
        <div>
          <Kicker color={palette.attention.accent}>The block</Kicker>
          <Display size={64} style={{marginTop: 8}}>
            EVERY TOKEN
            <br />
            LOOKS
          </Display>
          <div style={{display: "flex", gap: 10, marginTop: 22}}>
            {chips.map((chip, i) => (
              <div
                key={chip}
                style={{
                  opacity: fade(frame, 8 + i * 5, 10),
                  border: `1px solid ${palette.attention.accent}`,
                  color: palette.attention.accent,
                  fontFamily: syneFamily,
                  fontWeight: 700,
                  fontSize: 28,
                  width: 64,
                  height: 64,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 10,
                }}
              >
                {chip}
              </div>
            ))}
          </div>
          <Mono color={boneDim} style={{marginTop: 16}}>
            × N identical blocks
          </Mono>
        </div>
        <AttentionMatrix frame={frame} />
      </div>
    </Safe>
  );
};

const scales = [
  {year: "2018", name: "GPT", n: 117e6, label: "117 million"},
  {year: "2019", name: "GPT-2", n: 1.5e9, label: "1.5 billion"},
  {year: "2020", name: "GPT-3", n: 175e9, label: "175 billion"},
];

export const Scale: FC = () => {
  const frame = useCurrentFrame();
  const max = Math.log10(175e9);
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.attention.accent}>Parameters · log scale</Kicker>
        <Display size={64} style={{marginTop: 8}}>
          SCALE CHANGES THE FEELING
        </Display>
      </Rise>
      <div style={{marginTop: 28, display: "flex", flexDirection: "column", gap: 16}}>
        {scales.map((row, i) => {
          const value = progress(frame, 4 + i * 8, 22 + i * 8, 1e6, row.n);
          const width = (Math.log10(value) / max) * 100;
          return (
            <div key={row.name} style={{opacity: fade(frame, i * 4, 8)}}>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: 6}}>
                <Mono>
                  {row.year} {row.name}
                </Mono>
                <Mono color={palette.attention.accent}>{row.label}</Mono>
              </div>
              <div style={{height: 22, background: "rgba(244,239,230,0.08)", borderRadius: 4}}>
                <div
                  style={{
                    width: `${Math.max(4, Math.min(100, width))}%`,
                    height: "100%",
                    borderRadius: 4,
                    background: palette.attention.accent,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Safe>
  );
};

export const ChatGpt: FC = () => {
  const frame = useCurrentFrame();
  const burst = frame > 34;
  const copies = burst ? Math.min(12, Math.round(progress(frame, 34, 68, 1, 12))) : 1;
  return (
    <Safe>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
        <div>
          <Kicker color={palette.language.accent}>A research preview</Kicker>
          <Display size={80} style={{marginTop: 8}}>
            THE DOOR OPENS
          </Display>
        </div>
        <Mono color={boneDim}>30 November 2022</Mono>
      </div>
      <div
        style={{
          marginTop: 26,
          display: "grid",
          gridTemplateColumns: burst ? "repeat(4, 1fr)" : "1fr",
          gap: 12,
        }}
      >
        {Array.from({length: copies}, (_, i) => (
          <div
            key={i}
            style={{
              opacity: fade(frame, burst ? 34 + i * 2 : 6, 10),
              background: "#10141c",
              border: "1px solid rgba(125,211,252,0.35)",
              borderRadius: 14,
              padding: burst ? "12px 14px" : "22px 24px",
              minHeight: burst ? 0 : 180,
            }}
          >
            <Mono size={burst ? 12 : 14} color={palette.language.accent}>
              YOU
            </Mono>
            <Mono size={burst ? 16 : 28} style={{marginTop: 6}}>
              {i % 2 === 0 ? "Explain a neural net." : "Write the next line."}
            </Mono>
          </div>
        ))}
      </div>
    </Safe>
  );
};

const prompts = [
  "Explain a neural net to a newcomer.",
  "Turn this winter into a sonnet.",
  "Find the bug in the loop.",
];

export const Interface: FC = () => {
  const frame = useCurrentFrame();
  const index = Math.min(2, Math.floor(frame / 18));
  const prompt = prompts[index];
  const answer = [
    "Layers. Weights. A correction when the guess is wrong.",
    "The laboratory kept its lights for the ones who stayed.",
    "The counter never returned. The loop had no exit.",
  ][index];
  const typed = answer.slice(0, Math.floor(progress(frame % 18, 4, 16, 0, answer.length)));
  return (
    <Safe>
      <Kicker color={palette.language.accent}>Language becomes the control</Kicker>
      <div
        style={{
          marginTop: 22,
          borderRadius: 16,
          border: "1px solid rgba(125,211,252,0.4)",
          padding: "18px 22px",
          fontFamily: monoFamily,
          fontSize: 32,
          color: bone,
        }}
      >
        {prompt}
        <span style={{color: palette.language.accent}}>{frame % 16 < 8 ? " ▍" : " "}</span>
      </div>
      <Mono size={28} style={{marginTop: 22, maxWidth: 1200}}>
        {typed}
      </Mono>
    </Safe>
  );
};

const modes = [
  ["TEXT", "A sentence"],
  ["IMAGE", "A frame"],
  ["AUDIO", "A wave"],
  ["CODE", "A function"],
];

export const Multimodal: FC = () => {
  const frame = useCurrentFrame();
  const merge = progress(frame, 18, 40, 0, 1);
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.language.accent}>One system</Kicker>
        <Display size={72} style={{marginTop: 8}}>
          MANY SENSES
        </Display>
      </Rise>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 22}}>
        {modes.map(([title, detail], i) => {
          const shift = (1 - merge) * (i % 2 === 0 ? -12 : 12);
          return (
            <div
              key={title}
              style={{
                opacity: 1 - merge * 0.15,
                translate: `${shift}px ${(i > 1 ? 1 : -1) * (1 - merge) * 8}px`,
                border: "1px solid rgba(125,211,252,0.3)",
                borderRadius: 14,
                padding: "20px 22px",
                background: `rgba(125,211,252,${0.04 + merge * 0.08})`,
              }}
            >
              <Display size={36} color={palette.language.accent}>
                {title}
              </Display>
              <Mono color={boneDim} style={{marginTop: 6}}>
                {detail}
              </Mono>
            </div>
          );
        })}
      </div>
    </Safe>
  );
};

const tools = ["SEARCH", "CODE", "BROWSER", "FILES", "CALENDAR"];

export const Agents: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <div style={{position: "relative", height: 560}}>
        <div style={{position: "absolute", left: 0, top: 20}}>
          <Kicker color={palette.agents.accent}>From answering to acting</Kicker>
          <Display size={88} style={{marginTop: 8}}>
            AGENTS
          </Display>
        </div>
        <div
          style={{
            position: "absolute",
            left: 760,
            top: 250,
            width: 160,
            height: 160,
            marginLeft: -80,
            marginTop: -80,
            borderRadius: 99,
            border: `2px solid ${palette.agents.accent}`,
            display: "grid",
            placeItems: "center",
            background: "#140c28",
            boxShadow: `0 0 ${28 + Math.sin(frame / 6) * 10}px rgba(167,139,250,0.45)`,
          }}
        >
          <Mono size={18} color={palette.agents.accent}>
            MODEL
          </Mono>
        </div>
        {tools.map((tool, i) => {
          const appear = fade(frame, 6 + i * 6, 14);
          const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2 + frame * 0.012;
          const radius = 250 - appear * 20;
          const x = 760 + Math.cos(angle) * radius;
          const y = 250 + Math.sin(angle) * radius * 0.72;
          return (
            <div
              key={tool}
              style={{
                position: "absolute",
                left: x,
                top: y,
                translate: "-50% -50%",
                opacity: appear,
                border: "1px solid rgba(167,139,250,0.7)",
                borderRadius: 999,
                padding: "10px 16px",
                background: "rgba(12,8,24,0.9)",
                fontFamily: monoFamily,
                letterSpacing: "0.14em",
                fontSize: 16,
                color: bone,
              }}
            >
              {tool}
            </div>
          );
        })}
      </div>
    </Safe>
  );
};

const steps = ["PERCEIVE", "PLAN", "ACT", "OBSERVE"];

export const Loop: FC = () => {
  const frame = useCurrentFrame();
  const angle = progress(frame, 0, 60, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2);
  const cx = 430;
  const cy = 250;
  const r = 180;
  return (
    <Safe>
      <div style={{display: "flex", alignItems: "center", gap: 40}}>
        <svg width="860" height="500" viewBox="0 0 860 500">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(167,139,250,0.35)" strokeWidth="2" />
          {steps.map((step, i) => {
            const a = -Math.PI / 2 + (i / steps.length) * Math.PI * 2;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r;
            const near = Math.cos(angle - a) > 0.7;
            return (
              <g key={step}>
                <circle cx={x} cy={y} r={near ? 16 : 10} fill={near ? palette.agents.accent : "#07080c"} stroke={palette.agents.accent} strokeWidth="2" />
                <text
                  x={cx + Math.cos(a) * (r + 48)}
                  y={cy + Math.sin(a) * (r + 48)}
                  textAnchor="middle"
                  fill={bone}
                  fontFamily={monoFamily}
                  fontSize="18"
                >
                  {step}
                </text>
              </g>
            );
          })}
          <circle cx={cx + Math.cos(angle) * r} cy={cy + Math.sin(angle) * r} r="9" fill={bone} />
        </svg>
        <div style={{maxWidth: 520}}>
          <Kicker color={palette.agents.accent}>The unit of progress</Kicker>
          <Display size={78} style={{marginTop: 10}}>
            THE LOOP
          </Display>
          <Serif size={36} style={{marginTop: 16}}>
            Not one answer. A cycle that can use a tool and look at what happened.
          </Serif>
        </div>
      </div>
    </Safe>
  );
};

const beats: Array<[string, string, string]> = [
  ["1950", "Turing", palette.prologue.accent],
  ["1956", "Dartmouth", palette.birth.accent],
  ["1958", "Perceptron", palette.neural.accent],
  ["1966", "ELIZA", palette.neural.accent],
  ["1974", "Winter", palette.winter.accent],
  ["1986", "Backprop", palette.neural.accent],
  ["1997", "Deep Blue", palette.deep.accent],
  ["2012", "AlexNet", palette.deep.accent],
  ["2016", "AlphaGo", palette.deep.accent],
  ["2017", "Attention", palette.attention.accent],
  ["2022", "ChatGPT", palette.language.accent],
  ["NOW", "Agents", palette.agents.accent],
];

export const Coda: FC = () => {
  const frame = useCurrentFrame();
  const title = fade(frame, 10, 16);
  return (
    <Safe>
      <Kicker color={boneDim}>Dartmouth → neural nets → transformers → agents</Kicker>
      <div
        style={{
          marginTop: 22,
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 12,
        }}
      >
        {beats.map((beat, i) => {
          const on = fade(frame, i * 2, 8);
          return (
            <div
              key={beat[0]}
              style={{
                opacity: 0.28 + on * 0.72,
                translate: `0 ${(1 - on) * 10}px`,
                borderTop: `3px solid ${beat[2]}`,
                paddingTop: 8,
              }}
            >
              <Mono size={18} color={beat[2]}>
                {beat[0]}
              </Mono>
              <Mono size={15} style={{marginTop: 4}}>
                {beat[1]}
              </Mono>
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 36, opacity: title, translate: `0 ${(1 - title) * 18}px`}}>
        <Display size={72}>THE STORY IS</Display>
        <Serif size={86}>still being written.</Serif>
      </div>
    </Safe>
  );
};
