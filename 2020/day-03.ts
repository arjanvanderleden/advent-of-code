import { treeMapData, Position } from './day-03.data';

const nextStep = (position: Position) => ({
    x: position.x + 3,
    y: position.y + 1,
})

const steps = [];
const notFinished = (position: Position) => position.y < treeMapData.height;
const doNextStep = (position: Position) => {
    steps.push(treeMapData.treeMap[position.y][position.x % treeMapData.width])
    return nextStep(position);
}

const walk = (position: Position) => notFinished(position) ?
        walk(doNextStep(position)) :
        position;
const startPosition: Position = {x: 0, y: 0 };

const endPosition = walk(startPosition);

console.log(endPosition.x)
console.log(steps.length)
console.log(treeMapData.height)
console.log(steps.filter(c => c === '#').length)