#!/usr/bin/env node
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 颜色输出工具
const colors = {
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

/**
 * 打印带颜色的日志
 * @param {string} message - 日志消息
 * @param {string} color - 颜色代码
 */
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * 打印错误信息并退出
 * @param {string} message - 错误消息
 */
function error(message) {
  console.error(`${colors.red}错误: ${message}${colors.reset}`);
  process.exit(1);
}

/**
 * 检查子包名称是否合法
 * @param {string} name - 子包名称
 * @returns {boolean} - 是否合法
 */
function isValidPackageName(name) {
  // 包名规则：只能包含小写字母、数字、连字符和下划线，不能以连字符开头
  return /^[a-z0-9_][a-z0-9_-]*$/.test(name);
}

/**
 * 显示帮助信息
 */
function showHelp() {
  log("用法: node init.js <子包名称> [依赖1] [依赖2] ...", colors.blue);
  log("");
  log("选项:", colors.blue);
  log("  --help, -h    显示此帮助信息", colors.blue);
  log("");
  log("示例:", colors.blue);
  log("  node init.js my-package", colors.blue);
  log("  node init.js utils lodash axios", colors.blue);
  process.exit(0);
}

/**
 * 主函数
 */
function main() {
  // 解析命令行参数
  let args = process.argv.slice(2);
  let subPackageName = null;
  let dependencies = [];

  // 处理命令行选项
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      showHelp();
    } else if (!subPackageName) {
      subPackageName = arg;
    } else {
      dependencies.push(arg);
    }
  }

  log("🚀 开始初始化子包...", colors.blue);

  // 检查子包名称
  if (!subPackageName) {
    error("请输入子包名称");
  }

  if (!isValidPackageName(subPackageName)) {
    error(
      "子包名称不合法，只能包含小写字母、数字、连字符和下划线，不能以连字符开头"
    );
  }

  log(`📦 子包名称: ${subPackageName}`, colors.green);
  if (dependencies.length > 0) {
    log(`📚 要安装的依赖: ${dependencies.join(", ")}`, colors.green);
  }

  // 确保 packages 目录存在
  const packagesDir = path.resolve(__dirname, "../packages");
  try {
    if (!fs.existsSync(packagesDir)) {
      log(`📁 创建 packages 目录: ${packagesDir}`, colors.yellow);
      fs.mkdirSync(packagesDir, { recursive: true });
    }
  } catch (err) {
    error(`创建 packages 目录失败: ${err.message}`);
  }

  // 检查子包目录是否已存在
  const subPackageDir = path.join(packagesDir, subPackageName);
  if (fs.existsSync(subPackageDir)) {
    error(`子包目录 ${subPackageName} 已存在，请使用其他名称`);
  }

  // 创建子包目录
  try {
    log(`📁 创建子包目录: ${subPackageDir}`, colors.yellow);
    fs.mkdirSync(subPackageDir, { recursive: true });
  } catch (err) {
    error(`创建子包目录失败: ${err.message}`);
  }

  // 初始化子包的 package.json 文件
  const packageJson = {
    name: subPackageName,
    version: "1.0.0",
    description: "",
    type: "module",
    scripts: {
      test: "babel src --out-dir lib",
    },
    packageManager: "pnpm@10.27.0",
  };

  // 写入子包的 package.json 文件
  try {
    const packageJsonPath = path.join(subPackageDir, "package.json");
    log(`📄 生成 package.json 文件`, colors.yellow);
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (err) {
    error(`写入 package.json 文件失败: ${err.message}`);
  }

  // 创建子包的 src 目录
  try {
    const srcDir = path.join(subPackageDir, "src");
    log(`📁 创建 src 目录`, colors.yellow);
    fs.mkdirSync(srcDir, { recursive: true });
  } catch (err) {
    error(`创建 src 目录失败: ${err.message}`);
  }

  // 创建子包的 src/index.js 文件
  try {
    const srcIndexJs = path.join(subPackageDir, "src", "index.js");
    log(`📄 生成 src/index.js 文件`, colors.yellow);
    fs.writeFileSync(srcIndexJs, `export const name = '${subPackageName}';\n`);
  } catch (err) {
    error(`写入 src/index.js 文件失败: ${err.message}`);
  }

  // 创建 babel.config.json 文件
  try {
    const babelConfigPath = path.join(subPackageDir, "babel.config.json");
    log(`📄 生成 babel.config.json 文件`, colors.yellow);
    fs.writeFileSync(babelConfigPath, `{}\n`);
  } catch (err) {
    error(`写入 babel.config.json 文件失败: ${err.message}`);
  }

  // 安装依赖
  log(`📦 安装依赖...`, colors.blue);
  // 在Windows环境下需要使用shell: true来执行pnpm命令
  const result = spawnSync(
    ["pnpm","install", "@babel/cli", "@babel/core", ...dependencies].join(" "),
    {
      cwd: subPackageDir,
      stdio: "inherit",
      shell: true,
    }
  );

  if (result.status !== 0) {
    error(`依赖安装失败，退出码: ${result.status}`);
  }
  log(`✅ 依赖安装完成`, colors.green);

  log(`\n🎉 子包 ${subPackageName} 初始化完成！`, colors.green);
  log(`\n下一步操作:`, colors.blue);
  log(`1. 进入子包目录: cd packages/${subPackageName}`, colors.blue);
  log(`2. 编辑 src/index.js 添加功能`, colors.blue);
  log(`3. 运行测试: npm test`, colors.blue);
}

// 执行主函数
main();
