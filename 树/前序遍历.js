const { genBinaryTree } = require('../utils')

// 递归模式
function traverse(tree) {
  console.log(tree.value)
  tree.left && traverse(tree.left)
  tree.right && traverse(tree.right)
}

// 迭代模式
function traverse2(tree) {
  const stack = [tree]

  while (stack.length) {
    const node = stack.pop()

    console.log(node.value)
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
  }
}

// 另一种迭代模式
function traverse3(node) {
  const stack = []
  let current = node

  while (current || stack.length) {
    // 处理左节点
    while (current) {
      console.log(current.value)
      stack.push(current)
      current = current.left
    }

    current = stack.pop()
    // 转向右侧
    current = current.right
  }
}

/**
 * 迭代模式，使用模拟函数调用栈的方法（还可以使用尾递归的方式）
 * 真实函数调用栈会保存函数的参数、内部变量、返回后继续执行地址
 */
function traverse4(tree) {}

const tree = genBinaryTree(3)

console.log(JSON.stringify(tree, null, '  '))
console.log('递归模式')
traverse(tree)
console.log('迭代模式')
traverse2(tree)
console.log('另一种迭代模式')
traverse3(tree)
