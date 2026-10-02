import type {CSSProperties, FC, ReactNode} from "react";
import {bone, boneDim} from "../theme";
import {monoFamily} from "../fonts";
import {fade, progress} from "./motion";

export const DotRing: FC<{frame: number; color: string}> = ({frame, color}) => {
  const count = 64;
  return (
    <div style={{position: "absolute", inset: 0}}>
      {Array.from({length: count}, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + frame * 0.008;
        const radius = 280 + Math.sin(frame * 0.07 + i * 0.4) * 10;
        const x = 960 + Math.cos(angle) * radius;
        const y = 500 + Math.sin(angle) * radius * 0.58;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: i % 8 === 0 ? 8 : 5,
              height: i % 8 === 0 ? 8 : 5,
              borderRadius: 99,
              background: color,
              opacity: 0.25 + (i % 5) * 0.1,
            }}
          />
        );
      })}
    </div>
  );
};

export const Snow: FC<{frame: number}> = ({frame}) => (
  <div style={{position: "absolute", inset: 0}}>
    {Array.from({length: 50}, (_, i) => {
      const x = (i * 149) % 1920;
      const speed = 1.8 + (i % 6) * 0.55;
      const y = ((frame * speed + i * 90) % 1180) - 50;
      const size = 1.5 + (i % 4);
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: size,
            height: size,
            borderRadius: 99,
            background: "#e7eef5",
            opacity: 0.2 + (i % 5) * 0.1,
          }}
        />
      );
    })}
  </div>
);

export const Panel: FC<{
  children: ReactNode;
  style?: CSSProperties;
  accent?: string;
}> = ({children, style, accent = "rgba(244,239,230,0.18)"}) => (
  <div
    style={{
      background: "rgba(8,10,14,0.72)",
      border: `1px solid ${accent}`,
      borderRadius: 18,
      padding: "22px 26px",
      ...style,
    }}
  >
    {children}
  </div>
);

const ChessGlyph: FC<{kind: string; white: boolean}> = ({kind, white}) => {
  const fill = white ? "#f7f3ea" : "#1a120c";
  const stroke = white ? "#2a2118" : "#f3e6d4";
  const common = {fill, stroke, strokeWidth: 2, strokeLinejoin: "round" as const};
  if (kind === "P") {
    return (
      <g>
        <circle cx="20" cy="13" r="5.5" {...common} />
        <path d="M14.5 33 h11 l-1.6-9 h-7.8 z" {...common} />
      </g>
    );
  }
  if (kind === "R") {
    return <path d="M11 33 h18 v-9 h3.5 v-4 h-6 v-4 h-3.5 v4 h-5 v-4 h-3.5 v4 h-6 v4 h3.5 z" {...common} />;
  }
  if (kind === "N") {
    return (
      <path
        d="M27 33 H13 c.2-6 1.4-8 2-12 .4-2 1.2-5 4.2-7.2 1.2 2.4.2 4.2-1 5.4 3.6-.4 7.2 1.2 8.2 4.6 1.6-.2 3-1.8 3.2-3.6 2.4 1.6 3.2 4.6 2 8 .2 2.2-.8 3.6-1.6 4.8 z"
        {...common}
      />
    );
  }
  if (kind === "B") {
    return (
      <g>
        <circle cx="20" cy="7.5" r="2.3" {...common} />
        <path d="M20 11.2 c4.8 4.2 7 8 7 12.2 a7 7 0 1 1-14 0 c0-4.2 2.2-8 7-12.2z" {...common} />
        <path d="M13 33 h14 v-3.2 h-14 z" {...common} />
      </g>
    );
  }
  if (kind === "Q") {
    return (
      <path
        d="M7 31 h26 l-1.5-8 4.5 2.2 4.2-11-5.2 8.2-5-9.2-5 9.2-5.2-8.2 4.2 11 4.5-2.2 z"
        {...common}
      />
    );
  }
  return (
    <g>
      <path d="M18 3.5 h4 v3.2 h3.2 v4 h-3.2 v2.2 h-4 v-2.2 h-3.2 v-4 h3.2 z" {...common} />
      <path d="M12.5 33 h15 l-1.8-8.5 a7.2 7.2 0 1 0-11.4 0 z" {...common} />
    </g>
  );
};

export const ChessBoard: FC<{frame: number}> = ({frame}) => {
  const board = [
    "r.bq.rk.",
    "pp...ppp",
    "..p.n...",
    "...p....",
    "...P..N.",
    "..N.B...",
    "PPP..PPP",
    "R..Q.RK.",
  ];
  const pop = fade(frame, 4, 18);
  return (
    <div
      style={{
        width: 536,
        height: 536,
        padding: 18,
        background: "#5a3718",
        borderRadius: 8,
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        opacity: pop,
        scale: String(0.96 + pop * 0.04),
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          width: 500,
          height: 500,
        }}
      >
        {board.flatMap((row, r) =>
          row.split("").map((cell, c) => {
            const dark = (r + c) % 2 === 1;
            const white = cell === cell.toUpperCase() && cell !== ".";
            return (
              <div
                key={`${r}${c}`}
                style={{
                  background: dark ? "#b58863" : "#f0d9b5",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {cell !== "." ? (
                  <svg width="48" height="48" viewBox="0 0 40 40" style={{filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.4))"}}>
                    <ChessGlyph kind={cell.toUpperCase()} white={white} />
                  </svg>
                ) : null}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

const stones: Array<[number, number, "b" | "w" | "gold"]> = [
  [3, 3, "b"],
  [3, 4, "w"],
  [4, 3, "w"],
  [4, 4, "b"],
  [2, 4, "b"],
  [5, 3, "b"],
  [5, 4, "w"],
  [4, 5, "w"],
  [6, 4, "b"],
  [2, 3, "w"],
  [3, 2, "b"],
  [6, 2, "w"],
  [7, 3, "b"],
  [8, 4, "w"],
  [9, 3, "b"],
  [10, 4, "w"],
  [9, 5, "b"],
  [8, 6, "w"],
  [7, 5, "b"],
  [6, 6, "w"],
  [5, 7, "b"],
  [4, 8, "w"],
  [11, 10, "b"],
  [12, 10, "w"],
  [11, 11, "w"],
  [10, 11, "b"],
  [15, 15, "gold"],
];

export const GoBoard: FC<{frame: number}> = ({frame}) => {
  const n = 19;
  const size = 560;
  const pad = 28;
  const gap = (size - pad * 2) / (n - 1);
  const drop = fade(frame, 8, 14);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} rx="10" fill="#e0b56a" />
      {Array.from({length: n}, (_, i) => (
        <g key={i} stroke="#3a2412" strokeWidth="1.2">
          <line x1={pad + i * gap} y1={pad} x2={pad + i * gap} y2={size - pad} />
          <line x1={pad} y1={pad + i * gap} x2={size - pad} y2={pad + i * gap} />
        </g>
      ))}
      {[3, 9, 15].flatMap((x) =>
        [3, 9, 15].map((y) => (
          <circle
            key={`${x}${y}`}
            cx={pad + x * gap}
            cy={pad + y * gap}
            r="3.5"
            fill="#3a2412"
          />
        )),
      )}
      {stones.map(([x, y, color], i) => {
        const cx = pad + x * gap;
        const cy = pad + y * gap;
        const isGold = color === "gold";
        const show = isGold ? drop : fade(frame, i * 0.4, 10);
        return (
          <g key={`${x}-${y}`} opacity={show}>
            {isGold ? (
              <circle
                cx={cx}
                cy={cy}
                r={12 + (1 - drop) * 28}
                fill="none"
                stroke="#f5d76e"
                strokeWidth="2"
                opacity={1 - drop}
              />
            ) : null}
            <circle
              cx={cx}
              cy={cy}
              r={isGold ? 11 * (0.7 + drop * 0.3) : 11}
              fill={color === "b" ? "#161616" : color === "w" ? "#f7f4ee" : "#f5d76e"}
              stroke={color === "w" ? "#c8b48a" : "transparent"}
            />
          </g>
        );
      })}
    </svg>
  );
};

export const NeuralNet: FC<{frame: number; color: string}> = ({frame, color}) => {
  const layers = [4, 7, 6, 3];
  const width = 1080;
  const height = 460;
  const nodes = layers.map((count, li) =>
    Array.from({length: count}, (_, ni) => ({
      x: 70 + (li * (width - 140)) / (layers.length - 1),
      y: 36 + ((ni + 0.5) * (height - 72)) / count,
    })),
  );
  const draw = progress(frame, 0, 26, 0, 1);
  const path = [nodes[0][1], nodes[1][3], nodes[2][2], nodes[3][1]];
  const hop = Math.min(path.length - 2, Math.floor((frame % 40) / 10));
  const along = ((frame % 40) % 10) / 10;
  const a = path[hop];
  const b = path[hop + 1];
  const px = a.x + (b.x - a.x) * along;
  const py = a.y + (b.y - a.y) * along;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {nodes.slice(0, -1).map((layer, li) =>
        layer.flatMap((from, fi) =>
          nodes[li + 1].map((to, ti) => (
            <line
              key={`${li}-${fi}-${ti}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={color}
              strokeWidth="1.4"
              opacity={0.18 * draw}
            />
          )),
        ),
      )}
      {nodes.map((layer, li) =>
        layer.map((node, ni) => (
          <circle
            key={`${li}-${ni}`}
            cx={node.x}
            cy={node.y}
            r={li === 0 || li === nodes.length - 1 ? 11 : 9}
            fill="#07080c"
            stroke={color}
            strokeWidth="2"
            opacity={fade(frame, li * 4 + ni, 10)}
          />
        )),
      )}
      <circle cx={px} cy={py} r="7" fill={bone} opacity={draw} />
    </svg>
  );
};

export const ConfidenceChart: FC<{frame: number; crash?: boolean; color: string}> = ({
  frame,
  crash = false,
  color,
}) => {
  const width = 1280;
  const height = 420;
  const pts = crash
    ? [
        [80, 320],
        [280, 250],
        [520, 170],
        [760, 110],
        [980, 80],
        [1200, 340],
      ]
    : [
        [80, 330],
        [300, 260],
        [560, 180],
        [820, 120],
        [1100, 70],
      ];
  const shown = Math.max(2, Math.round(progress(frame, 0, 24, 2, pts.length)));
  const visible = pts.slice(0, shown);
  const d = visible.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  const labels = crash
    ? ["1956", "1960", "1966", "1970", "1973", "1974"]
    : ["1956", "1961", "1966", "1968", "1970"];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <line x1="60" y1="360" x2="1240" y2="360" stroke="rgba(244,239,230,0.25)" />
      <path d={d} fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      {visible.map((p, i) => (
        <g key={labels[i]}>
          <circle cx={p[0]} cy={p[1]} r="6" fill={color} />
          <text
            x={p[0]}
            y="396"
            textAnchor="middle"
            fill={boneDim}
            fontFamily={monoFamily}
            fontSize="16"
          >
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
};

export const AttentionMatrix: FC<{frame: number}> = ({frame}) => {
  const tokens = ["The", "model", "attends", "to", "every", "token"];
  const scores = [
    [0.7, 0.2, 0.3, 0.1, 0.2, 0.4],
    [0.2, 0.8, 0.5, 0.2, 0.3, 0.4],
    [0.2, 0.4, 0.6, 0.5, 0.9, 0.7],
    [0.1, 0.2, 0.4, 0.5, 0.4, 0.3],
    [0.2, 0.3, 0.8, 0.4, 0.7, 0.5],
    [0.3, 0.4, 0.6, 0.3, 0.5, 0.8],
  ];
  return (
    <div style={{display: "flex", gap: 28, alignItems: "center"}}>
      <div style={{display: "flex", flexDirection: "column", gap: 8}}>
        {tokens.map((token, i) => (
          <div
            key={token}
            style={{
              fontFamily: monoFamily,
              fontSize: 20,
              color: bone,
              opacity: fade(frame, i * 3, 8),
              border: "1px solid rgba(245,215,110,0.4)",
              padding: "8px 12px",
              borderRadius: 8,
              minWidth: 110,
              textAlign: "center",
            }}
          >
            {token}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 54px)",
          gap: 6,
        }}
      >
        {scores.flatMap((row, r) =>
          row.map((score, c) => (
            <div
              key={`${r}${c}`}
              style={{
                width: 54,
                height: 54,
                borderRadius: 6,
                background: `rgba(245,215,110,${0.08 + score * 0.85})`,
                opacity: fade(frame, 8 + r * 2 + c, 10),
              }}
            />
          )),
        )}
      </div>
    </div>
  );
};

export const CoreField: FC<{frame: number; color: string}> = ({frame, color}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(18, 1fr)",
      gap: 8,
      width: 820,
    }}
  >
    {Array.from({length: 18 * 8}, (_, i) => {
      const wave = Math.sin(i * 0.35 - frame * 0.25);
      const on = fade(frame, (i % 18) * 0.6, 8);
      return (
        <div
          key={i}
          style={{
            height: 22,
            borderRadius: 3,
            background: color,
            opacity: on * (0.2 + (wave > 0 ? 0.8 : 0.25)),
          }}
        />
      );
    })}
  </div>
);
