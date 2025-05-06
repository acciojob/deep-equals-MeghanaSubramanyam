function deepEquals(a, b) {
  // Check for strict equality (handles most primitives and reference equality)
  if (a === b) {
    // But need to handle NaN specially
    return a !== 0 || 1 / a === 1 / b; // handles +0 vs -0 correctly
  }

  // Handle NaN
  if (typeof a === "number" && typeof b === "number") {
    return isNaN(a) && isNaN(b);
  }

  // Handle null and undefined strictly
  if (a === null || b === null || a === undefined || b === undefined) {
    return a === b;
  }

  // If types don't match
  if (typeof a !== typeof b) {
    return false;
  }

  // Handle Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  // One is array, one is not
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  // Handle Objects
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    for (let key of aKeys) {
      if (!b.hasOwnProperty(key)) return false;
      if (!deepEquals(a[key], b[key])) return false;
    }
    return true;
  }

  // Default: not deeply equal
  return false;
}

module.exports = deepEquals;
