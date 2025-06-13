export const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export const mergeClasses = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');
