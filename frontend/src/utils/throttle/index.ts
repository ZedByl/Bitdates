/**
 * Тротлинг
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const throttle = (func: Function, timeFrame: number) => {
  if (typeof func !== "function") {
    console.error("Throttle: передана не функция!");
    return () => {};
  }
  let lastTime = 0;
  return function (this: any, ..._args: any[]) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func.apply(this, _args);
      lastTime = now;
    }
  };
};
