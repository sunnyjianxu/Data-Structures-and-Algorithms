/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2022-03-30 17:36:08
 */
const Stack = require("./Stack");

var s = new Stack();
s.push("David");
s.push("Raymond");
s.push("Bryan");
console.log("length: " + s.getLength());
console.log(s.peek());
var popped = s.pop();
console.log("The popped element is: " + popped);
console.log(s.peek());
s.push("Cynthia");
console.log(s.peek());
s.clear();
console.log("length: " + s.getLength());
console.log(s.peek());
s.push("Clayton");
console.log(s.peek());

// 进制转换
function mulBase(num, base) {
  const stack = [];
  while (num > 0) {
    stack.push(num % base);
    num = Math.floor(num / base);
  }
  let res = "";
  while (stack.length > 0) {
    res += stack.pop();
  }
  return res;
}

const res = mulBase(10, 2);
console.log(res);

// 回文判断
function isPalindrome(str) {
  const stack = [];
  for (let i of str) {
    stack.push(i);
  }
  let s = "";
  while (stack.length > 0) {
    s += stack.pop();
  }
  return str === s;
}

console.log(isPalindrome("racecar"));

// 数字阶乘（递归实现）
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

// 数字阶乘（栈实现）
function factorialStack(num) {
  const stack = [];
  let n = num;
  while (n > 0) {
    stack.push(n--);
  }
  let res = 1;
  while (stack.length > 0) {
    res *= stack.pop();
  }
  return res;
}

factorialStack(5);
console.log(factorial(5));

// 练习
// 1. 栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算术表达式作为参数，返回括号缺失的位置。
// 算术表达式: (2.3 + 23) / 12 + (3.14159×0.24。

function validExp(exp) {
  const stack = [];
  const expArray = exp.split("");
  for (let i = 0; i < expArray.length; i++) {
    const item = expArray[i];
    if (["{", "[", "("].includes(item)) {
      stack.push(item);
    } else {
      const topEle = stack[stack.length - 1];
      if (item === "}") {
        if (topEle === "{") {
          stack.pop();
        } else {
          return i + 1;
        }
      }
      if (item === "]") {
        if (topEle === "[") {
          stack.pop();
        } else {
          return i + 1;
        }
      }
      if (item === ")") {
        if (topEle === "(") {
          stack.pop();
        } else {
          return i + 1;
        }
      }
    }
  }
  if (stack.length) {
    return exp.length + 1;
  }
  return -1;
}
console.log(validExp("function{consta=[]b=(1+2}2312321312"));

/* 2. 
一个算术表达式的后缀表达式形式如下： 
op1 op2 operator 
使用两个栈，一个用来存储操作数，
另外一个用来存储操作符，设计并实现一个 JavaScript 函数，
该函数可以将<中缀表达式>转换为<后缀表达式>，然后利用栈对该表达式求值。 
*/
function comparePriority(a, b) {
  // 比较栈顶操作符 a 和即将入栈的操作符 b 的优先级
  // a优先于b，返回 1，表示栈顶元素优先级较高，操作符需要出栈
  if (!a) {
    // a为空时，b入栈
    return 0;
  }

  if ((a === "(" && b !== ")") || b === "(") {
    // a为'('，或者b为'('时，直接入栈
    return 0;
  }
  if ((b === "*" || b === "/") && (a === "+" || a === "-")) {
    // b优先级大于a时，直接入栈
    return 0;
  }
  return 1;
}

function isOperator(tmp) {
  return ["+", "-", "*", "/", "(", ")"].indexOf(tmp) > -1;
}

function infixToPostfix(exp) {
  var operatorStack = new Stack();
  var postfixExp = [];

  exp.split("").forEach(function (char) {
    if (isOperator(char)) {
      // 比较优先级
      while (comparePriority(operatorStack.peek(), char)) {
        var tmp = operatorStack.pop();

        if (tmp !== "(" && tmp !== ")") {
          postfixExp.push(tmp);
        }

        if (tmp === "(" && char === ")") {
          // 匹配到左括号的时候，结束循环。
          break;
        }
      }
      if (char !== ")") {
        operatorStack.push(char);
      }
    } else {
      postfixExp.push(char);
    }
  });
  while (operatorStack.length()) {
    postfixExp.push(operatorStack.pop());
  }
  return postfixExp.join("");
}

function computePostfix(exp) {
  var numStack = new Stack();
  exp.split("").forEach(function (char) {
    if (char.trim()) {
      if (!isOperator(char)) {
        numStack.push(char);
      } else {
        var tmp = numStack.pop();
        numStack.push(eval(numStack.pop() + char + tmp));
      }
    }
  });
  return numStack.pop();
}

var postfixExp = infixToPostfix("(8-2)/(3-1)*(9-6)");
var postfixExpValue = computePostfix(postfixExp);

console.log(postfixExp); // 82-31-/96-*
console.log(postfixExpValue); // 9

/* 
3. 现实生活中栈的一个例子是佩兹糖果盒。
想象一下你有一盒佩兹糖果，里面塞满了红色、黄色和白色的糖果，但是你不喜欢黄色的糖果。
使用栈（有可能用到多个栈）写一段程序，在不改变盒内其他糖果叠放顺序的基础上，将黄色糖果移出。
 */


//糖的数量
var num=20;
//创建糖盒
var box = [];
var box1 = [];
//糖的数组
var sugars=['红','黄','白'];
//根据数量创建糖，并且放到糖盒
for(var i=0;i<num;i++){
    var random = Math.floor(Math.random()*3);
    box.push(sugars[random]);
    box1.push(sugars[random]);
}

//糖的顺序
box.forEach(function (sugar) {
    console.log(sugar);
})

//糖的缓存
var buffer = [];

box.forEach(function (sugar) {
    if(sugar!='黄'){
        buffer.push(sugar);
    }
})

//清空栈内的数据
box = [];

//遍历未筛选糖
buffer.forEach(function (sugar) {
    box.push(sugar);
})

console.log("*************************************");

//遍历筛选后的糖
// box.forEach(function (sugar) {
//     console.log(sugar);
// })
console.log(box.join(','))
console.log(box1.filter(o=>o !== "黄").join(','))