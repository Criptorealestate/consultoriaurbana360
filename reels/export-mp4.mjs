// Exporta propietario-9x16.html a MP4 1080x1920 @30fps, cuadro por cuadro (sin tirones).
// Uso: node reels/export-mp4.mjs [salida.mp4] [fps]
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || path.join(here, "propietario-9x16.mp4");
const fps = +(process.argv[3] || 30);
const DURATION = 27;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(here, "propietario-9x16.html")).href + "?export=1");
await page.waitForFunction(() => window.__ready === true);

const ff = spawn("ffmpeg", ["-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-preset", "slow", "-movflags", "+faststart", out],
  { stdio: ["pipe", "inherit", "inherit"] });

const total = DURATION * fps;
for (let i = 0; i < total; i++) {
  await page.evaluate(t => window.renderAt(t), i / fps);
  const buf = await page.screenshot({ type: "png" });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
  if (i % fps === 0) process.stdout.write(`\r${(i / fps).toFixed(0)}s / ${DURATION}s`);
}
ff.stdin.end();
await new Promise(r => ff.on("close", r));
await browser.close();
console.log(`\nListo: ${out}`);
