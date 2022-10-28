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

enum FormatConstant {
  REAL4 = 'REAL4',
  INTEGER = 'INTEGER',
  LONG = 'LONG',
  BCD = 'BCD',
}

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

export const hexToFloat = (hex: string) => {
  var parts = hex.split('.');
  if (parts.length > 1) {
    return (
      parseInt(parts[0], 16) +
      parseInt(parts[1], 16) / Math.pow(16, parts[1].length)
    );
  }
  return parseInt(parts[0], 16);
};

export const convertDataModbus = (data: any) => {
  if (data) {
    // console.log(data);

    if (data[0] === '') return 'No Variable Name';
    else if (data[1] === FormatConstant.REAL4 && data.length === 4) {
      let hexaDecimal =
        convetDecimalToHexadecimal(data[3]) +
        convetDecimalToHexadecimal(data[2]);
      return hexToFloat(hexaDecimal);
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
