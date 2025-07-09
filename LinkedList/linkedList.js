/**
 * @fileoverview A complete implementation of a singly linked list data structure
 * @author Jadeed Jawahar
 * @version 1.0.0
 */

/**
 * Represents a node in the linked list
 * @class Node
 */
class Node {
  /**
   * Creates a new node with the given value
   * @param {*} value - The value to store in the node
   */
  constructor(value) {
    /** @type {*} The value stored in this node */
    this.value = value;
    /** @type {Node|null} Reference to the next node in the list */
    this.next = null;
  }
}

/**
 * A singly linked list implementation with head and tail tracking
 * @class LinkedList
 * @example
 * const list = new LinkedList();
 * list.append(1);
 * list.append(2);
 * console.log(list.toString()); // "(1) -> (2) -> null"
 */
class LinkedList {
  /**
   * Creates an empty linked list
   */
  constructor() {
    /** @private @type {Node|null} Reference to the first node */
    this._head = null;
    /** @private @type {Node|null} Reference to the last node */
    this._tail = null;
    /** @private @type {number} Number of elements in the list */
    this._size = 0;
  }

  /**
   * Adds a new element to the end of the list
   * Time complexity: O(1)
   * @param {*} value - The value to append
   * @example
   * list.append(5);
   * list.append("hello");
   */
  append(value) {
    const node = new Node(value);

    // If list is empty, new node becomes both head and tail
    if (!this._head && !this._tail) {
      this._head = this._tail = node;
    } else {
      // Link the current tail to the new node
      this._tail.next = node;
      // Update tail to point to the new node
      this._tail = node;
    }

    this._size++;
  }

  /**
   * Adds a new element to the beginning of the list
   * Time complexity: O(1)
   * @param {*} value - The value to prepend
   * @example
   * list.prepend(0);
   */
  prepend(value) {
    const node = new Node(value);

    // If list is empty, new node becomes both head and tail
    if (!this._head) {
      this._head = this._tail = node;
    } else {
      // Link new node to current head
      node.next = this._head;
      // Update head to point to new node
      this._head = node;
    }

    this._size++;
  }

  /**
   * Gets the number of elements in the list
   * Time complexity: O(1)
   * @returns {number} The size of the list
   * @example
   * console.log(list.size); // 3
   */
  get size() {
    return this._size;
  }

  /**
   * Gets the first node in the list
   * Time complexity: O(1)
   * @returns {Node|null} The head node or null if empty
   * @example
   * const firstNode = list.head;
   * console.log(firstNode?.value);
   */
  get head() {
    return this._head;
  }

  /**
   * Gets the last node in the list
   * Time complexity: O(1)
   * @returns {Node|null} The tail node or null if empty
   * @example
   * const lastNode = list.tail;
   * console.log(lastNode?.value);
   */
  get tail() {
    return this._tail;
  }

  /**
   * Gets the node at the specified index
   * Time complexity: O(n)
   * @param {number|string} index - The index to access (0-based)
   * @returns {Node} The node at the specified index
   * @throws {Error} If index is invalid or out of bounds
   * @example
   * const node = list.at(1);
   * console.log(node.value);
   */
  at(index) {
    // Convert to number and validate
    index = Number(index);
    if (isNaN(index) || index < 0) {
      throw new Error("Index must be >= 0");
    } else if (index >= this._size) {
      throw new Error("Index out of bound");
    }

    // Traverse to the desired index
    let idx = 0;
    let curr = this._head;
    while (curr !== null) {
      if (idx === index) return curr;
      curr = curr.next;
      idx++;
    }

    // This should never be reached due to bounds checking
    return null;
  }

  /**
   * Removes and returns the last element from the list
   * Time complexity: O(n) - must traverse to find second-to-last node
   * @returns {Node|null} The removed node or null if list is empty
   * @example
   * const lastNode = list.pop();
   * console.log(lastNode?.value);
   */
  pop() {
    // Handle empty list
    if (!this._head) return null;

    // Handle single element list
    if (this._head === this._tail) {
      const tail = this._tail;
      this._head = this._tail = null;
      this._size--;
      return tail;
    }

    // Find the second-to-last node
    let curr = this._head;
    while (curr !== null && curr.next !== this._tail) {
      curr = curr.next;
    }

    // Remove the last node
    const tail = this._tail;
    this._tail = curr;
    this._tail.next = null;
    this._size--;

    return tail;
  }

  /**
   * Checks if the list contains a specific value
   * Time complexity: O(n)
   * @param {*} value - The value to search for
   * @returns {boolean} True if value is found, false otherwise
   * @example
   * if (list.contains("hello")) {
   *   console.log("Found hello!");
   * }
   */
  contains(value) {
    let curr = this._head;
    while (curr !== null) {
      if (curr.value === value) return true;
      curr = curr.next;
    }
    return false;
  }

  /**
   * Finds the index of the first occurrence of a value
   * Time complexity: O(n)
   * @param {*} value - The value to search for
   * @returns {number} The index of the value, or -1 if not found
   * @example
   * const index = list.find("hello");
   * if (index !== -1) {
   *   console.log(`Found at index ${index}`);
   * }
   */
  find(value) {
    let idx = 0;
    let curr = this._head;
    while (curr !== null) {
      if (curr.value === value) return idx;
      curr = curr.next;
      idx++;
    }
    return -1; // Return -1 instead of null for consistency with Array.indexOf
  }

  /**
   * Inserts a new element at the specified index
   * Time complexity: O(n)
   * @param {*} value - The value to insert
   * @param {number|string} index - The index where to insert (0-based)
   * @throws {Error} If index is invalid or out of bounds
   * @example
   * list.insertAt("new value", 2);
   */
  insertAt(value, index) {
    // Convert to number and validate
    index = Number(index);
    if (isNaN(index) || index < 0) {
      throw new Error("Index must be >= 0");
    } else if (index > this._size) {
      throw new Error("Index out of bound");
    }

    // Handle insertion at beginning
    if (index === 0) {
      this.prepend(value);
      return;
    }

    // Handle insertion at end
    if (index === this._size) {
      this.append(value);
      return;
    }

    // Find the node before the insertion point
    let idx = 0;
    let curr = this._head;
    while (curr !== null && idx < index - 1) {
      curr = curr.next;
      idx++;
    }

    // Insert the new node
    const newNode = new Node(value);
    newNode.next = curr.next;
    curr.next = newNode;
    this._size++;
  }

  /**
   * Removes and returns the element at the specified index
   * Time complexity: O(n)
   * @param {number|string} index - The index of the element to remove
   * @returns {Node} The removed node
   * @throws {Error} If index is invalid or out of bounds
   * @example
   * const removed = list.removeAt(1);
   * console.log(removed.value);
   */
  removeAt(index) {
    // Convert to number and validate
    index = Number(index);
    if (isNaN(index) || index < 0) {
      throw new Error("Index must be >= 0");
    } else if (index >= this._size) {
      throw new Error("Index out of bound");
    }

    // Handle removal at beginning
    if (index === 0) {
      const removedNode = this._head;

      if (this._head === this._tail) {
        // Single element list
        this._head = this._tail = null;
      } else {
        // Multiple elements
        this._head = this._head.next;
      }

      this._size--;
      removedNode.next = null; // Clean up removed node
      return removedNode;
    }

    // Find the node before the one to remove
    let idx = 0;
    let curr = this._head;
    while (curr !== null && idx < index - 1) {
      curr = curr.next;
      idx++;
    }

    const nodeToRemove = curr.next;

    // Update tail if we're removing the last element
    if (nodeToRemove === this._tail) {
      this._tail = curr;
      curr.next = null;
    } else {
      curr.next = nodeToRemove.next;
    }

    this._size--;
    nodeToRemove.next = null; // Clean up removed node
    return nodeToRemove;
  }

  /**
   * Converts the list to a string representation
   * Time complexity: O(n)
   * @returns {string} String representation of the list
   * @example
   * console.log(list.toString()); // "(1) -> (2) -> (3) -> null"
   */
  toString() {
    const list = [];
    let curr = this._head;

    // Traverse and collect values
    while (curr !== null) {
      list.push(`(${curr.value})`);
      curr = curr.next;
    }

    // Add null to represent end of list
    list.push("null");
    return list.join(" -> ");
  }
}
// ========== USAGE EXAMPLES ==========

// Basic usage
const list = new LinkedList();
list.append(1);
list.append(2);
list.prepend(0);

// Access elements
console.log(list.at(1).value); // 1
console.log(list.contains(2)); // true

// Modify list
list.insertAt(3, 2);
console.log(list.toString());
const removed = list.removeAt(0);

// ========== EXPORTS ==========
// export { Node, LinkedList };
