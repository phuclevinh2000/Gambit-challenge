export enum FormatConstant {
  REAL4 = 'REAL4',
  INTEGER = 'INTEGER',
  LONG = 'LONG',
  BCD = 'BCD',
  EMPTY = '',
  BIT = 'BIT',
}

export const ErrorConstant = (bitIndex: number) => {
  if (bitIndex === 0) return 'No received signal\n';
  else if (bitIndex === 1) return 'Low received signal\n';
  else if (bitIndex === 2) return 'Poor received signal\n';
  else if (bitIndex === 3) return 'Pipe empty\n';
  else if (bitIndex === 4) return 'Hardware failure ';
  else if (bitIndex === 5) return 'Receiving circuits gain in adjusting\n';
  else if (bitIndex === 6)
    return 'Frequency at the frequency output over flow\n';
  else if (bitIndex === 7) return 'Current at 4-20mA over flow\n';
  else if (bitIndex === 8) return 'RAM check-sum error\n';
  else if (bitIndex === 9) return 'Main clock or timer clock error\n';
  else if (bitIndex === 10) return 'Parameters check-sum error\n';
  else if (bitIndex === 11) return 'ROM check-sum error\n';
  else if (bitIndex === 12) return 'Temperature circuits error\n';
  else if (bitIndex === 13) return 'Reserved\n';
  else if (bitIndex === 14) return 'Internal timer over flow\n';
  else if (bitIndex === 15) return 'Analog input over range\n';
};

export const ConvertMonthNumberToText = (month: number) => {
  if (month === 1) return 'January';
  else if (month === 2) return 'February';
  else if (month === 3) return 'March';
  else if (month === 4) return 'April';
  else if (month === 5) return 'May';
  else if (month === 6) return 'June';
  else if (month === 7) return 'July';
  else if (month === 8) return 'August';
  else if (month === 9) return 'September';
  else if (month === 10) return 'October';
  else if (month === 11) return 'November';
  else if (month === 12) return 'December';
};
