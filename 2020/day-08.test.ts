import { run, State } from './day-08';
import { toInstruction } from './day-08.data';
import { splitOnNewLines } from './utils';

console.log(toInstruction('jmp -292'));

const instructions= splitOnNewLines(
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`)
.map(toInstruction);

const initialState: State = {acc: 0, nextLine: 0, visitedLines: []};
console.log(run(initialState, instructions).visitedLines);
[0, 1, 2, 6, 7, 1, 3, 4, 1]