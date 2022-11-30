/**
 * 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 * 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
 * 针对所有的元素重复以上的步骤，除了最后一个。
 * 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 * https://visualgo.net/zh/sorting
 * https://www.runoob.com/w3cnote/ten-sorting-algorithm.html
 * 最佳情况O(n)
 * 最差情况O(n²)
 * 平均情况O(n²)
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
  for (let i = list.length - 1; i > 0; i--) {
    let swapped = false

    for (let j = 0; j < i; j++) {
      if (compare(list[j + 1], list[j]) < 0) {
        ;[list[j], list[j + 1]] = [list[j + 1], list[j]]
        swapped = true
      }
    }

    // 优化，如果该轮没有交换过，证明顺序已经正确了
    if (!swapped) {
      break
    }
  }
}

const list = new Array(20).fill(0).map(() => Math.round(Math.random() * 1000))

sort(list)
console.log(list)

sort(list, (a, b) => b - a)
console.log(list)
