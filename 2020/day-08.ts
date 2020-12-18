import {day8Instructions} from './day-08.data';
export interface State { acc: number; nextLine: number, visitedLines: number[], stopCode?: 'ok' | 'loop' }
export interface Instruction {code: 'acc' | 'jmp' | 'nop', value: number }
type RunFunction = (initialState: State, instructions: Instruction[]) => State;

const initialState: State = {acc: 0, nextLine: 0, visitedLines: [], stopCode: 'ok'};

export const run: RunFunction = (currentState: State, instructions) => {

    switch (true) {

        case currentState.visitedLines.length > instructions.length:
            // console.log('stop ran all instructions once: ');
            return {...currentState, stopCode: 'loop'};
        case currentState.nextLine >= instructions.length:
            // console.log('stop no more instructions: ');
            return {...currentState, stopCode: 'ok'};
        case currentState.nextLine < 0:
                // console.log('stop jumb to negative line number: ');
                return {...currentState, stopCode: 'ok'};
        case currentState.visitedLines.includes(currentState.nextLine):
            // console.log('stop revisited step: ');
            return {...currentState, stopCode: 'loop'};
        default:

            const instruction = instructions[currentState.nextLine];
            const acc = currentState.acc + (instruction.code === 'acc' ? instruction.value : 0);
            const nextLine = currentState.nextLine + (instruction.code === 'jmp' ? instruction.value : 1);
            const visitedLines = [...currentState.visitedLines, currentState.nextLine]

            return run({ acc, nextLine, visitedLines }, instructions);
    }

}

// console.log(run(initialState, day8Instructions));


// part 2
const finalFixedstate = day8Instructions.find((instruction, index, instructions) => {

    // not looking for 'acc's
    if (instruction.code === 'acc') {
        return false;
    }

    // switch jmp/nop
    const fixedInstructions = [...instructions];
    fixedInstructions.splice(index, 1, {
        ...instruction,
        code: instruction.code === 'jmp' ? 'nop': 'jmp'
    } );
    if (fixedInstructions.length !== instructions.length) {
        throw new Error(' mismatch');
    }

    const finalState = run(initialState, fixedInstructions);
    const isOk = finalState.nextLine === instructions.length && finalState.stopCode === 'ok'
    if (isOk) {
        // this state holds the required acc
        console.log({...finalState, visitedLines: []})
    }
    return isOk;
})

console.log(finalFixedstate)