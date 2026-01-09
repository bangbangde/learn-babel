export const name = 'exp-2';
console.log("[LOG]", name, '自定义plugin');
const asyncFn = async () => {
  console.log("[LOG]", 'asyncFn');
  await Promise.resolve(1);
  console.log("[LOG]", 'asyncFn end');
};
asyncFn();
export default {
  name,
  asyncFn
};