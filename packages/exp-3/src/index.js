export const name = 'exp-3';

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