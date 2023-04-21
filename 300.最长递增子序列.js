/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const map = {};
  let longest = [];

  for (let i = 0; i < nums.length; i++) {
    // 以nums[i]结尾的递增子序列，数组保存序列元素的位置索引
    map[i] ??= [];

    // 找到以nums[i]结尾的递增子序列
    for (let j = i - 1; j > -1; j--) {
      if (nums[j] < nums[i] && map[j].length > map[i].length) {
        map[i] = [...map[j]];
      } else if (nums[j] === nums[i] && map[j].length - 1 > map[i].length) {
        map[i] = [...map[j].slice(0, -1)];
      }
    }

    // 添加i到末尾
    map[i].push(i);

    if (map[i].length > longest.length) {
      longest = map[i];
    }
  }

  return longest.length;
};
// @lc code=end
