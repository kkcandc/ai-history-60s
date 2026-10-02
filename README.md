# History of AI, in 60 seconds

A mute-friendly motion film: Dartmouth, neural nets, the winters, deep learning, transformers, and agents. Thirty scenes, one typographic system, captions on every frame. Drawn with [Remotion](https://www.remotion.dev/) (React + TypeScript). No paid generative APIs. The score is synthesized in `scripts/score.ts`.

The picture is 1920×1080, 30 fps, exactly 1800 frames.

## Run it locally

```bash
npm install
npm test
npm run studio
```

`npm install` writes `public/score.wav`. Studio opens the timeline so you can scrub all 30 scenes.

The browser player, with chapter jumps:

```bash
npm run player
```

Then open the URL Vite prints (port 5173).

The same player is the Vercel production site. The build is `vite build` only. It does not render the MP4. `main` is ignored so an empty default branch cannot replace production.

## Export

```bash
npm run render
```

That regenerates the score and writes:

```text
out/history-of-ai.mp4
```

H.264, yuv420p, CRF 18. A faster half-resolution pass:

```bash
npm run render:preview
```

One frame, for a poster or a contact check:

```bash
npx remotion still HistoryOfAI out/stills/poster.png --frame=1760
```

Every scene, settled a few frames in:

```bash
npm run stills
```

Remotion uses the system Chrome at `/usr/bin/google-chrome` when that binary exists. Otherwise it downloads its own browser. Override with `REMOTION_BROWSER_EXECUTABLE`.

## What’s on screen

|  | Scene | Year |
|---|---|---|
| 01 | Can a machine think? | — |
| 02 | Turing | 1950 |
| 03 | The imitation game | 1950 |
| 04 | The proposal | 1955 |
| 05 | Four authors | 1955 |
| 06 | Dartmouth | 1956 |
| 07 | The perceptron | 1958 |
| 08 | Neural nets | 1958 |
| 09 | Twenty years | 1965 |
| 10 | ELIZA | 1966 |
| 11 | The climb | 1970 |
| 12 | First winter | 1974 |
| 13 | The quiet | 1974 |
| 14 | Expert systems | 1980 |
| 15 | Backpropagation | 1986 |
| 16 | Second winter | 1987 |
| 17 | Deep Blue | 1997 |
| 18 | The data age | 1998–11 |
| 19 | AlexNet | 2012 |
| 20 | Compute | 2012 |
| 21 | AlphaGo | 2016 |
| 22 | Attention | 2017 |
| 23 | The transformer | 2017 |
| 24 | Scale | 2018–20 |
| 25 | ChatGPT | 2022 |
| 26 | The conversation | 2023 |
| 27 | Many modalities | 2023 |
| 28 | Agents | 2024 |
| 29 | The loop | Now |
| 30 | Still being written | 1956–now |

Captions sit on the bottom of every frame, so the film holds with the sound off. The line under the header is a waveform that changes shape with the era: a question, a spike, a flatline, a square wave, a chord, a loop.

## Notes on the history

The film uses the public markers, not a fake dashboard.

- Turing’s 1950 paper asks whether machines can think, and offers the imitation game.
- The 31 August 1955 proposal by McCarthy, Minsky, Rochester, and Shannon contains the “precisely described” sentence. The Dartmouth workshop is summer 1956.
- Rosenblatt’s perceptron is 1958. ELIZA is Weizenbaum, 1966, including the “Men are all alike / In what way?” exchange.
- The first winter is dated here to 1974, after the 1973 Lighthill report and the funding pullback. The confidence chart is labeled as an illustration.
- Expert-system rules are a sketch of XCON-style configuration, not medical advice.
- The 1986 backpropagation revival is Rumelhart, Hinton, and Williams. The second winter is marked at 1987.
- Deep Blue’s 1997 match score is 3½–2½. The board is a composed diagram, not a claim about the final position.
- AlexNet (Krizhevsky, Sutskever, Hinton) cut ImageNet top-5 error from the prior year’s 25.8% to 15.3%, trained on two GTX 580s. The Go diagram evokes AlphaGo’s 2016 match with Lee Sedol, which AlphaGo won 4–1. Move 37 is game 2.
- “Attention Is All You Need” is arXiv:1706.03762, 2017. Parameter counts are the published GPT (117M), GPT-2 (1.5B), and GPT-3 (175B) figures, shown on a log scale.
- ChatGPT’s research preview is 30 November 2022.

Simon’s 1965 sentence is on screen in his wording. The caption underneath is the film’s own line.

## Project map

```text
src/timeline.ts          30 scenes, 1800 frames
src/HistoryOfAI.tsx      sequences, captions chrome, score
src/scenes/              the frames
src/components/          type, waveform, diagrams
scripts/score.ts         deterministic soundtrack
scripts/verify-timeline.ts
web/                     Vite player
```

`npm test` checks that the timeline is 30 scenes and exactly 60 seconds. `npm run typecheck` runs TypeScript.
