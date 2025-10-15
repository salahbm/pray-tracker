import { OpacityProps } from './heat';

const getOpacityByNumber = (
  opacityOptions: OpacityProps[],
  value: number,
): number => {
  if (value <= 0) return 0.1;
  for (const option of opacityOptions) {
    if (value <= option.limit) return option.opacity;
  }
  return 1;
};

const arrToMatrix = (array: number[]): number[][] => {
  const matrix: number[][] = [];
  for (let i = 0; i < array.length; i += 7) {
    matrix.push(array.slice(i, i + 7));
  }
  return matrix;
};

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export { getOpacityByNumber, arrToMatrix, getDaysInMonth };
