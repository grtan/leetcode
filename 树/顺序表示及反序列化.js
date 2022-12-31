// 树结构
// const tree = {
//   value: 'A',
//   left: {
//     value: 'B',
//     right: {
//       value: 'D'
//     }
//   },
//   right: {
//     value: 'C',
//     left: {
//       value: 'E',
//       left: {
//         value: 'G'
//       }
//     },
//     right: {
//       value: 'F',
//       left: {
//         value: 'H'
//       },
//       right: {
//         value: 'I'
//       }
//     }
//   }
// }

/**
 * 树的顺序表示法空间效率高，时间效率并不高。
 * 比如查找根节点的右子节点时，必须先沿节点表查找完整的左子树，然后才能查找到根节点的右子节点
 * 在js中最常见的是将树用json来序列化表示
 * 除此之外，还可以将树以前序遍历的方式来序列化表示，以便传输、存储，这种方式空间效率更高
 * 这里先只考虑二叉树的场景，规则：
 * 1. 所有的非空节点均视为有两个子节点（可能为空）的分支节点
 * 2. 只有空节点才被当作叶节点，用字符/表示
 * 那如上树结构可序列化为：AB/D//CEG///FH//I//
 * 反序列化如下
 */
function deserialization(str = '') {
  const nodes = str.split('')

  if (!nodes.length) {
    return null
  }

  const root = {
    value: nodes[0]
  }
  const stack = [root]

  for (let i = 1; i < nodes.length; i++) {
    let parent = stack[stack.length - 1]

    // 弹出已经设置好了左右子节点的分支节点
    while (parent.hasOwnProperty('left') && parent.hasOwnProperty('right')) {
      stack.pop()
      parent = stack[stack.length - 1]
    }

    const node = {
      value: nodes[i]
    }

    // 将子节点挂载到父节点上，优先检查左子节点
    if (!parent.hasOwnProperty('left')) {
      parent.left = node.value === '/' ? undefined : node
    } else {
      parent.right = node.value === '/' ? undefined : node
    }

    // 将分支节点添加到栈头
    if (node.value !== '/') {
      stack.push(node)
    }
  }

  // 去掉空子节点
  const list = [root]

  while (list.length) {
    const node = list.shift()

    if (node.left === undefined) {
      delete node.left
    } else {
      list.push(node.left)
    }

    if (node.right === undefined) {
      delete node.right
    } else {
      list.push(node.right)
    }
  }

  return root
}

/**
 * 任何顺序表示法都要求到达叶节点的时候能识别出来，并且仍需假设每个分支节点有两个子节点，即树是满的
 * 这里有另一种表示规则：
 * 1. 分支节点加标记'而叶节点不加任何标记
 * 2. 分支节点的空子节点以/表示，而叶节点的空子节点不加表示
 * 那如上树结构可序列化为：A'B'/DC'E'G/F'HI
 * 反序列化如下
 */
function deserialization2(str = '') {
  const nodes = str.match(/.'?/g)

  if (!nodes.length) {
    return null
  }

  const root = {
    // value需要去掉'
    value: nodes[0][0]
  }
  const stack = [root]

  for (let i = 1; i < nodes.length; i++) {
    let parent = stack[stack.length - 1]

    // 弹出已经设置好了左右子节点的分支节点
    while (parent.hasOwnProperty('left') && parent.hasOwnProperty('right')) {
      stack.pop()
      parent = stack[stack.length - 1]
    }

    const node = {
      value: nodes[i][0]
    }

    // 将子节点挂载到父节点上，优先检查左子节点
    if (!parent.hasOwnProperty('left')) {
      parent.left = node.value === '/' ? undefined : node
    } else {
      parent.right = node.value === '/' ? undefined : node
    }

    // 将分支节点添加到栈头
    if (nodes[i].endsWith("'")) {
      stack.push(node)
    }
  }

  // 去掉空子节点
  const list = [root]

  while (list.length) {
    const node = list.shift()

    if (node.left === undefined) {
      delete node.left
    } else {
      list.push(node.left)
    }

    if (node.right === undefined) {
      delete node.right
    } else {
      list.push(node.right)
    }
  }

  return root
}

/**
 * 上述两种方法都只适用二叉树的。
 * 如果顺序表示法需要满足任意树，则不仅要能识别一个节点是分支节点还是叶子节点，还必须给出有多少个子节点的信息。
 * 下面的规则适用任意树：
 * 1. 所有叶节点后面跟着一个)，因为它们没有子节点
 * 2. 如果一个叶节点是其父节点的最后一个子节点，则其后有两个或更多连续的)
 * 那如上树结构可序列化为：ABD))CEG))FH)I))))
 * I为啥有4个)，是因为I既是叶节点，也是F的最后一个子节点，还是C、A的最右子树的最后节点
 * 反序列化如下
 */
function deserialization3(str = '') {
  const nodes = str.split('')

  if (!nodes.length) {
    return null
  }

  const root = {
    value: nodes[0]
  }
  const stack = [root]

  for (let i = 1; i < nodes.length; i++) {
    if (nodes[i] === ')') {
      stack.pop()
      continue
    }

    let parent = stack[stack.length - 1]
    const node = {
      value: nodes[i]
    }

    parent.children = parent.children ?? []
    parent.children.push(node)
    stack.push(node)
  }

  return root
}

function print(tree) {
  console.log(
    JSON.stringify(
      tree,
      (key, value) => {
        if (value === undefined) {
          return 'undefined'
        }

        return value
      },
      '  '
    )
  )
}

print(deserialization('AB/D//CEG///FH//I//'))
print(deserialization2("A'B'/DC'E'G/F'HI"))
print(deserialization3('ABD))CEG))FH)I))))'))
