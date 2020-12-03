import { expenses } from './day-01.data';
const requiredSumValue = 2020;
const log = (list: number[]) => {
    console.log(list);
    console.log('sum:' ,list.reduce((p,v) => p + v, 0));
    console.log('product:' ,list.reduce((p,v) => p * v, 1));
}


const onSumMatch = (sumValue: number) => (value: number, index: number, list: number[]) => list.indexOf(sumValue - value, index + 1) !== -1;
const doubleValueMatch = expenses.find(onSumMatch(requiredSumValue));
log([doubleValueMatch, requiredSumValue - doubleValueMatch]);

const toTripleValues = (previousResult: undefined | number[], value: number, index: number, list: number[]) => {
    if (previousResult !== undefined) {
        return previousResult
    }
    const match = list.slice(index).find(onSumMatch(requiredSumValue - value));
    if (match != undefined) {
        return [value, match, requiredSumValue - match - value ]
    }
    return undefined;
}

const trippleValueMatch = expenses.reduce(toTripleValues, undefined);
log(trippleValueMatch)

