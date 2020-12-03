import { treeMapData, Position } from './day-03.data';

const nextStep = (slope: Position, position: Position) => ({
    x: position.x + slope.x,
    y: position.y + slope.y,
})

const notFinished = (position: Position) => position.y < treeMapData.height;
const doNextStep = (slope: Position, position: Position, steps: string[]) => {
    steps.push(treeMapData.treeMap[position.y][position.x % treeMapData.width])
    return nextStep(slope, position);
}

const startPosition: Position = {x: 0, y: 0 };
const slopes = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2}
];

const slopeTrees = slopes.map(slope => {
    const steps = [];
    const walk = (position: Position) => notFinished(position) ?
        walk(doNextStep(slope, position, steps)) :
        steps.filter(c => c=== "#").length;
    return walk(startPosition)
})

console.log(slopeTrees)
console.log(slopeTrees.reduce((p,v) => p * v, 1))