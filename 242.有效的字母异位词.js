/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
function count(str) {
  const map = []

  for (const char of str) {
    const index = char.codePointAt(0) - 'a'.codePointAt(0)

    map[index] ??= 0
    map[index]++
  }

  return map
}

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const mapS = count(s)
  const mapT = count(t)

  for (let i = 0; i < 26; i++) {
    if (mapS[i] !== mapT[i]) {
      return false
    }
  }

  return true
}
// @lc code=end
