const { genBinaryTree } = require('../utils')

// 递归模式
function traverse(tree) {
  tree.left && traverse(tree.left)
  console.log(tree.value)
  tree.right && traverse(tree.right)
}

// 迭代模式
function traverse2(tree) {
  const stack = [tree]
  // 已经处理过子节点的节点
  const handledChildrenNodes = []

  while (stack.length) {
    const node = stack[stack.length - 1]

    // 没有子节点
    if (!node.left && !node.right) {
      console.log(node.value)
      stack.pop()
      continue
    }

    // 之前已经处理过子节点，现在是打印
    if (node === handledChildrenNodes[handledChildrenNodes.length - 1]) {
      handledChildrenNodes.pop()
      console.log(node.value)
      stack.pop()
      continue
    }

    node.right && stack.splice(-1, 0, node.right)
    node.left && stack.push(node.left)
    handledChildrenNodes.push(node)
  }
}

// 另一种迭代模式
function traverse3(node) {
  const stack = []
  let current = node

  while (current || stack.length) {
    // 处理左节点
    while (current) {
      stack.push(current)
      current = current.left
    }

    current = stack.pop()
    console.log(current.value)
    // 转向右侧
    current = current.right
  }
}

const tree = genBinaryTree(3)

console.log(JSON.stringify(tree, null, '  '))
console.log('递归模式')
traverse(tree)
console.log('迭代模式')
traverse2(tree)
console.log('另一种迭代模式')
traverse3(tree)
