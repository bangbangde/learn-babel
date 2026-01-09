export const name = 'exp-2';

console.log(name, '自定义plugin')

const asyncFn = async () => {
  console.log('asyncFn')
  await Promise.resolve(1)
  console.log('asyncFn end')
}

asyncFn()

export default {
  name,
  asyncFn
}