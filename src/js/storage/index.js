/**
 * Saves a key-value pair to the local storage. The value is converted to JSON format before storage.
 *
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to be stored.
 * @returns {void}
 *
 * @example
 * save("username", "john_doe");
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads a value from the local storage based on the provided key. Parses the stored JSON value.
 *
 * @param {string} key - The key under which the value is stored.
 * @returns {any} - The retrieved value or null if not found or parsing fails.
 *
 * @example
 * const username = load("username");
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Removes a key-value pair from the local storage based on the provided key.
 *
 * @param {string} key - The key to remove from the local storage.
 * @returns {void}
 *
 * @example
 * remove("username");
 */
export function remove(key) {
  localStorage.removeItem(key);
}
