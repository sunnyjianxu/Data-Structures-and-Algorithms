/*
 * @Description: feature name
 * @Author: xujian
 * @Date: 2022-03-30 17:05:54
 */

class List {
  constructor() {
    // 初始化一个空数组来保存列表元素
    this.dataStore = [];
    // 列表的元素个数
    this.listSize = 0;
    // 列表的当前位置
    this.pos = 0;
  }
  // 返回列表中元素的个数
  length() {
    return this.listSize;
  }
  // 返回列表的字符串形式
  toString() {
    return this.dataStore;
  }
  // 返回当前位置的元素
  getElement() {
    return this.dataStore[this.pos];
  }
  // 返回列表的当前位置
  currPos() {
    return this.pos;
  }
  contains(el) {
    for (var i = 0; i < this.dataStore.length; i++) {
      if (el === this.dataStore[i]) {
        return true;
      }
    }
    return false;
  }
  // 清空列表中的所有元素
  clear() {
    this.dataStore = [];
    this.listSize = 0;
    this.pos = 0;
  }
  // 在现有元素后插入新元素
  insert(el, afterEle) {
    const insertPos = this.find(afterEle);
    if (insertPos > -1) {
      this.dataStore.splice(insertPos + 1, 0, el);
      return true;
    }
    return false;
  }
  // 在列表的末尾添加新元素
  append(ele) {
    this.dataStore[this.listSize++] = ele;
  }
  // 从列表中删除元素
  remove(ele) {
    const idx = this.find(ele);
    if (idx > -1) {
      this.dataStore.splice(idx, 1);
      this.listSize--;
      return true;
    }
    return false;
  }
  // 将列表的当前位置设移动到第一个元素
  front() {
    this.pos = 0;
  }
  // 将列表的当前位置移动到最后一个元素
  end() {
    this.pos = this.dataStore.length - 1;
  }
  // 将当前位置后移一位
  prev() {
    if (this.pos > 0) {
      --this.pos;
    }
  }
  // 将当前位置前移一位
  next() {
    if (this.pos < this.dataStore.length) {
      ++this.pos;
    }
  }
  // 将当前位置移动到指定位置
  moveTo(pos) {
    this.pos = pos;
  }

  // 查找元素的索引
  find(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] == element) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = List;
