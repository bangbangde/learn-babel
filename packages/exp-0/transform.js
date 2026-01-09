import fs from "node:fs";
import path from "node:path";
import { transformSync } from "@babel/core";

const __dirname = import.meta.dirname;

const code = fs.readFileSync(path.resolve(__dirname, "./src/index.js"), "utf8");

const optionsObject = {
  plugins: ["@babel/plugin-transform-arrow-functions"],
};

const result = transformSync(code, optionsObject);

const outputDir = path.resolve(__dirname, "./dist");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.resolve(outputDir, "index.js"), result.code);

console.log("exp-0 transform success:\n```\n" + result.code + '\n```');
