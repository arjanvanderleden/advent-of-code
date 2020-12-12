export const splitOn = (seperator: string) => (s: string) => s.split(seperator);

export const splitOnEmptyLines = splitOn('\n\n');
export const splitOnNewLines = splitOn('\n');

export const joinOn = (seperator: string) =>  (lines: string[]) => lines.join(seperator);
export const toTextWithoutSeperator = joinOn('');

export const isNotEmptyString = (s: string | undefined | null) => s !== undefined && s!== null && typeof(s) === 'string' && s.trim() !== '';
export const isNotEmpty = (o: any) => o !== undefined && o !== null;
export const onValueAscending = (a: number, b: number) => a - b;
export const onValueDescending = (a: number, b: number) => b - a;

export const onTextAscending = (a: string, b: string) => a.localeCompare(b);
export const onTextDescending = (a: string, b: string) => b.localeCompare(a);

export const toTotal = (sum: number, value: number) => sum + value;

export type Lookup<T> = {[key: string]: T}


export const toLookup = <T, V>(keySelector: (obj: T) => string, valueSelector: (obj: T) => V) => (lookup: Lookup<V>, v: T) => {
    const key = keySelector(v);
    if (lookup[key] !== undefined) {
        throw new Error(`key ${key} already exists in lookup`)
    }
    lookup[key] = valueSelector(v);
    return lookup;
}