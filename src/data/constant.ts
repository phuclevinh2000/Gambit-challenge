export enum FormatConstant {
  REAL4 = 'REAL4',
  INTEGER = 'INTEGER',
  LONG = 'LONG',
  BCD = 'BCD',
}

export enum ErrorConstant {
  BIT0 = 'No received signal',
  BIT1 = 'Low received signal',
  BIT2 = 'Poor received signal',
  BIT3 = 'Pipe empty',
  BIT4 = 'Hardware failure',
  BIT5 = 'Receiving circuits gain in adjusting',
  BIT6 = 'Frequency at the frequency output over flow',
  BIT7 = 'Current at 4-20mA over flow',
  BIT8 = 'RAM check-sum error',
  BIT9 = 'Main clock or timer clock error',
  BIT10 = 'Parameters check-sum error',
  BIT11 = 'ROM check-sum error',
  BIT12 = 'Temperature circuits error',
  BIT13 = 'Reserved',
  BIT14 = 'Internal timer over flow',
  BIT15 = 'Analog input over range',
}
