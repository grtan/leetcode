// 生成链表形式的完全满二叉树
function genBinaryTree(deep = 5) {
  const root = {
    value: '0-0'
  }
  // 上一层节点列表
  let lastLevelNodes = [root]

  for (let i = 1; i < deep; i++) {
    // 当前层节点列表
    const currentLevelNodes = []
    let index = 0

    for (const root of lastLevelNodes) {
      if (!root.left) {
        const left = {
          value: `${i}-${index++}`
        }

        root.left = left
        currentLevelNodes.push(left)
      }

      if (!root.right) {
        const right = {
          value: `${i}-${index++}`
        }

        root.right = right
        currentLevelNodes.push(right)
      }
    }

    lastLevelNodes = currentLevelNodes
  }

  return root
}

// 生成完全满二叉树的数组表示
function genBinaryTreeArray(deep = 5) {
  let total = 0
  const tree = []

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < Math.pow(2, i); j++) {
      tree.push(`${i}-${j}`)
    }
  }

  return tree
}

module.exports = {
  genBinaryTree
}
