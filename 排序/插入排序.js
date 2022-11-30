/**
 * 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
 * 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。
 * （如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）
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
  for (let i = 1; i < list.length; i++) {
    for (let j = i; j > 0; j--) {
      if (compare(list[j], list[j - 1]) < 0) {
        ;[list[j - 1], list[j]] = [list[j], list[j - 1]]
      } else {
        break
      }
    }
  }
}

const list = new Array(20).fill(0).map(() => Math.round(Math.random() * 1000))

sort(list)
console.log(list)

sort(list, (a, b) => b - a)
console.log(list)
