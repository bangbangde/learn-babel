# learn-babel

通过实验学习 babel。

## 项目介绍

本项目通过一系列递进的实验，帮助你理解 Babel 的核心概念、工作原理和使用方法。每个实验都专注于 Babel 的不同方面，从基本的代码转换到自定义插件开发。

## 目录结构

```
learn-babel/
├── bin/             # 工具脚本
│   ├── init.js      # 初始化脚本
│   └── test.js      # 测试脚本
├── packages/        # 实验目录
│   ├── exp-0/       # 实验 0：基础 API 使用
│   ├── exp-1/       # 实验 1：配置文件使用
│   ├── exp-2/       # 实验 2：自定义插件开发
│   └── exp-3/       # 实验 3：高级转换示例
├── tests/           # 快速测试用例
│   ├── demo/        # 演示测试
│   └── ...
├── package.json     # 项目配置
├── pnpm-lock.yaml   # 依赖锁定文件
├── pnpm-workspace.yaml # 工作区配置
└── README.md        # 项目说明
```

## 安装

本项目使用 pnpm 作为包管理器，请确保已安装 pnpm：

```bash
# 安装 pnpm（如果尚未安装）
npm install -g pnpm

# 克隆项目
git clone https://github.com/your-username/learn-babel.git
cd learn-babel

# 安装依赖
pnpm install
```

## 实验说明

### 实验 0：基础 API 使用
- **目标**：学习使用 Babel 核心 API 进行代码转换
- **实现**：直接使用 `@babel/core` 的 `transformSync` 方法，手动读取源代码文件，应用转换插件，然后将转换后的代码写入输出文件
- **源代码**：
  ```javascript
  // src/index.js
  const name = 'learn-babel';
  export const getName = () => name;
  ```
- **预期输出**：箭头函数被转换为普通函数

### 实验 1：配置文件使用
- **目标**：学习使用 Babel 配置文件
- **实现**：通过 `babel.config.json` 配置插件，使用 `@babel/cli` 命令行工具进行代码转换
- **预期输出**：箭头函数被转换为普通函数，输出到 `dist` 目录

### 实验 2：自定义插件开发
- **目标**：学习开发 Babel 自定义插件
- **实现**：创建简单的自定义插件 `my-plugin.js`，在 `console.log` 调用中添加 `[LOG]` 前缀
- **预期输出**：所有 `console.log` 调用都添加了 `[LOG]` 前缀

### 实验 3：高级转换示例
- **目标**：学习更复杂的代码转换场景
- **实现**：使用 `@babel/plugin-transform-regenerator` 和 `@babel/plugin-transform-runtime` 插件，处理异步函数的转换
- **预期输出**：异步函数被转换为使用 regenerator-runtime 的代码

## 快速测试目录

本项目包含了一些快速测试用例，用于验证 Babel 转换的结果。这些测试用例位于 `tests/` 目录下。
使用 `bin/test.js` 脚本可以运行这些测试用例。例如：

```bash
npx test demo
```

这相当于执行`babel tests/demo/input.js --out-file tests/demo/output.js --config-file tests/demo/option.js`命令。