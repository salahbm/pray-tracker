export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout | number;
  return function executedFunction(...args: any[]) {
    const later = () => setTimeout(() => func(...args), wait);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
