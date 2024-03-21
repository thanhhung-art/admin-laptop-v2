export function compareArrays(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false
  }

  arr1.forEach((url, i) => {
    if (url !== arr2[i]) return false
  })

  return true
}