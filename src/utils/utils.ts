import { FormatConstant, ErrorConstant } from '../data/constant';

/**
 *
 * @param arr1 : first array
 * @param arr2 : second array
 * @returns merged array of array 1 and 2
 */
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

/**
 *
 * @param str : string
 * @returns reversed string
 */
export const reverseString = (str: string) => {
  return str.split('').reverse().join('');
};

/**
 *
 * @param decimal : number
 * @returns binary string of the input decimal
 */
export const convetDecimalToBinary = (decimal: number) => {
  return (decimal >>> 0).toString(2);
};

/**
 *
 * @param decimal number
 * @returns hex string of the input decimal
 */
export const convetDecimalToHexadecimal = (decimal: number) => {
  if (decimal < 0) {
    decimal = 0xffffffff + decimal + 1;
  }

  return decimal.toString(16).toUpperCase();
};

/**
 *
 * @param hex string
 * @returns signed int string of the input hex
 */
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

/**
 *
 * @param hex string
 * @returns float number of the input hex
 */
export const convertHexToFloat = (str: string) => {
  var number = 0,
    sign = 0,
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
  return (number * sign).toString(10);
};

/**
 *
 * @param data data input
 * @returns convert to user readable data from what the sensor returns
 */
export const convertDataModbus = (data: any) => {
  if (data) {
    // Check the data format
    if (data[1] === FormatConstant.BIT) {
      // Change to binary and reverse the string
      let binary = convetDecimalToBinary(data[2]);

      // Add the missing 0 into the string to make it 16 bit
      for (let i = binary.length - 1; i < 15; i++) {
        binary = binary.replace(/^/, '0');
      }

      // Reverse the string to count the index as the error bit
      binary = reverseString(binary);
      let errorMessage: string = '';

      for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
          errorMessage += ErrorConstant(i) + ' ';
        }
      }

      return errorMessage;
    } else if (data[0] === FormatConstant.EMPTY) return 'No Variable Name';
    else if (data[1] === FormatConstant.REAL4 && data.length === 4) {
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
    } else if (data[1] === FormatConstant.BCD) {
      // Need to implement the case for BCD response from sensor too

      return 'BCD';
    }
  }
};
