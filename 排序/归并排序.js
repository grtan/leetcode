/**
 * 归并排序基于分治法
 * 将数组等分为两个子序列，分别对两个子序列进行排序，然后合并成一个序列
 * 这样递归处理，最底层的子序列只有一个元素
 * https://visualgo.net/zh/sorting
 * https://www.runoob.com/w3cnote/ten-sorting-algorithm.html
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
  },
  left = 0,
  right = list.length - 1
) {
  // list长度<=1
  if (left >= right) {
    return list
  }

  const middle = Math.floor((left + right) / 2)

  /**
   * 将list透传下去，直接在原数组上对两个子序列排序
   * 否则拷贝数组生成子序列时需要消耗额外的时间、空间
   */
  // 代码块0
  sort(list, compare, left, middle)
  // 代码块1
  sort(list, compare, middle + 1, right)
  // 代码块2

  const temp = []

  /**
   * 将排好序的子序列拷贝到临时数组中
   * right子序列会反序添加，以便后续对比时不用判断子序列遍历完的情况
   */
  for (let i = left; i <= middle; i++) {
    temp.push(list[i])
  }
  for (let i = right; i > middle; i--) {
    temp.push(list[i])
  }

  /**
   * 将left、right子序列合并成一个正确排序的序列
   * 从两端往中间收缩
   */
  for (let i = 0, j = temp.length - 1, k = left; k <= right; k++) {
    if (compare(temp[i], temp[j]) <= 0) {
      list[k] = temp[i++]
    } else {
      list[k] = temp[j--]
    }
  }
}

/**
 * 递归本质上来说，其实就是【我用我自己】，把一个问题转换为小规模的同样的问题。
 * 迭代的话，就是在原来的基础上，算出来后续的东西，并没有【自己用自己】的那一步。
 * 可能是一个循环下来，前面的结果在后面跟着用。其实这么看下来，迭代有一点动态规划的感觉。
 * 也就是说，我们把小规模的问题先算出来了，记录下来，再算大规模的。
 * 而递归是我还没算出来小规模的结果，先来假设小规模的算出来了，直接把这个结果的计算过程写在了函数体中。
 * 理论上所有的递归都可以转换成迭代
 */

/**
 * 非递归版本
 * 迭代版本，采用模拟运行时栈的方法（另一种办法是尾递归）
 * 真实函数调用栈会保存函数的参数、内部变量、返回值、返回后继续执行地址
 * https://zhuanlan.zhihu.com/p/93869185
 * https://6cdh.github.io/posts/recursion-to-loop/
 */
function sort2(
  list,
  compare = (a, b) => {
    return a - b
  }
) {
  // 根函数帧
  const root = {
    // 当前函数的内部变量、以及被传入的参数
    data: {
      list,
      compare,
      left: 0,
      right: list.length - 1
    },
    /**
     * 函数体被递归调用的函数切分成几个块
     * currentExecutableCodeBlock表示当前函数接下来要执行哪块代码
     * 因为所有的函数都是从头开始执行的，所以默认值为0
     * 可以用来记录被调用函数返回后，当前函数继续执行的代码块
     */
    currentExecutableCodeBlock: 0
  }
  // 递归调用产生的函数帧栈
  const stack = [root]
  // 最新调用函数的返回值，目前没有用到
  let lastReturn

  while (stack.length) {
    const current = stack[stack.length - 1]
    const {
      data: { list, compare, left, right },
      currentExecutableCodeBlock
    } = current
    const middle = Math.floor((left + right) / 2)

    switch (currentExecutableCodeBlock) {
      // 代码块0
      case 0:
        if (left >= right) {
          /**
           * list长度<=1，
           * 当前函数已执行完成，弹出当前帧
           */
          stack.pop()
          // 函数返回值
          lastReturn = undefined
        } else {
          // 处理左子序列，下一个函数帧入栈
          stack.push({
            data: {
              list,
              compare,
              left,
              right: middle
            },
            currentExecutableCodeBlock: 0
          })
          current.currentExecutableCodeBlock++
        }
        break
      /**
       * 代码块1
       * 处理右子序列，下一个函数帧入栈
       */
      case 1: {
        stack.push({
          data: {
            list,
            compare,
            left: middle + 1,
            right
          },
          currentExecutableCodeBlock: 0
        })
        current.currentExecutableCodeBlock++
        break
      }
      /**
       * 代码块2
       * 将排序后的左右子序列合并
       */
      case 2: {
        const temp = []

        /**
         * 将排好序的子序列拷贝到临时数组中
         * right子序列会反序添加，以便后续对比时不用判断子序列遍历完的情况
         */
        for (let i = left; i <= middle; i++) {
          temp.push(list[i])
        }
        for (let i = right; i > middle; i--) {
          temp.push(list[i])
        }

        /**
         * 将left、right子序列合并成一个正确排序的序列
         * 从两端往中间收缩
         */
        for (let i = 0, j = temp.length - 1, k = left; k <= right; k++) {
          if (compare(temp[i], temp[j]) <= 0) {
            list[k] = temp[i++]
          } else {
            list[k] = temp[j--]
          }
        }

        // 当前函数已执行完成，弹出当前帧
        stack.pop()
        // 函数返回值
        lastReturn = undefined

        break
      }
    }
  }
}

/**
 * 另一种迭代方法
 * 先构造递归调用的树形结构，然后用后序遍历执行函数
 * 个人感觉这种方法跟栈实现DFS、队列实现BFS的思想都一样
 * 因为本质上都是要先人为找到办法用迭代实现递归的调用顺序，这个才是难点
 */
function sort3(
  list,
  compare = (a, b) => {
    return a - b
  }
) {
  const root = {
    // 参数
    args: {
      left: 0,
      right: list.length - 1
    }
  }
  // 上一层级函数调用节点列表
  let lastLevelNodes = [root]

  // 生成递归调用的树结构
  while (lastLevelNodes.length) {
    // 当前层级调用节点
    const currentLevelNodes = []

    for (const node of lastLevelNodes) {
      // 子序列长度已经为1
      if (node.args.left >= node.args.right) {
        continue
      }

      // 等分为两个子序列
      const middle = Math.floor((node.args.left + node.args.right) / 2)
      // 左子节点
      const left = {
        args: {
          ...node.args,
          right: middle
        }
      }
      // 右子节点
      const right = {
        args: {
          ...node.args,
          left: middle + 1
        }
      }

      Object.assign(node, {
        left,
        right
      })
      currentLevelNodes.push(left, right)
    }

    lastLevelNodes = currentLevelNodes
  }

  /**
   * 递归执行的逻辑本质上与树的后序遍历一样
   * 所以我们这里后序遍历节点
   */
  const stack = [root]
  // 已经处理过子节点的节点
  const handledChildrenNodes = []
  // 排好序的函数执行列表
  const executeList = []

  while (stack.length) {
    const node = stack[stack.length - 1]

    // 没有子节点
    if (!node.left && !node.right) {
      stack.pop()
      executeList.push(node)
      continue
    }

    // 之前已经处理过子节点，现在是打印
    if (node === handledChildrenNodes[handledChildrenNodes.length - 1]) {
      handledChildrenNodes.pop()
      stack.pop()
      executeList.push(node)
      continue
    }

    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
    handledChildrenNodes.push(node)
  }

  /**
   * 按序执行函数
   */

  // 每个节点函数调用返回值的列表
  const results = []
  while (executeList.length) {
    const {
      args: { left, right }
    } = executeList.shift()

    // 长度为1的子序列，啥也不用做
    if (left >= right) {
      // 保存函数调用结果
      results.push(undefined)
      continue
    }

    const rightChildResult = results.pop()
    const leftChildResult = results.pop()
    const middle = Math.floor((left + right) / 2)
    const temp = []

    /**
     * 将排好序的子序列拷贝到临时数组中
     * right子序列会反序添加，以便后续对比时不用判断子序列遍历完的情况
     */
    for (let i = left; i <= middle; i++) {
      temp.push(list[i])
    }
    for (let i = right; i > middle; i--) {
      temp.push(list[i])
    }

    /**
     * 将left、right子序列合并成一个正确排序的序列
     * 从两端往中间收缩
     */
    for (let i = 0, j = temp.length - 1, k = left; k <= right; k++) {
      if (compare(temp[i], temp[j]) <= 0) {
        list[k] = temp[i++]
      } else {
        list[k] = temp[j--]
      }
    }

    // 保存函数调用结果
    results.push(undefined)
  }
}

const list = new Array(20).fill(0).map(() => Math.round(Math.random() * 1000))

console.log(list)

sort(list)
console.log(list)

sort2(list)
console.log(list)

sort3(list)
console.log(list)

sort(list, (a, b) => b - a)
console.log(list)

sort2(list, (a, b) => b - a)
console.log(list)

sort3(list, (a, b) => b - a)
console.log(list)
