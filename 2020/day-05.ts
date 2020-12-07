import { valueValidators } from './day-04';
import { boardingpassList } from './day-05.data';
import { onValueDescending } from './utils';

console.log(boardingpassList.length);

export const toBinaryString = (s: string) => s.split('').map(char => char.match(/[LF]/)  ? '0' : '1').join('');
export const toIntValue = (s: string) => parseInt(s, 2);
const valueList = boardingpassList
    .map(toBinaryString)
    .map(toIntValue)
    .sort(onValueDescending);

console.log(valueList[0])

const onNotHavingAConsecutiveNeighbour = (value: number, index: number, list: number[]) =>
index !== 0 &&
list[index - 1] + value + list[index + 1] !== 3 * value &&
index !== list.length - 1

const notNeighbourValues = valueList
    .filter(onNotHavingAConsecutiveNeighbour)

console.log(notNeighbourValues)