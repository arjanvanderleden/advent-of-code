import { batch } from './day-04.data';

type Passport = {[key: string]:string};
type CodePair = {code: string, value: string};

const requiredKeys = [
    'byr', // (Birth Year)
    'iyr', // (Issue Year)
    'eyr', // (Expiration Year)
    'hgt', // (Height)
    'hcl', // (Hair Color)
    'ecl', // (Eye Color)
    'pid', // (Passport ID)
    'cid', // (Country ID)
]

export const parseBatch = (s: string) => {
    return s.split('\n\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);
}

export const parsePassport = (s: string) => {
    const regex = /((\S\S\S):(\S+))/g;
    let match: RegExpExecArray;
    const codes: CodePair[] = []
    while ((match = regex.exec(s)) !== null) {
        codes.push({
            code: match[2],
            value: match[3]
        })
    }
    const toPassport = (passport: Passport, codeValuePair: CodePair) => {
        passport[codeValuePair.code] = codeValuePair.value;
        return passport;
    }
    return codes.reduce(toPassport, {});
}

export const validatePassport = (passport: Passport) => {
    const keys = Object.keys({cid: 'Fake value', ...passport});
    return keys.filter(key => requiredKeys.indexOf(key) !== -1).length === requiredKeys.length
}
const fourDigits = /^\d\d\d\d$/
export const valueValidators = {
    'byr': (value: string) => fourDigits.test(value) && parseInt(value, 10) >= 1920 && parseInt(value, 10) <= 2002 ,
    'iyr': (value: string) => fourDigits.test(value) && parseInt(value, 10) >= 2010 && parseInt(value, 10) <= 2020 , // (Issue Year)
    'eyr': (value: string) => fourDigits.test(value) && parseInt(value, 10) >= 2020 && parseInt(value, 10) <= 2030  , // (Expiration Year)
    'hgt': (value: string) => // (Height)
        (/^\d\d\dcm$/.test(value) && parseInt(value, 10) >= 150 && parseInt(value, 10) <= 193) ||
        (/^\d\din$/.test(value) && parseInt(value, 10) >= 59 && parseInt(value, 10) <= 76),
    'hcl': (value: string) => /^#[0-9a-f]{6,6}$/.test(value) , // (Hair Color)
    'ecl': (value: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(value) !== -1  , // (Eye Color)
    'pid': (value: string) => /^\d{9,9}$/.test(value) , // (Passport ID)
    'cid': (value: string) => true , // (Country ID)
}


const validatePassportAndValues = (passport: Passport) => {
    if (!validatePassport(passport)) return false;
    const toValidation = (key: string) => valueValidators[key](passport[key]);
    const failedTest = Object
        .keys(passport)
        .map(toValidation)
        .filter(validationResult => !validationResult);
    return failedTest.length === 0;
}

const passports = parseBatch(batch).map(parsePassport);
const validPassports = passports.filter(validatePassport);

console.log(passports.length);
console.log(validPassports.length);

const validPassportsWithValidValues = passports.filter(validatePassportAndValues);
console.log(validPassportsWithValidValues.length);