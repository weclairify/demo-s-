import { readdirSync, writeFileSync } from "fs";

const assets = readdirSync("dist/client/assets");
const css = assets.find((f) => f.endsWith(".css"));
const mainJs = assets.filter((f) => f.endsWith(".js") && f.startsWith("index-"));

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Weclairify — AI Opleiding 2026 | Van begrip naar bouwer</title>
    <meta name="description" content="3-daagse hybride AI-training in Amsterdam. Leer werken met Claude, ChatGPT, Copilot, Gemini en Perplexity. Bouw eigen assistenten en agents." />
    ${css ? `<link rel="stylesheet" href="/assets/${css}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    ${mainJs.map((f) => `<script type="module" src="/assets/${f}"></script>`).join("\n    ")}
  </body>
</html>`;

writeFileSync("dist/client/index.html", html);
console.log("Generated dist/client/index.html");
