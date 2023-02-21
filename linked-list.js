/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** getAtIdx(idx): retrieve node at given index. */

  getAtIdx(idx) {
    if (idx > this.length || idx < 0) {
      throw new Error('Invalid index.');
    }
    let current = this.head;
    let count = 0;

    while (current !== null && count !== idx) {
      count += 1;
      current = current.next;
    }

    return current;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    // Add node if head = null
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    //Add a new node with value val to the head. Returns undefined.
    let newNode = new Node(val);
    // Add node if head = null
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    // Remove & return tail value. Throws error if list is empty.
    if (this.length === 0) throw Error('No items in list');

    let current = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return current.val;
    }
    while (current) {
      if (current.next.next === null) {
        let lastEl = current.next;
        current.next = null;
        this.tail = current;
        this.length--;
        return lastEl.val;
      }
      current = current.next;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) throw Error('List is empty');
    let firstItem = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return firstItem.val;
    } else {
      this.head = this.head.next;
      this.length--;
      return firstItem.val;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    return this.getAtIdx(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    this.getAtIdx(idx).val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === this.length) {
      this.push(val);
    } else {
      let newItem = new Node(val);
      let prevItem = this.getAtIdx(idx - 1);
      let nextItem = this.getAtIdx(idx);
      prevItem.next = newItem;
      newItem.next = nextItem;
      this.length++;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.length === 1) {
      this.shift();
    } else {
      let prevItem = this.getAtIdx(idx - 1);
      let item = this.getAtIdx(idx);
      prevItem.next = item.next;
      this.length--;
      return item.val;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    let current = this.head;
    let total = 0;
    while (current) {
      total += current.val;
      current = current.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
