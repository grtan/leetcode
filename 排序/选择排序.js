/**
 * 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
 * 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 重复第二步，直到所有元素均排序完毕。
 * https://visualgo.net/zh/sorting
 * https://www.runoob.com/w3cnote/ten-sorting-algorithm.html
 * 最佳情况O(n²)
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
  for (let i = 0; i < list.length - 1; i++) {
    let minIndex = i

    for (let j = i + 1; j < list.length; j++) {
      if (compare(list[j], list[minIndex]) < 0) {
        minIndex = j
      }
    }

    ;[list[i], list[minIndex]] = [list[minIndex], list[i]]
  }
}

const list = new Array(20).fill(0).map(() => Math.round(Math.random() * 1000))

sort(list)
console.log(list)

sort(list, (a, b) => b - a)
console.log(list)
