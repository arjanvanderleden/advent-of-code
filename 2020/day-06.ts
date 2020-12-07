import { allAnswers } from './day-06.data';
import { onTextAscending, splitOn, splitOnEmptyLines, toTotal, joinOn} from './utils';

const toGroupAnswers = splitOn('\n');
const toCombinedString = joinOn('');

const groupTexts = splitOnEmptyLines(allAnswers);
const onBeingUnique = (value: any, index: number,  list: any[]) => list.indexOf(value) === index;
const toUniqueAnswers =  (s: string) => s.replace(/[^a-z]/,'')
    .split('')
    .filter(onBeingUnique)
    .sort(onTextAscending)
    .join('')

const totalUniqueAnswersOfGroups = groupTexts
    .map(toGroupAnswers)
    .map(toCombinedString)
    .map(toUniqueAnswers)
    .map(s => s.length)
    .reduce(toTotal)


console.log(totalUniqueAnswersOfGroups)

export const toLetterCount = (targetString: string) => (char: string) => {
    const isEqualToChar = (c: string) => c === char;
    return targetString
        .split('')
        .filter(isEqualToChar)
        .length;
}


export const toConsensusCount = (groupAnswers: string[]) => {

    const groupSize = groupAnswers.length;
    const allGroupAnswers = toCombinedString(groupAnswers);
    const uniqueAnswers = toUniqueAnswers(allGroupAnswers);

    return uniqueAnswers
        .split('')
        .map(toLetterCount(allGroupAnswers))
        .filter(count => count === groupSize)
        .length

}

const totalConsensusAnswers = groupTexts
    .map(toGroupAnswers)
    .map(toConsensusCount)
    .reduce(toTotal);

console.log(totalConsensusAnswers)
