/**
 * HashMap implementation with automatic resizing and collision handling
 *
 * Features:
 * - Separate chaining for collision resolution
 * - Automatic resizing when load factor exceeds 0.75
 * - Optimized removal using swap-and-pop technique
 * - Comprehensive API with keys(), values(), entries() methods
 *
 * Time Complexity:
 * - Average: O(1) for get, set, remove operations
 * - Worst case: O(n) when all keys hash to same bucket
 *
 * Space Complexity: O(n) where n is number of entries
 */
class HashMap {
  /**
   * Creates a new HashMap instance
   * @param {number} initialCapacity - Initial number of buckets (default: 16)
   */
  constructor(initialCapacity = 16) {
    this._buckets = new Array(initialCapacity); // Array of buckets for separate chaining
    this._capacity = initialCapacity; // Current capacity (number of buckets)
    this._loadFactor = 0.75; // Threshold for triggering resize
    this._size = 0; // Number of key-value pairs stored
    this._resizeCount = 0; // Counter for resize operations (debugging)
  }

  /**
   * Hash function using polynomial rolling hash with prime number 31
   * @param {string} key - The key to hash
   * @returns {number} Hash value as bucket index
   */
  _hash(key) {
    let hash = 0;
    const primeNumber = 31;

    // Polynomial rolling hash: hash = hash * 31 + charCode
    for (let i = 0; i < key.length; i++) {
      hash = (hash * primeNumber + key.charCodeAt(i)) % this._capacity;
    }
    return hash;
  }

  /**
   * Checks if HashMap needs resizing based on load factor
   * @returns {boolean} True if load factor exceeds threshold
   */
  _needsResize() {
    return this._size / this._capacity > this._loadFactor;
  }

  /**
   * Resizes the HashMap by doubling capacity and rehashing all entries
   * This is an expensive O(n) operation but maintains performance
   */
  _resize() {
    this._resizeCount++;

    console.log(
      `\n🔄 RESIZE ${this._resizeCount}: ${this._capacity} -> ${
        this._capacity * 2
      }`
    );

    console.log(`Load factor: ${(this._size / this._capacity).toFixed(2)}`);

    // Save old state before creating new table
    const oldBuckets = this._buckets;
    const oldCapacity = this._capacity;
    const oldSize = this._size;

    // Create larger table with double capacity
    this._capacity *= 2;
    this._buckets = new Array(this._capacity);
    this._size = 0; // Reset size, will be incremented during rehashing

    console.log("Before Rehashing:");
    this._printBuckets(oldBuckets, oldCapacity);

    // Rehash all entries from old table to new table
    for (let i = 0; i < oldBuckets.length; i++) {
      const bucket = oldBuckets[i];
      if (bucket) {
        for (const item of bucket) {
          this._insertWithoutResize(item.key, item.value);
        }
      }
    }
    console.log("After Rehashing:");
    this._printBuckets(this._buckets, this._capacity);
    console.log(`Item redistributed ${oldSize} -> ${this._size}`);
  }

  /**
   * Utility method to print bucket structure for debugging
   * @param {Array} buckets - Array of buckets to print
   * @param {number} capacity - Capacity to display in output
   */
  _printBuckets(buckets, capacity = this._capacity) {
    console.log(`Bucket structure (capacity: ${capacity}):`);
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      if (!bucket || bucket.length === 0) continue;

      // Format bucket contents as "key:value -> key:value"
      const items = bucket
        .map((item) => `${item.key}:${item.value}`)
        .join(" -> ");
      console.log(`   [${i}]: ${items} (${bucket.length} items)`);
    }
  }

  /**
   * Internal method to insert key-value pair without triggering resize
   * Used during rehashing to avoid infinite recursion
   * @param {string} key - The key to insert
   * @param {any} value - The value to associate with the key
   */
  _insertWithoutResize(key, value) {
    const index = this._hash(key);

    // Initialize bucket if it doesn't exist
    if (!this._buckets[index]) {
      this._buckets[index] = [];
    }

    const bucket = this._buckets[index];

    // Check if key already exists and update value
    for (const item of bucket) {
      if (item.key === key) {
        item.value = value;
        return; // Key exists, just update value
      }
    }

    // Key doesn't exist, add new entry
    bucket.push({ key, value });
    this._size++;
  }

  /**
   * Adds or updates a key-value pair in the HashMap
   * @param {string} key - The key (cannot be null or undefined)
   * @param {any} value - The value to store
   * @throws {Error} If key is null or undefined
   */
  set(key, value) {
    if (key == null) throw new Error("Key cannot be null or undefined");

    // Check if resize is needed before insertion
    if (this._needsResize()) {
      this._resize();
    }

    this._insertWithoutResize(key, value);
  }

  /**
   * Retrieves the value associated with the given key
   * @param {string} key - The key to look up
   * @returns {any|undefined} The value if found, undefined otherwise
   */
  get(key) {
    const index = this._hash(key);
    const bucket = this._buckets[index];

    if (!bucket) return undefined;

    // Linear search within bucket for matching key
    for (const item of bucket) {
      if (item.key === key) return item.value;
    }

    return undefined;
  }

  /**
   * Checks if a key exists in the HashMap
   * @param {string} key - The key to check
   * @returns {boolean} True if key exists, false otherwise
   */
  has(key) {
    return this.get(key) !== undefined;
  }

  /**
   * Removes a key-value pair from the HashMap
   * Uses swap-and-pop optimization to avoid O(n) array shifting
   * @param {string} key - The key to remove
   * @returns {boolean} True if removed, false if key not found
   */
  remove(key) {
    if (this.has(key)) {
      const index = this._hash(key);
      const bucket = this._buckets[index];

      // Find and remove the key using swap-and-pop technique
      for (let i = 0; i < bucket.length; i++) {
        const item = bucket[i];
        if (item.key === key) {
          // Swap with last element and pop (O(1) removal)
          bucket[i] = bucket[bucket.length - 1];
          bucket.pop();
          this._size--;
          console.log(`Key ${key} removed from bucket [${index}]`);
          this._printBuckets(this._buckets, this._capacity);
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Returns the number of key-value pairs in the HashMap
   * @returns {number} Number of entries
   */
  length() {
    return this._size;
  }

  /**
   * Removes all key-value pairs from the HashMap
   */
  clear() {
    console.log("Clearing ALL entries from ALL buckets");
    this._buckets = new Array(this._capacity);
    this._size = 0;
  }

  /**
   * Returns an array of all keys in the HashMap
   * @returns {Array<string>} Array of keys
   */
  keys() {
    console.log(`Print ALL Keys:`);
    const keys = [];

    // Iterate through all buckets and collect keys
    this._buckets.forEach((bucket) => {
      if (bucket) {
        bucket.forEach((item) => keys.push(item.key));
      }
    });

    console.log(keys);
    return keys;
  }

  /**
   * Returns an array of all values in the HashMap
   * @returns {Array<any>} Array of values
   */
  values() {
    console.log(`Print ALL Values:`);
    const values = [];

    // Iterate through all buckets and collect values
    this._buckets.forEach((bucket) => {
      if (bucket) {
        bucket.forEach((item) => values.push(item.value));
      }
    });

    console.log(values);
    return values;
  }

  /**
   * Returns an array of all key-value pairs as formatted strings
   * @returns {Array<string>} Array of formatted entries "[key, value]"
   */
  entries() {
    console.log(`Print ALL Entries:`);
    const entries = [];

    // Iterate through all buckets and collect formatted entries
    this._buckets.forEach((bucket) => {
      if (bucket) {
        bucket.forEach((item) => entries.push(`[${item.key}, ${item.value}]`));
      }
    });

    console.log(entries);
    return entries;
  }
}

// Test suite demonstrating HashMap functionality
const test = new HashMap(); // Create HashMap with default capacity of 16

console.log("Load entries");
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Display current bucket structure
test._printBuckets(test._buckets);

console.log(`Map size -> ${test.length()}`);

console.log('Modify value for key "kite"');
test.set("kite", "blue"); // Update existing key

test.set("moon", "silver"); // This might trigger resize due to load factor
console.log(`Map size -> ${test.length()}`);

// Test utility methods
test.keys(); // Print all keys
test.values(); // Print all values
test.entries(); // Print all entries
test._printBuckets(test._buckets); // Final bucket structure
