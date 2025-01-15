/**
 * Тротлинг
 */
export const throttle = (func: any, timeFrame: number) => {
  if (typeof func !== 'function' || timeFrame == undefined) return null;
  let lastTime = 0;
  return function (...args: any) {
    const now: any = new Date();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
};
