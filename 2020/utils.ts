export const splitOn = (seperator: string) => (s: string) => s.split(seperator);

export const splitOnEmptyLines = splitOn('\n\n');
export const splitOnNewLines = splitOn('\n');

export const joinOn = (seperator: string) =>  (lines: string[]) => lines.join(seperator);
export const toTextWithoutSeperator = joinOn('');

export const isNotEmptyString = (s: string | undefined | null) => s !== undefined && s!== null && typeof(s) === 'string' && s.trim() !== '';

export const onValueAscending = (a: number, b: number) => a - b;
export const onValueDescending = (a: number, b: number) => b - a;

export const onTextAscending = (a: string, b: string) => a.localeCompare(b);
export const onTextDescending = (a: string, b: string) => b.localeCompare(a);

export const toTotal = (sum: number, value: number) => sum + value;