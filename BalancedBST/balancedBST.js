/**
 * Implement self-balancing BST with comprehensive operations
 * 
 * Features:
 * - Add automatic rebalancing after insert/delete operations
 * - Implement all tree traversal methods (inorder, preorder, postorder, level-order)
 * - Add tree height calculation and balance checking
 * - Includes robust error handling and input validation
 * 
 */

/**
 * Represents a node in the binary search tree
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * Self-balancing Binary Search Tree implementation
 * Automatically rebalances after insertions and deletions to maintain optimal performance
 */
class Tree {
  /**
   * Creates a balanced BST from an array of values
   * @param {Array} arr - Array of values to build the tree from
   * @throws {Error} If input is not an array or is empty
   */
  constructor(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("Input must be an array");
    }
    if (arr.length === 0) {
      throw new Error(
        "Empty array! At least one element is required for initialization."
      );
    }
    this._root = this._buildTree(arr);
  }

  /**
   * Builds a balanced BST from an array by sorting and removing duplicates
   * @param {Array} arr - Input array of values
   * @returns {Node} Root node of the constructed tree
   */
  _buildTree(arr) {
    // Sort array in ascending order
    let sortedArray = arr.sort((a, b) => a - b);
    // Remove duplicate values to ensure BST property
    arr = this._removeDuplicates(sortedArray);

    return this._buildBST(arr, 0, arr.length - 1);
  }

  /**
   * Removes duplicate values from a sorted array
   * @param {Array} nums - Sorted array of numbers
   * @returns {Array} Array with duplicates removed
   */
  _removeDuplicates(nums) {
    return nums.filter((num, idx) => idx === 0 || num !== nums[idx - 1]);
  }

  /**
   * Recursively builds a balanced BST from a sorted array
   * @param {Array} arr - Sorted array of unique values
   * @param {number} start - Start index of current subarray
   * @param {number} end - End index of current subarray
   * @returns {Node|null} Root node of the subtree
   */
  _buildBST(arr, start, end) {
    // Base case: invalid range
    if (start > end) return null;

    // Find middle element to maintain balance
    const mid = Math.floor(start + (end - start) / 2);
    const node = new Node(arr[mid]);

    // Recursively build left and right subtrees
    node.left = this._buildBST(arr, start, mid - 1);
    node.right = this._buildBST(arr, mid + 1, end);

    return node;
  }

  /**
   * Pretty prints the tree structure to console
   * @param {Node} node - Current node being printed
   * @param {string} prefix - Prefix string for formatting
   * @param {boolean} isLeft - Whether current node is a left child
   */
  _prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    // Print right subtree first (top-down visual)
    if (node.right !== null) {
      this._prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    // Print current node with appropriate connector
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    // Print left subtree
    if (node.left !== null) {
      this._prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  /**
   * Inserts a value into the tree and rebalances if necessary
   * @param {*} value - Value to insert
   */
  insert(value) {
    this._root = this._insertItem(this._root, value);

    // Automatically rebalance if tree becomes unbalanced
    if (!this.isBalanced()) {
      this._rebalance();
    }
  }

  /**
   * Recursively inserts a value into the BST
   * @param {Node|null} node - Current node
   * @param {*} value - Value to insert
   * @returns {Node} Updated node
   */
  _insertItem(node, value) {
    // Base case: create new node
    if (node === null) {
      return new Node(value);
    }

    // Duplicate values are ignored
    if (value === node.value) {
      return node;
    } else if (value < node.value) {
      node.left = this._insertItem(node.left, value);
    } else {
      node.right = this._insertItem(node.right, value);
    }

    return node;
  }

  /**
   * Deletes a value from the tree and rebalances if necessary
   * @param {*} value - Value to delete
   */
  deleteItem(value) {
    this._root = this._deleteItem(this._root, value);

    // Automatically rebalance if tree becomes unbalanced
    if (!this.isBalanced()) {
      this._rebalance();
    }
  }

  /**
   * Recursively deletes a value from the BST
   * @param {Node|null} node - Current node
   * @param {*} value - Value to delete
   * @returns {Node|null} Updated node
   */
  _deleteItem(node, value) {
    if (node === null) return node;

    if (value === node.value) {
      // Case 1: Node has no left child (0 or 1 child)
      if (node.left === null) {
        return node.right;
      }
      // Case 2: Node has no right child (1 child)
      if (node.right === null) {
        return node.left;
      }
      // Case 3: Node has both children
      // Replace with inorder successor (smallest value in right subtree)
      const successor = this._getSuccessor(node);
      node.value = successor.value;
      node.right = this._deleteItem(node.right, successor.value);
    } else if (value < node.value) {
      node.left = this._deleteItem(node.left, value);
    } else {
      node.right = this._deleteItem(node.right, value);
    }

    return node;
  }

  /**
   * Finds the inorder successor (leftmost node in right subtree)
   * @param {Node} node - Node to find successor for
   * @returns {Node} Successor node
   */
  _getSuccessor(node) {
    let curr = node.right; // Start from right child
    // Find leftmost node in right subtree
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  /**
   * Searches for a value in the tree
   * @param {*} value - Value to search for
   * @returns {Node|null} Node containing the value, or null if not found
   */
  find(value) {
    return this._find(this._root, value);
  }

  /**
   * Recursively searches for a value in the BST
   * @param {Node|null} node - Current node
   * @param {*} value - Value to search for
   * @returns {Node|null} Node containing the value, or null if not found
   */
  _find(node, value) {
    if (node === null) return null;

    if (value === node.value) {
      return node;
    } else if (value < node.value) {
      return this._find(node.left, value);
    } else {
      return this._find(node.right, value);
    }
  }

  /**
   * Calculates the height of the tree
   * @returns {number} Height of the tree (-1 for empty tree)
   */
  height() {
    return this._height(this._root);
  }

  /**
   * Recursively calculates the height of a subtree
   * @param {Node|null} node - Root of subtree
   * @returns {number} Height of the subtree
   */
  _height(node) {
    if (node === null) return -1;

    return Math.max(this._height(node.left), this._height(node.right)) + 1;
  }

  /**
   * Performs level-order traversal, calling callback for each node
   * @param {Function} callback - Function to call for each node
   * @throws {Error} If callback is not a function
   */
  levelOrderForEach(callback) {
    if (!this._isFunction(callback)) {
      throw new Error("Expected a function");
    }

    const q = [];
    q.push(this._root);

    // Process nodes level by level using BFS
    while (q.length > 0) {
      let size = q.length;
      // Process all nodes at current level
      for (let i = 0; i < size; i++) {
        let curr = q.shift();
        callback(curr);

        // Add children to queue for next level
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
      }
    }
  }

  /**
   * Validates if a value is a function
   * @param {*} callback - Value to check
   * @returns {boolean} True if callback is a function
   */
  _isFunction(callback) {
    return typeof callback === "function";
  }

  /**
   * Performs inorder traversal, calling callback for each node
   * @param {Function} callback - Function to call for each node
   * @throws {Error} If callback is not a function
   */
  inOrderForEach(callback) {
    if (!this._isFunction(callback)) {
      throw new Error("Expected a function");
    }

    return this._inOrder(this._root, callback);
  }

  /**
   * Recursively performs inorder traversal (left, root, right)
   * @param {Node|null} node - Current node
   * @param {Function} callback - Function to call for each node
   */
  _inOrder(node, callback) {
    if (node === null) return;

    this._inOrder(node.left, callback); // Visit left subtree
    callback(node); // Visit root
    this._inOrder(node.right, callback); // Visit right subtree
  }

  /**
   * Performs preorder traversal, calling callback for each node
   * @param {Function} callback - Function to call for each node
   * @throws {Error} If callback is not a function
   */
  preOrderForEach(callback) {
    if (!this._isFunction(callback)) {
      throw new Error("Expected a function");
    }

    return this._preOrder(this._root, callback);
  }

  /**
   * Recursively performs preorder traversal (root, left, right)
   * @param {Node|null} node - Current node
   * @param {Function} callback - Function to call for each node
   */
  _preOrder(node, callback) {
    if (node === null) return;

    callback(node); // Visit root
    this._preOrder(node.left, callback); // Visit left subtree
    this._preOrder(node.right, callback); // Visit right subtree
  }

  /**
   * Performs postorder traversal, calling callback for each node
   * @param {Function} callback - Function to call for each node
   * @throws {Error} If callback is not a function
   */
  postOrderForEach(callback) {
    if (!this._isFunction(callback)) {
      throw new Error("Expected a function");
    }

    return this._postOrder(this._root, callback);
  }

  /**
   * Recursively performs postorder traversal (left, right, root)
   * @param {Node|null} node - Current node
   * @param {Function} callback - Function to call for each node
   */
  _postOrder(node, callback) {
    if (node === null) return;

    this._postOrder(node.left, callback); // Visit left subtree
    this._postOrder(node.right, callback); // Visit right subtree
    callback(node); // Visit root
  }

  /**
   * Checks if the tree is balanced (height difference between subtrees <= 1)
   * @param {Node} node - Node to check balance for (defaults to root)
   * @returns {boolean} True if tree is balanced
   */
  isBalanced(node = this._root) {
    if (node === null) return true;

    const leftHeight = this._height(node.left);
    const rightHeight = this._height(node.right);

    // Tree is balanced if:
    // 1. Height difference is at most 1
    // 2. Both subtrees are balanced
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  /**
   * Rebalances the tree by rebuilding it from sorted values
   * Uses inorder traversal to get sorted values, then rebuilds balanced tree
   */
  _rebalance() {
    const values = [];
    // Get all values in sorted order
    this.inOrderForEach((node) => values.push(node.value));
    // Rebuild tree with balanced structure
    this._root = this._buildBST(values, 0, values.length - 1);
  }
}
