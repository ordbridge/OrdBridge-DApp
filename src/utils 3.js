export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };

export const debounce = (fn, delay) => {
  let timer;
  return function (){
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
}