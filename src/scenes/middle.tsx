import type {FC} from "react";
import {useCurrentFrame} from "remotion";
import {ChessBoard, ConfidenceChart, CoreField, GoBoard, Snow} from "../components/diagrams";
import {Display, Kicker, Mono, Rise, Safe, Serif, fade, progress} from "../components/motion";
import {monoFamily} from "../fonts";
import {bone, boneDim, palette} from "../theme";

export const WinterOne: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <Snow frame={frame} />
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
        <Rise frame={frame}>
          <Kicker color={palette.winter.accent}>Lighthill report · funding freezes</Kicker>
          <Display size={120} style={{marginTop: 8}}>
            AI WINTER
          </Display>
        </Rise>
      </div>
      <ConfidenceChart frame={frame} crash color={palette.winter.accent} />
    </Safe>
  );
};

export const Quiet: FC = () => {
  const frame = useCurrentFrame();
  const cols = 12;
  const rows = 4;
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.winter.accent}>After the freeze</Kicker>
        <Display size={72} style={{marginTop: 8}}>
          THE LAB GOES DARK
        </Display>
      </Rise>
      <div
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 12,
        }}
      >
        {Array.from({length: cols * rows}, (_, i) => {
          const offAt = 4 + (i % cols) * 2;
          const kept = i === 27;
          const lit = kept ? 1 : 1 - fade(frame, offAt, 8);
          return (
            <div
              key={i}
              style={{
                height: 64,
                borderRadius: 6,
                background: lit > 0.4 ? "rgba(197,213,228,0.85)" : "rgba(244,239,230,0.05)",
                boxShadow: lit > 0.4 ? "0 0 18px rgba(197,213,228,0.35)" : "none",
                border: "1px solid rgba(244,239,230,0.08)",
              }}
            />
          );
        })}
      </div>
    </Safe>
  );
};

const rules = [
  ["IF", "cabinet space = full", "THEN", "order another cabinet"],
  ["IF", "bus load > limit", "THEN", "split the order"],
  ["IF", "voltage mismatch", "THEN", "reject the module"],
];

export const RuleCards: FC<{frame: number; fall?: boolean}> = ({frame, fall = false}) => (
  <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
    {rules.map((parts, i) => {
      const t = fade(frame, 4 + i * 6, 12);
      const drop = fall ? progress(frame, 10, 36, 0, 1) : 0;
      return (
        <div
          key={parts[1]}
          style={{
            opacity: t * (1 - drop * 0.45),
            translate: `0 ${drop * (40 + i * 28)}px`,
            rotate: `${(i - 1) * drop * 7}deg`,
            background: "#efe6d2",
            color: "#24180f",
            borderRadius: 12,
            padding: "16px 20px",
            display: "flex",
            gap: 18,
            alignItems: "baseline",
            fontFamily: monoFamily,
            fontSize: 24,
          }}
        >
          <span style={{letterSpacing: "0.14em", fontSize: 14}}>{parts[0]}</span>
          <span>{parts[1]}</span>
          <span style={{letterSpacing: "0.14em", fontSize: 14}}>{parts[2]}</span>
          <span>{parts[3]}</span>
        </div>
      );
    })}
  </div>
);

export const Expert: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.expert.accent}>XCON · configuring machines</Kicker>
        <Display size={80} style={{marginTop: 8}}>
          WRITE THE RULES
        </Display>
      </Rise>
      <RuleCards frame={frame} />
    </Safe>
  );
};

export const WinterTwo: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <Snow frame={frame} />
      <Rise frame={frame}>
        <Kicker color={palette.winter.accent}>The market for certainty collapses</Kicker>
        <Display size={100} style={{marginTop: 8}}>
          SECOND WINTER
        </Display>
      </Rise>
      <RuleCards frame={frame} fall />
    </Safe>
  );
};

export const Backprop: FC = () => {
  const frame = useCurrentFrame();
  const deltas = [0.84, 0.31, 0.07];
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.neural.accent}>Rumelhart · Hinton · Williams</Kicker>
        <Display size={72} style={{marginTop: 8}}>
          ERROR FLOWS BACK
        </Display>
      </Rise>
      <div style={{display: "flex", gap: 40, alignItems: "center", marginTop: 36}}>
        {deltas.map((delta, i) => {
          const reveal = fade(frame, 6 + i * 8, 14);
          const value = (0.92 - (0.92 - delta) * reveal).toFixed(2);
          return (
            <div key={delta} style={{display: "flex", alignItems: "center", gap: 40}}>
              <div style={{textAlign: "center"}}>
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 99,
                    border: `2px solid ${palette.neural.accent}`,
                    display: "grid",
                    placeItems: "center",
                    background: "#062824",
                  }}
                >
                  <Mono size={28} color={palette.neural.accent}>
                    {value}
                  </Mono>
                </div>
                <Mono size={14} color={boneDim} style={{marginTop: 8}}>
                  δ layer {3 - i}
                </Mono>
              </div>
              {i < deltas.length - 1 ? (
                <Mono size={32} color={bone} style={{opacity: fade(frame, 10 + i * 8, 8)}}>
                  ←
                </Mono>
              ) : null}
            </div>
          );
        })}
        <Serif size={36} style={{maxWidth: 360, marginLeft: 20}}>
          The mistake teaches the weights.
        </Serif>
      </div>
    </Safe>
  );
};

export const DeepBlue: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <div style={{display: "flex", gap: 56, alignItems: "center"}}>
        <ChessBoard frame={frame} />
        <div>
          <Rise frame={frame}>
            <Kicker color={palette.deep.accent}>IBM · New York</Kicker>
            <Display size={84} style={{marginTop: 10}}>
              DEEP BLUE
            </Display>
            <Mono size={28} color={boneDim} style={{marginTop: 10}}>
              Garry Kasparov
            </Mono>
          </Rise>
          <Rise frame={frame} delay={8} style={{marginTop: 28}}>
            <Display size={72} color={palette.deep.accent}>
              3½ – 2½
            </Display>
            <Mono color={boneDim} style={{marginTop: 8}}>
              The match, May 1997. Search, not understanding. Still a shock.
            </Mono>
          </Rise>
        </div>
      </div>
    </Safe>
  );
};

export const DataAge: FC = () => {
  const frame = useCurrentFrame();
  const years = [1998, 2001, 2004, 2007, 2010, 2011];
  const index = Math.min(years.length - 1, Math.floor(progress(frame, 0, 42, 0, years.length)));
  const stacks = 3 + index * 2;
  return (
    <Safe>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
        <div>
          <Kicker color={palette.deep.accent}>The web writes itself down</Kicker>
          <Display size={92} style={{marginTop: 8}}>
            {years[index]}
          </Display>
        </div>
        <Display size={42} color={boneDim}>
          DATA
        </Display>
      </div>
      <div style={{display: "flex", alignItems: "flex-end", gap: 10, marginTop: 30, height: 280}}>
        {Array.from({length: stacks}, (_, i) => (
          <div
            key={i}
            style={{
              width: 36,
              height: 70 + ((i * 37) % 180),
              background: i % 4 === 0 ? palette.deep.accent : "rgba(244,239,230,0.14)",
              borderRadius: 4,
              opacity: fade(frame, i, 6),
            }}
          />
        ))}
      </div>
    </Safe>
  );
};

export const AlexNet: FC = () => {
  const frame = useCurrentFrame();
  const before = progress(frame, 4, 24, 0, 25.8);
  const after = progress(frame, 16, 40, 0, 15.3);
  return (
    <Safe>
      <Rise frame={frame}>
        <Kicker color={palette.deep.accent}>ImageNet · top-5 error · lower is better</Kicker>
        <Display size={88} style={{marginTop: 8}}>
          ALEXNET
        </Display>
        <Mono color={boneDim} style={{marginTop: 8}}>
          Krizhevsky · Sutskever · Hinton
        </Mono>
      </Rise>
      <div style={{marginTop: 32, maxWidth: 1100}}>
        <ErrorBar label="2011 best" value={before} max={32} />
        <div style={{height: 16}} />
        <ErrorBar label="2012 AlexNet" value={after} max={32} hot />
      </div>
    </Safe>
  );
};

const ErrorBar: FC<{label: string; value: number; max: number; hot?: boolean}> = ({
  label,
  value,
  max,
  hot = false,
}) => (
  <div>
    <div style={{display: "flex", justifyContent: "space-between", marginBottom: 8}}>
      <Mono>{label}</Mono>
      <Mono color={hot ? palette.deep.accent : bone}>{value.toFixed(1)}%</Mono>
    </div>
    <div style={{height: 28, background: "rgba(244,239,230,0.08)", borderRadius: 6}}>
      <div
        style={{
          width: `${(value / max) * 100}%`,
          height: "100%",
          borderRadius: 6,
          background: hot ? palette.deep.accent : "rgba(244,239,230,0.45)",
        }}
      />
    </div>
  </div>
);

export const Gpus: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <div style={{display: "flex", gap: 48, alignItems: "center"}}>
        <div style={{width: 520}}>
          <Rise frame={frame}>
            <Kicker color={palette.deep.accent}>The training rig</Kicker>
            <Display size={70} style={{marginTop: 10}}>
              TWO GRAPHICS CARDS
            </Display>
            <Mono color={boneDim} style={{marginTop: 14}}>
              GTX 580 × 2. AlexNet’s paper names the hardware. Depth finally had a machine that could carry it.
            </Mono>
          </Rise>
        </div>
        <CoreField frame={frame} color={palette.deep.accent} />
      </div>
    </Safe>
  );
};

export const AlphaGo: FC = () => {
  const frame = useCurrentFrame();
  return (
    <Safe>
      <div style={{display: "flex", gap: 48, alignItems: "center"}}>
        <GoBoard frame={frame} />
        <div>
          <Rise frame={frame}>
            <Kicker color={palette.deep.accent}>Game 2 · Lee Sedol · March 2016</Kicker>
            <Display size={92} style={{marginTop: 8}}>
              MOVE 37
            </Display>
          </Rise>
          <Rise frame={frame} delay={10} style={{marginTop: 18, maxWidth: 520}}>
            <Serif size={40}>A stone on the shoulder of the fifth line. The kind of move a master does not play.</Serif>
            <Mono color={boneDim} style={{marginTop: 16}}>
              AlphaGo wins the match, 4–1.
            </Mono>
          </Rise>
        </div>
      </div>
    </Safe>
  );
};
