/**
 * 用正则实现的词法分析，
 * 省去了将正则转为NFA->DFA->匹配DFA的步骤
 */

const keywords = [
  "void",
  "null",
  "undefined",
  "if",
  "else",
  "for",
  "while",
  "break",
  "continue",
  "return",
];

const tokenTypes = [
  {
    type: "identifier",
    regex: /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/,
  },
  {
    type: "integer",
    regex: /\b-?(?:0|[1-9]\d*)\b/,
  },
  {
    type: "float",
    regex: /\b-?(?:0|[1-9]\d*)\.\d+\b/,
  },
  {
    type: "singleQuotedString",
    regex: /'(?:[^'\\]|\\.)*'/,
  },
  {
    type: "doubleQuotedString",
    regex: /"(?:[^"\\]|\\.)*"/,
  },
  {
    type: "templateString",
    regex: /`(?:[^`\\]|\\.)*`/,
  },
  {
    type: "boolean",
    regex: /\b(?:true|false)\b/,
  },
  {
    type: "operator",
    regex: /[+\-*=<>]|\/(?!\/)|<=|>=|!=|!==|==|===|&&|\|\||!/,
  },
  {
    type: "separator",
    regex: /[,.;:(){}\[\]]/,
  },
  {
    type: "whitespace",
    regex: /\s+/,
    ignore: true,
  },
  {
    type: "singleLineComment",
    regex: /\/\/.*/,
  },
  {
    type: "multiLineComment",
    regex: /\/\*[^]*?\*\//,
  },
  /**
   * 无法识别的token，
   * 主要是防止combinedRegex match时，如果第一个字符不匹配仍然会继续扫描后面的字符，造成性能底下。
   * 该正则一定要置于最后
   */
  {
    type: "invalid",
    regex: /[^]/,
  },
];

function codeFn() {
  const integer = 123 + 4;
  const float = 123.123 - 1;
  const string = "123";
  const boolean = true;
  const operator = "+-*/=";
  const separator = ",.;:";
  const blank = " ";
  const comment = "//";

  return {
    integer,
    float,
    string,
    boolean,
    undefined,
    operator,
    separator,
    blank,
    comment,
  };
}

function parse(input) {
  const combinedRegex = new RegExp(
    tokenTypes.map(({ regex }) => `(${regex.source})`).join("|"),
    "g"
  );
  const tokens = [];
  let match;
  let lastIndex = 0;

  console.log("regex", combinedRegex.source);

  while ((match = combinedRegex.exec(input)) !== null) {
    // 匹配到invalid token了
    if (match[tokenTypes.length] !== undefined) {
      break;
    }

    lastIndex = combinedRegex.lastIndex;

    // 根据匹配的组来确定 token 类型
    for (let i = 1; i < match.length; i++) {
      if (match[i] !== undefined) {
        const { type, ignore } = tokenTypes[i - 1];

        // 忽略空白符等无需记录的 token
        if (!ignore) {
          tokens.push({ type, value: match[0], index: match.index });
        }

        break;
      }
    }

    // let match = null;

    // for (const { type, regex, ignore } of tokenTypes) {
    //   regex.lastIndex = index; // 确保从当前位置开始匹配
    //   // console.log("regex", regex.lastIndex);
    //   match = regex.exec(input);

    //   // match && console.log("match", index, type, match);
    //   if (match && match.index === index) {
    //     if (!ignore) {
    //       // 如果不是要忽略的词法单元（如空白符）
    //       console.log("token", index, type, match[0]);
    //       tokens.push({ type, value: match[0], index });
    //     }
    //     index += match[0].length; // 前进到下一个位置
    //     break;
    //   }
    // }

    // if (combinedRegex.lastIndex === input.length) {
    //   return tokens;
    // }
  }

  if (lastIndex < input.length) {
    throw new Error(
      `Unexpected token at index ${lastIndex}: ${input.slice(lastIndex)}`
    );
  }

  return tokens;
}

// const code = parse.toString();
const code = `
    // 根据匹配的组来确定 token 类型
    for (let i = 1; i < match.length; i++) {
      if (match[i] !== undefined) {
        const { type, ignore } = tokenTypes[i - 1];

        // 忽略空白符等无需记录的 token
        if (!ignore) {
          tokens.push({ type, value: match[0], index: match.index });
        }

        abc = 444;

        break;
      }
    }
`;
console.log(code);

const tokens = parse(code);
console.log(tokens);
