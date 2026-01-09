/**
 * babel插件 - 在console.log 调用中添加参数
 */
export default function ({ types: t }) {
  return {
    name: "plugin-add-console-parameter",
    visitor: {
      CallExpression(path) {
        // 检查是否是 console.log 调用
        if (
          t.isMemberExpression(path.node.callee) &&
          t.isIdentifier(path.node.callee.object, { name: "console" }) &&
          t.isIdentifier(path.node.callee.property, { name: "log" })
        ) {
          path.node.arguments.unshift(
            t.stringLiteral("[LOG]")
          );
        }
      },
    },
  };
}