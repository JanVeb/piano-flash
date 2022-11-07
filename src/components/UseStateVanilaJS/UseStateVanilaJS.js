export const UseStateVJS = defaultValue => {
  let value = defaultValue
  const getValue = () => value
  const setValue = newValue => (value = newValue)
  return [getValue, setValue]
}

export const [testme, setTestme] = UseStateVJS(10)
console.log('🚀 ~ file: UseStateVanilaJS.js ~ line 9 ~ testme', testme)
// console.log('🚀 ~ file: UseStateVanilaJS.js ~ line 9 ~ counter', counter)
window.setTestme = setTestme
