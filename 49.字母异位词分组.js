/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
function getKey(str) {
  const map = new Array(26).fill(0)

  for (const char of str) {
    const index = char.codePointAt(0) - 'a'.codePointAt(0)

    map[index]++
  }

  return map.join(',')
}

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = {}

  for (const str of strs) {
    const key = getKey(str)

    map[key] ??= []
    map[key].push(str)
  }

  return Object.entries(map).map(([key, value]) => {
    return value
  })
}
// @lc code=end
