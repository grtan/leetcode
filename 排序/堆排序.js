const Heap = require('../树/堆')

/**
 * 首先用已有数据列表创建堆，复杂度O(n)
 * 然后一次取出最大/小值，每次操作复杂度O(logn)，整体复杂度O(nlogn)
 * 最佳情况O(nlogn)
 * 最差情况O(nlogn)
 * 平均情况O(nlogn)
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
  const heap = new Heap({
    list: list.map(item => ({
      id: item,
      value: item
    })),
    compare
  })
  let i = 0

  while (true) {
    const min = heap.getMin()

    if (!min) {
      break
    }

    list[i++] = min.value
  }
}

const list = new Array(20).fill(0).map(() => Math.round(Math.random() * 1000))

sort(list)
console.log(list)

sort(list, (a, b) => b - a)
console.log(list)
