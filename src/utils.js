import { ethers } from 'ethers';
import { toUtf8Bytes } from 'ethers/lib/utils';

export const toHex = (num) => {
  const val = Number(num);
  return '0x' + val.toString(16);
};

export const hexToNum = (str) => {
  const removeHex = str.replaceAll('0x', '');
  const val = Number(removeHex);
  return val;
};

export const debounce = (fn, delay) => {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export const toHexByte = (string) => {
  var utf8 = unescape(encodeURIComponent(string));
  var arr = [];
  for (var i = 0; i < utf8.length; i++) {
    let utfStr = utf8.charCodeAt(i);
    let hexString = utfStr.toString(16);
    arr.push(hexString);
  }
  let result = '0x' + arr.join('');
  return result;
};

export const toKeccak = (hexStringOrArrayish) => {
  const byteString = toUtf8Bytes(hexStringOrArrayish);
  const keccakString = ethers.utils.keccak256(byteString);
  return keccakString;
};
