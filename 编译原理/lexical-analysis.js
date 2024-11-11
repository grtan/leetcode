/**
 * 关键字: if else for while break continue return
 * 标识符: [a-zA-Z_][a-zA-Z0-9_]*
 * 数字常量: [0-9]+
 * 字符串常量: ".*"
 * 布尔值常量: true false
 * 空值常量: null undefined
 * 操作符: + - * / = < > <= >= !== === && || !
 * 分隔符或标点符号: , . ; : ( ) [ ] { }
 * 注释: //
 * 空白: \s \t \n \r \v \f
 */

/**
 * 生成识别标识符的NFA的函数
 */
function getIdentifierNFA() {
  const states = {
    0: {
      start: true,
      transfers: {
        "a-z": "1",
        "A-Z": "1",
        _: "1",
      },
    },
    1: {
      end: true,
      transfers: {
        "a-z": "1",
        "A-Z": "1",
        "0-9": "1",
        _: "1",
      },
    },
  };

  return states;
}

/**
 * 生成识别数字常量的NFA的函数
 * 包括正负符号、整数、小数
 */
function getNumberNFA() {
  const states = {
    0: {
      start: true,
      transfers: {
        "+": "1",
        "-": "1",
        "": "1",
      },
    },
    1: {
      transfers: {
        0: "3",
        "1-9": "2",
      },
    },
    2: {
      end: true,
      transfers: {
        "0-9": "2",
        "": "3",
      },
    },
    3: {
      transfers: {
        ".": "4",
      },
    },
    4: {
      transfers: {
        "0-9": "4",
      },
    },
  };

  return states;
}

function getBooleanNFA() {
  const states = {
    0: {
      start: true,
      transfers: {
        t: "1",
        f: "4",
      },
    },
    1: {
      transfers: {
        r: "1",
      },
    },
    2: {
      transfers: {
        u: "1",
      },
    },
    3: {
      end: true,
      transfers: {
        e: "1",
      },
    },
    4: {
      transfers: {
        a: "1",
      },
    },
    5: {
      transfers: {
        l: "1",
      },
    },
    6: {
      transfers: {
        s: "1",
      },
    },
    7: {
      end: true,
      transfers: {
        e: "1",
      },
    },
  };

  return states;
}

function getStringNFA() {
  const states = {
    0: {
      start: true,
      transfers: {
        "": "1",
      },
    },
    1: {
      end: true,
      transfers: {
        "": "1",
      },
    },
  };

  return states;
}

function getOperatorNFA() {
  const states = {
    0: {
      start: true,
      transfers: {
        "+": "1",
        "-": "1",
        "*": "1",
        "/": "1",
        "=": "1",
        "<": "1",
        ">": "1",
        "(": "1",
        ")": "1",
        "[": "1",
        "]": "1",
        "{": "1",
        "}": "1",
        ",": "1",
        ";": "1",
        ":": "1",
        ".": "1",
      },
    },
  };

  return states;
}
