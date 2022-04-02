/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2022-04-02 11:30:09
 */

class Stack {
  constructor() {
    this.dataStore = [];
    // this.top = 0;
  }
  // 入栈
  push(element) {
    this.dataStore[this.top++] = element;
  }
  // 出栈
  pop() {
    if(this.top >= 0) {
      return this.dataStore[--this.top];
    }
    return null;
  }
  // 返回栈顶元素
  peek() {
    return this.dataStore[this.top - 1];
  }
  clear() {
    this.top = 0;
  }
  getLength() {
    return this.top;
  }
  getStack() {
    return this.dataStore;
  }
}

module.exports = Stack;
