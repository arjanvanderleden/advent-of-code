export const splitOn = (seperator: string) => (s: string) => s.split(seperator);
export const isNotEmptyString = (s: string | undefined | null) => s !== undefined && s!== null && typeof(s) === 'string' && s.trim() !== '';

export const onValueAscending = (a: number, b: number) => a - b;
export const onValueDescending = (a: number, b: number) => b - a;
