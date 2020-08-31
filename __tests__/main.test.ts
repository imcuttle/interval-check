/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
const intervalCheck = require('../').default

describe('intervalCheck', function () {
  it('should spec use', function (done) {
    let count = 0
    intervalCheck(
      () => {
        count++
      },
      () => {
        if (count > 10) {
          expect(count).toBe(11)
          setTimeout(() => {
            expect(count).toBe(11)
            done()
          }, 1000)
          return true
        }
      },
      100
    )

    setTimeout(() => {
      expect(count).toBe(4)
    }, 440)
  })

  it('active dispose', function (done) {
    let count = 0

    const shouldStop = jest.fn(() => {
      return count > 10
    })
    const dispose = intervalCheck(
      () => {
        count++
      },
      shouldStop,
      100
    )

    setTimeout(() => {
      expect(count).toBe(4)
      dispose()
    }, 440)

    setTimeout(() => {
      expect(count).toBe(4)
      expect(shouldStop).toBeCalledTimes(4)
      done()
    }, 1200)
  })
})
