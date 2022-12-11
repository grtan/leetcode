/**
 * 二叉查找树又叫二叉检索树、二叉排序树
 * 任一节点左子树中的任一节点都小于该节点，右子树中的任一节点都大于等于该节点
 * 中序周游该二叉树，会得到从小到大的排序列表
 *
 * 如果用无序链表、无序数组存储数据，那么插入数据O(1)，但查找、删除数据为O(n)
 * 如果用有序链表存储数据，插入、查找、删除数据都为O(n)
 * 如果用有序数组存储数据，查找数据可以用二分法，复杂度为O(logn)，但插入、删除数据为O(n)，
 * 因为即使可以二分法定位元素的位置，但需要挪动后面元素的位置
 * 如果用BST存储数据，插入、查找数据的代价取决于节点被找到/插入的深度，删除数据的代价取决于树的深度
 * 这也是要尽量保持BST尽量平衡（也就是使其高度尽量小）的原因
 * 如果将已排好序的列表元素逐个插入到BST中，那么生成的BST就是一条高度为n的链，此种情况插入、查找、删除效率都最差
 */
class BST {
  root = null

  /**
   * 添加数据 {id: xx, value: xxx}
   * 复杂度为数据被插入的深度
   * 所以我们要尽量让二叉树平衡，这样不管插入什么数据都是O(logn)
   */
  add(node) {
    if (!this.root) {
      this.root = {
        ...node
      }

      return
    }

    if (node.id < this.root.id) {
      // 小于的数据添加到左边
      if (!this.root.left) {
        this.root.left = {
          ...node,
          parent: this.root
        }
      } else {
        const root = this.root

        this.root = root.left
        this.add(node)
        this.root = root
      }
    } else {
      /**
       * 大于等于的数据添加到右边
       * 这里允许插入重复的值，否则需要报错
       */
      if (!this.root.right) {
        this.root.right = {
          ...node,
          parent: this.root
        }
      } else {
        const root = this.root

        this.root = root.right
        this.add(node)
        this.root = root
      }
    }
  }

  /**
   * 获取最小值的节点
   * 可能有多个最小值节点，但这里只获取一个
   */
  getMin() {
    if (!this.root) {
      return null
    }

    if (!this.root.left) {
      return this.root
    }

    const root = this.root

    this.root = root.left
    const min = this.getMin()
    this.root = root

    return min
  }

  // 删除数据，可能会删除多个节点
  delete(id) {
    const nodes = this.getNodes(id)

    /**
     * nodes中的节点顺序从上到下
     * 我们这里需要从下到上依次删除
     */
    for (let i = nodes.length - 1; i > -1; i--) {
      const node = nodes[i]

      // 如果没有子节点，直接删除父节点的对应指针
      if (!node.left && !node.right) {
        if (node.parent) {
          delete node.parent[node.parent.left === node ? 'left' : 'right']
        } else {
          /**
           * 如果没有父节点，证明该节点是根节点
           * 又因为该节点没有子节点，所以此时树中只有一个根节点
           * 直接删除根节点就行
           */
          this.root = null
        }

        continue
      }

      // 只有一个子节点，直接将父节点对应的指针指向该子节点
      if (!node.left || !node.right) {
        if (node.parent) {
          node.parent[node.parent.left === node ? 'left' : 'right'] = node.left || node.right
        } else {
          this.root = node.left || node.right
        }

        continue
      }

      /**
       * 有两个子节点，一种简单的处理方法是让父节点指向其中一棵子树，然后将另一棵子树的节点一个个重新插入。
       * 但这种方法代价太大，所以不适用
       * 另一种方法是用右子树中的最小值节点替换该节点
       * 为什么不用左子树中的最大值进行替换呢？
       * 因为如果左子树中的最大值节点有多个，那么用一个进行替换后，左子树中依然会存在相同值的节点
       * 这会导致左子树中具有与子树根节点的值相同的节点，这破坏了BST的性质
       */
      const root = this.root

      this.root = node.right
      const min = this.getMin()
      this.root = root

      // 先删除min
      if (min.right) {
        min.parent[min.parent.left === min ? 'left' : 'right'] = min.right
      } else {
        delete min.parent[min.parent.left === min ? 'left' : 'right']
      }

      // 用min替换node
      node.parent[node.parent.left === node ? 'left' : 'right'] = min
      min.left = node.left
      min.right = node.right
    }
  }

  /**
   * 查找id对应的节点，可能有多个
   * 复杂度为查找路径的深度，所以也要尽量让二叉树平衡
   * 这样查找时不管走的哪条路径，复杂度都为O(logn)
   */
  getNodes(id) {
    const nodes = []

    if (!this.root) {
      return nodes
    }

    if (id < this.root.id) {
      // 小于当前节点就要往左子树中查找
      if (this.root.left) {
        const root = this.root

        this.root = root.left
        nodes.push(...this.getNodes(id))
        this.root = root
      }
    } else {
      if (id === this.root.id) {
        nodes.push(this.root)
      }

      /**
       * 不止大于，等于的情况也要查找右子树
       * 因为右子树中可能还有相同的值
       */
      if (this.root.right) {
        const root = this.root

        this.root = root.right
        nodes.push(...this.getNodes(id))
        this.root = root
      }
    }

    return nodes
  }

  get(id) {
    return this.getNodes(id).map(node => node.value)
  }
}

const list = new Array(10).fill().map(() => ({
  id: Math.floor(Math.random() * 100),
  value: Math.floor(Math.random() * 100)
}))
const bst = new BST()

for (const item of list) {
  bst.add(item)
}

console.log('list', list)
console.log('bst.root', bst.root)
console.log(list[2].id, bst.get(list[2].id))
console.log(list[5].id, bst.get(list[5].id))
console.log(list[7].id, bst.get(list[7].id))
bst.delete(list[5].id)
console.log(list[2].id, bst.get(list[2].id))
console.log(list[5].id, bst.get(list[5].id))
console.log(list[7].id, bst.get(list[7].id))
