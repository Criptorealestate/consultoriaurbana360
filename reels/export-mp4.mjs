// Exporta una animación de reels/ a MP4 1080x1920 @30fps, cuadro por cuadro (sin tirones).
// Uso: node reels/export-mp4.mjs [animacion.html] [salida.mp4] [fps]
//      (por defecto: propietario-9x16.html)
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const html = path.resolve(here, process.argv[2] || "propietario-9x16.html");
const out = process.argv[3] || html.replace(/\.html$/, ".mp4");
const fps = +(process.argv[4] || 30);

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(html).href + "?export=1");
await page.waitForFunction(() => window.__ready === true);
const DURATION = await page.evaluate(() => DURATION);

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
