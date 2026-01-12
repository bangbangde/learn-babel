#!/usr/bin/env node
import path from "node:path";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function showHelp() {
  console.log("Usage: test.js <test-name> [options]");
  console.log("");
  console.log("Options:");
  console.log("  -h, --help          Show this help message");
  console.log("  --config <file>     Specify custom Babel config file");
  console.log("  --watch             Watch files for changes and recompile");
  console.log("");
  console.log("Examples:");
  console.log("  test.js demo");
  console.log("  test.js runtime --config custom-babel.config.json");
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    testName: null,
    config: null,
    watch: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === "-h" || arg === "--help") {
      showHelp();
      process.exit(0);
    } else if (arg === "--config" && i + 1 < args.length) {
      options.config = args[i + 1];
      i++;
    } else if (arg === "--watch") {
      options.watch = true;
    } else if (!options.testName) {
      options.testName = arg;
    } else {
      console.error(`Unknown argument: ${arg}`);
      showHelp();
      process.exit(1);
    }
  }

  if (!options.testName) {
    console.error("Error: Test name is required");
    showHelp();
    process.exit(1);
  }

  return options;
}

function test(options) {
  const { testName, config, watch } = options;
  const testDir = path.resolve(__dirname, `../tests/${testName}`);
  const src = path.resolve(testDir, "input.js");
  const dest = path.resolve(testDir, "output.js");
  const defaultConfig = path.resolve(testDir, "option.js");

  let babelArgs = ["babel", src, "--out-file", dest];
  
  babelArgs.push("--config-file", config || defaultConfig);
  
  if (watch) {
    babelArgs.push("--watch");
  }

  console.log(`Running Babel on ${testName}...`);
  console.log(`Command: babel ${babelArgs.join(" ")}`);
  console.log("");
  // 使用 shell: true 以确保在 Windows 系统下正确解析路径
  const result = spawnSync(babelArgs.join(" "), { stdio: "inherit", shell: true });

  if (!watch) {
    if (result.status === 0) {
      console.log("\n✅ Compilation completed successfully!");
      console.log(`Output file: ${dest}`);
    } else {
      console.error("\n❌ Compilation failed!");
      process.exit(result.status || 1);
    }
  }
}

const options = parseArgs();
test(options);