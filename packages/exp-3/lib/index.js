import _regeneratorRuntime from "@babel/runtime-corejs2/regenerator";
import _Promise from "@babel/runtime-corejs2/core-js/promise";
export const name = 'exp-3';
const asyncFn = () => {
  return _regeneratorRuntime.async(function (_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        console.log('asyncFn');
        _context.next = 1;
        return _regeneratorRuntime.awrap(_Promise.resolve(1));
      case 1:
        console.log('asyncFn end');
      case 2:
      case "end":
        return _context.stop();
    }
  }, null, null, null, _Promise);
};
asyncFn();
export default {
  name,
  asyncFn
};