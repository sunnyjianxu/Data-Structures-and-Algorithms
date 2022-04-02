# 栈
栈和列表类似的一种数据结构，它可用来解决计算机世界里的很多问题。栈是一种高 效的数据结构，因为数据只能在栈顶添加或删除，所以这样的操作很快，而且容易实现。 栈的使用遍布程序语言实现的方方面面，从表达式求值到处理函数调用。  

**栈被称为一种后入先出（LIFO，last-in-first-out）的数据结构。**

## 栈的主要方法和属性

| 方法/属性 |     描述     |
| :-------: | :----------: |
|  length   | 栈内元素个数 |
|    pop    | 弹出栈顶元素 |
|   push    |   添加元素   |
|   peek    | 预览栈顶元素 |
|   clear   | 清除所有元素 |

## 栈的实现
```js
class Stack() { 
  constructor(){
    this.dataStore = []; 
    this.top = 0; 
  }
  // 入栈
  push(){
    this.dataStore[this.top++] = element;
  }
  // 出栈
  pop(){
    return this.dataStore[--this.top];
  }
  // 返回栈顶元素
  peek(){
    return this.dataStore[this.top-1];
  }
  // 清除栈
  clear(){
    this.top = 0
  }
  // 栈长
  length(){
    return this.top
  }
 }
 ```

 ## 栈的常用场景

### 数值的进制转换
```js
function mulBase(num, base) {
  const stack = new Stack();
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
```
### 判断是否回文
```js
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
```
### 演示递归原理-数字阶乘
```js
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
```

## 练习
栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算术表达式作为参数，返回括号缺失的位置。  
   
算术表达式: (2.3 + 23) / 12 + (3.14159×0.24。

```js
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
console.log(validExp("(2.3 + 23) / 12 + (3.14159×0.24")); // 32
```

一个算术表达式的后缀表达式形式如下：   

> `op1 op2 operator`   -->  `op1 operator op2` 

> `(8-2)/(3-1)*(9-6)`  -->  `82-31-/96-*`

使用两个栈，一个用来存储操作数，  

另外一个用来存储操作符，设计并实现一个 JavaScript 函数，  

该函数可以将`中缀表达式`转换为`后缀表达式`，然后利用栈对该表达式求值。  

```js
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
```