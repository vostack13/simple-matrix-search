function isStringRight(text, arr, rowIdx, collumnIdx, row) {
  if(arr[rowIdx][collumnIdx + (text.length - 1)] !== undefined) {
    const resultRight = Array
      .from(row)
      .slice(collumnIdx, collumnIdx + text.length)
      .join('');

    if(resultRight === text)
      return true
  }
}

function isStringLeft(text, arr, rowIdx, collumnIdx, row) {
  if(arr[rowIdx][collumnIdx - (text.length - 1)] !== undefined) {
    const resultLeft = Array
      .from(row)
      .slice(collumnIdx - (text.length - 1), collumnIdx + 1)
      .reverse()
      .join('');

    if(resultLeft === text)
      return true
  }
}

function isStringDown(text, arr, rowIdx, collumnIdx) {
  if(arr[rowIdx + (text.length - 1)] &&
    arr[rowIdx + (text.length - 1)][collumnIdx] !== undefined
  ) {
    const resultDown = arr
      .filter((I, idx) => (idx >= rowIdx && idx <= rowIdx + (text.length - 1)))
      .reduce((prev, curr) => [...prev, ...curr[collumnIdx]], [])
      .join('');

    if(resultDown === text)
      return true
  }
}

function isStringUp(text, arr, rowIdx, collumnIdx) {
  if(arr[rowIdx - (text.length - 1)] &&
    arr[rowIdx - (text.length - 1)][collumnIdx] !== undefined
  ) {
    const resultUp = arr
      .filter((I, idx) => (idx <= rowIdx && idx >= rowIdx - (text.length - 1)))
      .reduceRight((prev, curr) => [...prev, ...curr[collumnIdx]], [])
      .join('');

    if(resultUp === text)
      return true
  }
}

function findWord(text, data) {
  if(typeof text !== "string" || text.length <= 0) {
    return false;
  }

  if(!Array.isArray(data)
    || data.length === 0
    || data.some(I => (typeof I !== "string" || I.length <=0 ))
  ) {
    return false;
  }

  return data.some((row, rowIdx, arr) => {
    return Array
      .from(row)
      .some((collumn, collumnIdx, rowArr) => {
        if(collumn === text[0]) {
          return isStringRight(text, arr, rowIdx, collumnIdx, rowArr) ||
            isStringLeft(text, arr, rowIdx, collumnIdx, rowArr) ||
            isStringUp(text, arr, rowIdx, collumnIdx) ||
            isStringDown(text, arr, rowIdx, collumnIdx)
        }
      })
    })
}