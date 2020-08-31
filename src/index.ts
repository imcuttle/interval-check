/**
 * Polling check by intervally
 * @author imcuttle
 */
export function setIntervalDisposer(fn: Function, interval: number) {
  const timer = setInterval(fn, interval)
  return () => clearInterval(timer)
}

/**
 * @public
 * @param fn {Function}
 * @param shouldStop {() => boolean | Promise<boolean>}
 * @param interval {number}
 * @return {Function}
 * @example
 * import setIntervalCheck from 'interval-check'
 *
 * let data
 * fetch('/data').then((res) => {
 *   data = res
 * })
 *
 * const dispose = setIntervalCheck(() => {
 *   console.log('fetching /data')
 * }, () => !!data, 1000)
 */
export default function setIntervalCheck(fn: Function, shouldStop: () => boolean | Promise<boolean>, interval: number) {
  let dispose
  const wrapFn = async () => {
    if (shouldStop && (await shouldStop())) {
      // break
      return dispose()
    }
    fn && fn()
  }

  dispose = setIntervalDisposer(wrapFn, interval)

  return dispose
}
