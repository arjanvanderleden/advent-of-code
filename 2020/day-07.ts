import { rules } from './day-07.data';
import { isNotEmpty, isNotEmptyString, Lookup, splitOnNewLines, toLookup, toTotal } from './utils';

type Rules = Lookup<Lookup<number>>;

const toStringWithoutBags = (s: string) => s
    .replace('.','')
    .replace(/bags/g,'')
    .replace(/bag/g,'')
    .trim();

const toBagRule = (lookup: Lookup<Lookup<number>>, line: string) => {
    const [rule, rawRuleValue] = line
        .split('contain')
        .map(toStringWithoutBags);
    const toSingleBagRule = (s: string) => {
        const match = s.trim().match(/^(\d) (\D+)$/);
        return match ? {rule: match[2], count: parseInt(match[1], 10)} : undefined;
    }

    const ruleValues = rawRuleValue
        .split(',')
        .map(toSingleBagRule)
        .filter(isNotEmpty)
        .reduce(toLookup(ruleData => ruleData.rule, ruleData => ruleData.count), {});

    lookup[rule] = ruleValues
    return lookup;
}

const ruleLookup = splitOnNewLines(rules)
    .reduce(toBagRule, {})
const allBags = Object.keys(ruleLookup);

interface BagInfo {bagsThatCan: string[]; otherBags: string[]}

const yourBagName = 'shiny gold';
const childBagNames = (bag: string) => Object.keys(ruleLookup[bag]);

const childBagsIsOneOf = (bags: string[]) => (bag: string) => bags.find(b => childBagNames(bag).includes(b)) !== undefined;
const childBagsIsNotOneOf = (bags: string[]) => (bag: string) => bags.find(b => childBagNames(bag).includes(b)) === undefined;

const bagsThatCanContain = ({bagsThatCan, otherBags}: BagInfo ) => {

    const newBags = otherBags.filter(childBagsIsOneOf(bagsThatCan))
    if (newBags.length === 0) {
        return bagsThatCan
    }

    return bagsThatCanContain({
        bagsThatCan: [...bagsThatCan, ...newBags],
        otherBags: [...otherBags.filter(bag => !newBags.includes(bag))]
    });
}

const initialsSet = {
    bagsThatCan: allBags.filter(childBagsIsOneOf([yourBagName])),
    otherBags: allBags.filter(childBagsIsNotOneOf([yourBagName]))
}

const allBagsThatCan = bagsThatCanContain(initialsSet)
console.log(allBagsThatCan.length, );

// part two


const requiredBags = (bagName: string) => childBagNames(bagName).length === 0 ?
    1 : //only that bag
    1 + childBagNames(bagName)
        .map(childBagName => {
            const count = ruleLookup[bagName][childBagName];
            return count * requiredBags(childBagName)
        })
        .reduce(toTotal)

console.log(requiredBags(yourBagName) - 1)// not counting the shiny gold bag itself;