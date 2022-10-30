import { FormatConstant, ErrorConstant } from '../data/constant';

export const mergedArrayById = (arr1: any, arr2: any) => {
  return [
    ...arr1
      .concat(arr2)
      .reduce(
        (m: any, o: any) => m.set(o.id, Object.assign(m.get(o.id) || {}, o)),
        new Map()
      )
      .values(),
  ];
};

export const convetDecimalToBinary = (decimal: number) => {
  return (decimal >>> 0).toString(2);
};

export const convetDecimalToHexadecimal = (decimal: number) => {
  if (decimal < 0) {
    decimal = 0xffffffff + decimal + 1;
  }

  return decimal.toString(16).toUpperCase();
};

export const hexToSignedInt = (hex: string) => {
  if (hex.length % 2 !== 0) {
    hex = '0' + hex;
  }
  var num = parseInt(hex, 16);
  var maxVal = Math.pow(2, (hex.length / 2) * 8);
  if (num > maxVal / 2 - 1) {
    num = num - maxVal;
  }
  return num;
};

const convertHexToFloat = (str: string) => {
  var number = 0,
    sign,
    order,
    mantiss,
    exp,
    i;

  if (str.length <= 6) {
    exp = parseInt(str, 16);
    sign = exp >> 16 ? -1 : 1;
    mantiss = ((exp >> 12) & 255) - 127;
    order = ((exp & 2047) + 2048).toString(2);
    for (i = 0; i < order.length; i += 1) {
      number += parseInt(order[i], 10) ? Math.pow(2, mantiss) : 0;
      mantiss--;
    }
  } else if (str.length <= 10) {
    exp = parseInt(str, 16);
    sign = exp >> 31 ? -1 : 1;
    mantiss = ((exp >> 23) & 255) - 127;
    order = ((exp & 8388607) + 8388608).toString(2);
    for (i = 0; i < order.length; i += 1) {
      number += parseInt(order[i], 10) ? Math.pow(2, mantiss) : 0;
      mantiss--;
    }
  }
  // @ts-ignore
  return (number * sign).toString(10);
};

export const convertDataModbus = (data: any) => {
  if (data) {
    // console.log(data);

    if (data[0] === '') return 'No Variable Name';
    else if (data[1] === FormatConstant.REAL4 && data.length === 4) {
      console.log(data[2], data[3]);

      let hexaDecimal =
        convetDecimalToHexadecimal(data[3]) +
        convetDecimalToHexadecimal(data[2]);
      // console.log(hexaDecimal);

      return convertHexToFloat(hexaDecimal);
    }
    // Integer only has one case with one para
    else if (data[1] === FormatConstant.INTEGER) {
      let binary = convetDecimalToBinary(data[2]);
      binary = binary.slice(binary.length - 8);
      return parseInt(binary, 2);

      // Long only have one case with two para
    } else if (data[1] === FormatConstant.LONG) {
      let hexaDecimal =
        convetDecimalToHexadecimal(data[3]) +
        convetDecimalToHexadecimal(data[2]);
      return hexToSignedInt(hexaDecimal);
    } else if (data[1] === FormatConstant.BCD) return 'BCD';
  }
};
