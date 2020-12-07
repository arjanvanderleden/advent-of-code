import { isNotEmptyString, splitOn } from './utils';
import { onValueAscending } from './utils';

console.log(isNotEmptyString(''))
console.log(isNotEmptyString())
console.log(isNotEmptyString(null))
console.log(isNotEmptyString('x'))
console.log(isNotEmptyString(13))

const  list = splitOn('\n')(
    `FFBFBBBRLR
    BBFFBFFRRR
    BFFFFBBRRR
    FFBFFBBLRR


    `);
console.log(list.length === 7)
console.log(list.filter(isNotEmptyString).length === 4)

console.log([3, 9, 2, 6, 2.1, 2.1].sort(onValueAscending))