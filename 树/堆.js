/**
 * 堆是一颗完全二叉树，存储的数据局部有序
 * 最大值堆任意一个节点的值都大于或等于其任意一个子节点的值，所以根节点的值最大
 * 最小值堆任意一个节点的值都小于或等于其任意一个子节点的值，所以根节点的值最小
 * 对于给定的一组数，堆并不是唯一的
 *
 * 添加、获取数据复杂度O(logn)
 * 将已有数据列表构建成堆复杂度O(n)
 */
class Heap {
  constructor({ list = [], compare = (a, b) => a - b } = {}) {
    // 使用数组保存树结构
    this.list = [...list]
    this.compare = compare

    // 初始list可能不是堆，需要构建成堆
    if (this.list.length) {
      this.build()
    }
  }

  /**
   * 根据list中已有的数据建堆
   *
   * 假设根R的左右子树都已经是最小值堆了，那么只需要将根节点与子节点中的最小值进行对比
   * 如果比子节点最小值大，那么交换两个节点的位置，并继续往下一层层与子节点进行比较、交换
   * 直到R不大于子节点的最小值或者R成为叶节点，此时整个树就是个最小值堆了
   *
   * 这种方法假设了左右子树已经是堆了，说明完整的算法可以按照某种顺序访问节点来实现
   * 所以我们可以从树的底部向上访问来构建堆，并且不需要访问叶子节点，因为他们已经是最下层，不会再下移了
   * 所以建堆的过程从数组中部的最后一个分支节点（即数组最后一个元素的父节点）开始，整体复杂度为O(n)
   *
   * 这种方法比依次插入n个元素效率高，因为依次插入n个元素需要O(nlogn)
   */
  build() {
    /**
     * 从最后一个分支节点（即数组最后一个元素的父节点）开始moveDown
     * 这样可以保证上层节点moveDown时，其左右子树都已经是堆了
     */
    for (let i = Math.floor((this.list.length - 1 - 1) / 2); i > -1; i--) {
      this.moveDown(i)
    }
  }

  /**
   * 假设index节点的左右子树都已经是堆了，检查index节点是否比所有后代节点都小
   * 如果不是，则当前以index节点作为根节点的树还不是最小值堆
   * 需要将index节点往下一层层比较、交换，直到变成最小值堆，复杂度为该树的深度
   */
  moveDown(index) {
    for (let parent = index, left = 2 * parent + 1, right = 2 * parent + 2; ; ) {
      // 没有子节点
      if (left >= this.list.length) {
        break
      }

      // 只有左子节点
      if (right >= this.list.length) {
        // 父节点比左子节点大，交换两个节点的位置
        if (this.compare(this.list[parent].id, this.list[left].id) > 0) {
          ;[this.list[parent], this.list[left]] = [this.list[left], this.list[parent]]
        }

        break
      }

      // 有左右子节点
      const min = this.compare(this.list[left].id, this.list[right].id) < 0 ? left : right

      if (this.compare(this.list[parent].id, this.list[min].id) > 0) {
        // 父节点比子节点中最小的值大，交换两个节点的位置，并进行下一层比较
        ;[this.list[parent], this.list[min]] = [this.list[min], this.list[parent]]
        parent = min
        left = 2 * parent + 1
        right = 2 * parent + 2
      } else {
        break
      }
    }
  }

  /**
   * 添加数据 {id: xxx, value: xxx}
   * 先将元素添加到末尾，然后再与父节点一层层比较
   * 如果比父节点小，就替换两者的位置，否则结束一层层比较
   * 最差情况下，插入的节点需要从树的底部移动到顶部，此时复杂度为O(logn)
   */
  add(data) {
    this.list.push({
      ...data
    })

    for (
      let i = this.list.length - 1, parent = Math.floor((i - 1) / 2);
      parent > -1 && this.compare(this.list[i].id, this.list[parent].id) < 0;
      i = parent, parent = Math.floor((i - 1) / 2)
    ) {
      ;[this.list[i], this.list[parent]] = [this.list[parent], this.list[i]]
    }
  }

  /**
   * 删除index节点
   * 先将index的位置替换成最后的节点，然后删除最后节点
   * 最后再moveDown(index)
   */
  remove(index) {
    if (index >= this.list.length) {
      return
    }

    const data = this.list[index]

    // 将index节点替换成最后一个节点
    this.list[index] = this.list[this.list.length - 1]
    // 移除最后一个节点
    this.list.pop()
    // 下移index节点
    this.moveDown(index)

    return data
  }

  /**
   * 获取最小值
   * 复杂度为O(logn)
   */
  getMin() {
    return this.remove(0)
  }
}

module.exports = Heap

const list = new Array(5).fill().map(() => ({
  id: Math.floor(Math.random() * 100),
  value: Math.floor(Math.random() * 100)
}))
const list2 = new Array(5).fill().map(() => ({
  id: Math.floor(Math.random() * 100),
  value: Math.floor(Math.random() * 100)
}))
const heap = new Heap({
  list
})

for (const item of list2) {
  heap.add(item)
}

console.log('list', list)
console.log('list2', list2)

while (true) {
  const min = heap.getMin()

  if (!min) {
    break
  }

  console.log(min)
}
