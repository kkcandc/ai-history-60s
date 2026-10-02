import type {FC} from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {
  ConfidenceChart,
  DotRing,
  NeuralNet,
  Panel,
} from "../components/diagrams";
import {Display, Kicker, Mono, Rise, Safe, Serif, fade, progress} from "../components/motion";
import {bone, boneDim, palette} from "../theme";

export const Overture: FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <DotRing frame={frame} color={palette.prologue.accent} />
      <Safe>
        <div style={{textAlign: "center"}}>
          <Rise frame={frame} delay={0}>
            <Kicker color={boneDim}>A sixty-second history</Kicker>
          </Rise>
          <Rise frame={frame} delay={4} style={{marginTop: 18}}>
            <Display size={86}>CAN A MACHINE</Display>
          </Rise>
          <Rise frame={frame} delay={12} style={{marginTop: 8}}>
            <Serif size={148}>think?</Serif>
          </Rise>
        </div>
      </Safe>
    </AbsoluteFill>
  );
};

export const Turing: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <div style={{display: "flex", gap: 72, alignItems: "flex-end"}}>
        <Rise frame={frame} style={{flex: "0 0 420px"}}>
          <Kicker>Computing Machinery and Intelligence</Kicker>
          <Display size={168} style={{marginTop: 12}}>
            1950
          </Display>
          <Mono size={28} color={boneDim} style={{marginTop: 16}}>
            Alan Turing
          </Mono>
        </Rise>
        <Rise frame={frame} delay={8} style={{flex: 1}}>
          <Serif size={64}>
            “I propose to consider the question, Can machines think?”
          </Serif>
          <Mono size={20} color={boneDim} style={{marginTop: 28}}>
            The question leaves the seminar and enters print.
          </Mono>
        </Rise>
      </div>
    </Safe>
  );
};

export const Imitation: FC = () => {
  const frame = useCurrentFrame();
  const line = "I have nothing further to add.";
  const count = Math.floor(progress(frame, 8, 36, 0, line.length));
  const typed = line.slice(0, count);
  const stamp = fade(frame, 34, 12);
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.prologue.accent}>The imitation game</Kicker>
      </Rise>
      <div style={{display: "flex", gap: 28, marginTop: 28}}>
        <Panel style={{flex: 1, minHeight: 280, background: "#efe6d6"}}>
          <Kicker color="#6d5c48">Human</Kicker>
          <Mono size={32} color="#1c140c" style={{marginTop: 36}}>
            {typed}
            <span style={{opacity: frame % 16 < 8 ? 1 : 0}}>|</span>
          </Mono>
        </Panel>
        <Panel
          style={{flex: 1, minHeight: 280, background: "#04140f"}}
          accent="rgba(157,255,198,0.35)"
        >
          <Kicker color="#9dffc6">Machine</Kicker>
          <Mono size={32} color="#b8ffd8" style={{marginTop: 36}}>
            {typed}
            <span style={{opacity: frame % 16 < 8 ? 1 : 0}}>|</span>
          </Mono>
        </Panel>
      </div>
      <div
        style={{
          marginTop: 22,
          opacity: stamp,
          alignSelf: "flex-start",
          border: "2px solid #f4efe6",
          padding: "8px 14px",
          rotate: "-6deg",
        }}
      >
        <Kicker>No difference you can prove</Kicker>
      </div>
    </Safe>
  );
};

export const Proposal: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.birth.accent}>A proposal · 31 August 1955</Kicker>
      </Rise>
      <Rise frame={frame} delay={6} style={{marginTop: 28, maxWidth: 1280}}>
        <Serif size={52}>
          Every aspect of learning, or any other feature of intelligence, can in
          principle be so precisely described that a machine can be made to
          simulate it.
        </Serif>
      </Rise>
      <Rise frame={frame} delay={16} style={{marginTop: 28}}>
        <Mono color={boneDim}>
          McCarthy · Minsky · Rochester · Shannon
        </Mono>
      </Rise>
    </Safe>
  );
};

const founders = [
  ["John McCarthy", "Names the field"],
  ["Marvin Minsky", "Thought as structure"],
  ["Nathaniel Rochester", "Brings the machines"],
  ["Claude Shannon", "Measures information"],
];

export const Founders: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.birth.accent}>Signed by</Kicker>
      </Rise>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginTop: 22,
        }}
      >
        {founders.map(([name, role], i) => {
          const t = fade(frame, 4 + i * 6, 14);
          return (
            <div
              key={name}
              style={{
                opacity: t,
                translate: `0 ${(1 - t) * 24}px`,
                borderTop: `2px solid ${palette.birth.accent}`,
                paddingTop: 16,
              }}
            >
              <Display size={42}>{name}</Display>
              <Mono color={boneDim} style={{marginTop: 8}}>
                {role}
              </Mono>
            </div>
          );
        })}
      </div>
    </Safe>
  );
};

export const Dartmouth: FC = () => {
  const frame = useCurrentFrame();
  const stats = [
    ["10", "researchers"],
    ["2", "months"],
    ["1", "new name"],
  ];
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.birth.accent}>Hanover, New Hampshire</Kicker>
      </Rise>
      <Rise frame={frame} delay={4} style={{marginTop: 10}}>
        <Display size={132}>DARTMOUTH</Display>
      </Rise>
      <div style={{display: "flex", gap: 64, marginTop: 36}}>
        {stats.map(([num, label], i) => {
          const t = fade(frame, 12 + i * 8, 14);
          return (
            <div key={label} style={{opacity: t, translate: `0 ${(1 - t) * 20}px`}}>
              <Display size={96} color={palette.birth.accent}>
                {num}
              </Display>
              <Mono color={boneDim} style={{marginTop: 8}}>
                {label}
              </Mono>
            </div>
          );
        })}
      </div>
    </Safe>
  );
};

export const PromiseScene: FC = () => {
  const frame = useCurrentFrame();
  const forecast = progress(frame, 6, 28, 0, 100);
  const work = progress(frame, 6, 48, 0, 9);
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.birth.accent}>Herbert Simon · 1965</Kicker>
      </Rise>
      <Rise frame={frame} delay={4} style={{marginTop: 16, maxWidth: 1100}}>
        <Serif size={42}>
          “Machines will be capable, within twenty years, of doing any work a man can do.”
        </Serif>
      </Rise>
      <div style={{marginTop: 36, maxWidth: 980}}>
        <Bar label="The forecast" value={forecast} color={palette.birth.accent} />
        <div style={{height: 18}} />
        <Bar label="The work" value={work} color={bone} />
      </div>
    </Safe>
  );
};

const Bar: FC<{label: string; value: number; color: string}> = ({label, value, color}) => (
  <div>
    <div style={{display: "flex", justifyContent: "space-between", marginBottom: 8}}>
      <Mono size={18} color={boneDim}>
        {label}
      </Mono>
      <Mono size={18}>{Math.round(value)}%</Mono>
    </div>
    <div style={{height: 14, background: "rgba(244,239,230,0.1)", borderRadius: 99}}>
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: 99,
          background: color,
        }}
      />
    </div>
  </div>
);

export const Perceptron: FC = () => {
  const frame = useCurrentFrame();
  const inputs = [0.6, 0.9, 0.3, 0.75];
  const weights = [0.8, -0.4, 0.5, 0.7];
  const sum = inputs.reduce((acc, value, i) => acc + value * weights[i], 0);
  const fire = sum > 0.55;
  const on = fade(frame, 8, 16);
  return (
    <Safe>
      <div style={{display: "flex", gap: 48, alignItems: "center"}}>
        <div style={{width: 460}}>
          <Rise frame={frame}>
            <Kicker color={palette.neural.accent}>Frank Rosenblatt</Kicker>
            <Display size={78} style={{marginTop: 12}}>
              PERCEPTRON
            </Display>
            <Mono color={boneDim} style={{marginTop: 16}}>
              Inputs, weights, a threshold. A pattern in, a yes or no out.
            </Mono>
          </Rise>
        </div>
        <svg width="760" height="420" viewBox="0 0 760 420" style={{opacity: on}}>
          {inputs.map((value, i) => {
            const y = 50 + i * 90;
            return (
              <g key={i}>
                <circle cx="70" cy={y} r="16" fill="#07080c" stroke={palette.neural.accent} strokeWidth="2" />
                <text x="70" y={y + 5} textAnchor="middle" fill={bone} fontSize="14" fontFamily="IBM Plex Mono">
                  {value.toFixed(1)}
                </text>
                <line x1="90" y1={y} x2="330" y2="210" stroke={palette.neural.accent} strokeWidth="2" opacity="0.7" />
                <text x="180" y={y - 8} fill={boneDim} fontSize="16" fontFamily="IBM Plex Mono">
                  w {weights[i].toFixed(1)}
                </text>
              </g>
            );
          })}
          <circle cx="360" cy="210" r="46" fill="#062824" stroke={palette.neural.accent} strokeWidth="3" />
          <text x="360" y="206" textAnchor="middle" fill={bone} fontSize="16" fontFamily="IBM Plex Mono">
            Σ
          </text>
          <text x="360" y="228" textAnchor="middle" fill={palette.neural.accent} fontSize="16" fontFamily="IBM Plex Mono">
            {sum.toFixed(2)}
          </text>
          <line x1="410" y1="210" x2="560" y2="210" stroke={bone} strokeWidth="2" />
          <circle
            cx="640"
            cy="210"
            r="36"
            fill={fire ? palette.neural.accent : "#07080c"}
            stroke={palette.neural.accent}
            strokeWidth="3"
          />
          <text x="640" y="216" textAnchor="middle" fill={fire ? "#06241f" : bone} fontSize="22" fontFamily="IBM Plex Mono">
            {fire ? "1" : "0"}
          </text>
        </svg>
      </div>
    </Safe>
  );
};

export const Network: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.neural.accent}>Layers</Kicker>
        <Display size={72} style={{marginTop: 8}}>
          A NET OF DECISIONS
        </Display>
      </Rise>
      <div style={{marginTop: 12}}>
        <NeuralNet frame={frame} color={palette.neural.accent} />
      </div>
    </Safe>
  );
};

export const Eliza: FC = () => {
  const frame = useCurrentFrame();
  const lines = [
    {who: "YOU", text: "Men are all alike.", at: 6},
    {who: "ELIZA", text: "In what way?", at: 24},
    {who: "YOU", text: "They're always bugging us about something.", at: 36},
  ];
  return (
    <Safe>
      <Panel accent="rgba(62,224,197,0.35)" style={{maxWidth: 980, background: "#04110e", alignSelf: "center", width: "100%"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Kicker color={palette.neural.accent}>ELIZA · DOCTOR</Kicker>
          <Mono size={16} color={boneDim}>
            Joseph Weizenbaum · MIT
          </Mono>
        </div>
        <div style={{marginTop: 28, display: "flex", flexDirection: "column", gap: 16}}>
          {lines.map((line) => (
            <div key={line.text} style={{opacity: fade(frame, line.at, 10)}}>
              <Mono size={14} color={line.who === "ELIZA" ? palette.neural.accent : boneDim}>
                {line.who}
              </Mono>
              <Mono size={30} style={{marginTop: 4}}>
                {line.text}
              </Mono>
            </div>
          ))}
        </div>
      </Panel>
    </Safe>
  );
};

export const Ascent: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
        <Rise frame={frame}>
          <Kicker color={palette.neural.accent}>An illustration, not a score</Kicker>
          <Display size={72} style={{marginTop: 8}}>
            CONFIDENCE
          </Display>
        </Rise>
        <Mono color={boneDim}>Logic Theorist · ELIZA · SHRDLU</Mono>
      </div>
      <ConfidenceChart frame={frame} color={palette.neural.accent} />
    </Safe>
  );
};
