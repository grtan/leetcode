/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} list
 * @return {number[][]}
 */
var merge = function (list) {
  const result = []

  for (let item of list) {
    if (!result.length) {
      result.push(item)
      continue
    }

    for (let i = 0; i < result.length; i++) {
      const resultItem = result[i]

      // 在左边
      if (item[1] < resultItem[0]) {
        result.splice(i, 0, item)
        break
      } else if (item[1] === resultItem[0]) {
        result.splice(i, 1, [item[0], resultItem[1]])
        break
      } else if (item[1] <= resultItem[1]) {
        if (item[0] < resultItem[0]) {
          result.splice(i, 1, [item[0], resultItem[1]])
          break
        } else {
          break
        }
      } else {
        // 下一轮处理
        if (item[0] > resultItem[1]) {
          if (i === result.length - 1) {
            result.push(item)
            break
          } else {
            continue
          }
        } else {
          // 更新区间
          item = [Math.min(resultItem[0], item[0]), item[1]]

          if (i === result.length - 1) {
            result.splice(i, 1)
            result.push(item)
            break
          } else {
            result.splice(i, 1)
            i--
          }
        }
      }
    }
  }

  return result
}
// @lc code=end
