/**
 * 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
 * 按增量序列个数 k，对序列进行 k 趟排序；
 * 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子序列进行直接插入排序。
 * 仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
 * 增量序列每次除以3时，即..., 1+(1+(1+1*3)*3)*3, 1+(1+1*3)*3, 1+1*3, 1时效果比较好
 * https://visualgo.net/zh/sorting
 * https://www.runoob.com/w3cnote/ten-sorting-algorithm.html
 * 最佳情况O(n)
 * 最差情况O(n(logn)²)
 * 平均情况O(n^1.5)
 */
function sort(
  list,
  /**
   * result<0表示a<b
   * result=0表示a=b
   * result>0表示a>b
   */
  compare = (a, b) => {
    return a - b
  }
) {
  // 子序列元素间隔
  let gap = 1

  // 动态定义间隔序列
  while (gap < list.length / 3) {
    gap = gap * 3 + 1
  }

  for (; gap > 0; gap = Math.floor(gap / 3)) {
    // 这里就是间隔gap的插入排序
    for (let i = gap; i < list.length; i++) {
      for (let j = i; j > 0; j -= gap) {
        if (compare(list[j], list[j - gap]) < 0) {
          ;[list[j - gap], list[j]] = [list[j], list[j - gap]]
        } else {
          break
        }
      }
    }
  }
}

const list = new Array(20).fill(0).map(() => Math.round(Math.random() * 1000))

sort(list)
console.log(list)

sort(list, (a, b) => b - a)
console.log(list)
