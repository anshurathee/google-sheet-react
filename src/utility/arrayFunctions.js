const deepCopyArray = arr => arr.map(item => Array.isArray(item) ? deepCopyArray(item) : item);

export {deepCopyArray}