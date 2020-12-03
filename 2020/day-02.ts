import { passwords, PasswordEntry } from './day-02.data';

export const onFirstRuleMatch = (entry: PasswordEntry) => {
    const chars = entry.password.split('').filter(c => c === entry.char);
    return chars.length >= entry.min && chars.length <= entry.max;
}
const passwordsThatMatchOnFirstRule = passwords.filter(onFirstRuleMatch)
console.log(passwordsThatMatchOnFirstRule.length)


export const onSecondRuleMatch = (entry: PasswordEntry) => {
    const numberOfMatchingChars = 0
        + (entry.password[entry.min - 1] === entry.char ? 1 : 0)
        + (entry.password[entry.max - 1] === entry.char ? 1 : 0)
    return numberOfMatchingChars === 1;
}

const passwordsThatMatchOnSecondRule = passwords.filter(onSecondRuleMatch)
console.log(passwordsThatMatchOnSecondRule.length)
