import {
  FormatConstant,
  ErrorConstant,
  ConvertMonthNumberToText,
} from '../data/constant';

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
 * @param bcd string
 * @returns decimal
 */
const convertBCDToDecimal = (bcd: string) => {
  // Add n amount of 0 if not meet the require length (16)
  if (bcd.length < 16) {
    const missingZero = 16 - bcd.length;
    let additionString = '';
    for (let i = 0; i < missingZero; i++) {
      additionString += '0';
    }
    bcd = additionString + bcd;
  }

  // Split the string to group of 4 character
  const groupOfBinary = bcd.match(/.{1,4}/g);
  let returnValue = '';

  for (let i = 0; i < 4; i++) {
    if (groupOfBinary)
      returnValue = returnValue + parseInt(groupOfBinary[i], 2);
  }

  return returnValue;
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

      // SMHDMY format
      if (data[0] === 'Calendar (date and time)') {
        let YearMonthBinary = convetDecimalToBinary(data[4]);
        let DayHourBinary = convetDecimalToBinary(data[3]);
        let MinuteSecondBinary = convetDecimalToBinary(data[2]);

        let MinuteSecond: any = convertBCDToDecimal(MinuteSecondBinary);
        let DayHour: any = convertBCDToDecimal(DayHourBinary);
        let YearMonth: any = convertBCDToDecimal(YearMonthBinary);

        MinuteSecond = MinuteSecond.match(/.{1,2}/g);
        DayHour = DayHour.match(/.{1,2}/g);
        YearMonth = YearMonth.match(/.{1,2}/g);

        return `${ConvertMonthNumberToText(Number(YearMonth[1]))} ${
          DayHour[0]
        } 20${YearMonth[0]} ${DayHour[1]}:${MinuteSecond[0]}:${
          MinuteSecond[1]
        }`;
      }

      // if 00H, then unlock, otherwise same like other BCD
      if (data[0] === 'System password') {
        const convertToBinary1 = convetDecimalToBinary(data[2]);
        const convertToBinary2 = convetDecimalToBinary(data[3]);

        const convertBCDToDecimal1 = convertBCDToDecimal(convertToBinary1);
        const convertBCDToDecimal2 = convertBCDToDecimal(convertToBinary2);
        const returnValue = convertBCDToDecimal2 + convertBCDToDecimal1;

        if (Number(returnValue) === 0) {
          return 'Unlock';
        } else return returnValue;
      }

      // if A55A hex, then unlock, otherwise same like other BCD
      if (data[0] === 'Password for hardware') {
        const convertToBinary1 = convetDecimalToBinary(data[2]);

        const convertBCDToDecimal1 = convertBCDToDecimal(convertToBinary1);
        const converInputToHex = convetDecimalToHexadecimal(data[2]);

        if (converInputToHex === 'A55A') {
          return 'Unlock';
        } else return convertBCDToDecimal1;
      }

      // if A55A hex, then unlock, otherwise same like other BCD
      if (data[0] === 'Day+Hour for Auto-Save') {
        const convertToBinary1 = convetDecimalToBinary(data[2]);

        const convertBCDToDecimal1 = convertBCDToDecimal(convertToBinary1);

        // Split to day and hour
        const DayHour: any = convertBCDToDecimal1.match(/.{1,2}/g);

        // Return with correct format
        return `${DayHour[1]}:00 on ${
          DayHour[0] === '00'
            ? 'everyday'
            : DayHour[0][1] === '1'
            ? `${DayHour[0]}st`
            : DayHour[0][1] === '2'
            ? `${DayHour[0]}nd`
            : DayHour[0][1] === '3'
            ? `${DayHour[0]}rd`
            : `${DayHour[0]}th`
        }`;
      }

      return 'BCD';
    }
  }
};
