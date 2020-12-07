import {parseBatch, parsePassport, validatePassport, valueValidators} from './day-04';

const miniBatch =
`cid:282 hcl:#888785 hgt:170cm ecl:oth eyr:2029
byr:1942 pid:014356555
iyr:2020

byr:1966 hcl:#623a2f ecl:oth hgt:165cm
eyr:2028 iyr:2012 pid:558908746

pid:#4f5b92
hcl:#6b5442 hgt:188cm
byr:1994 iyr:2014 cid:127 eyr:2020
ecl:oth`

const passwords = parseBatch(miniBatch);
const isOk = passwords.length === 3;

console.log(parsePassport(passwords[0]))

console.log(passwords);
console.log(isOk);

console.log(validatePassport({
    pid:'185583837',
    iyr:'2018',
    // cid:'281',
    byr:'2004',
    hcl:'#06a58b',
    eyr:'2033',
    ecl:'zzz',
    hgt:'76cm',
}))

console.log(valueValidators['pid']('123456789'))
console.log(valueValidators['iyr']('2010'))
console.log(valueValidators['cid'](undefined))
console.log(valueValidators['byr']('2003'))
console.log(valueValidators['hcl']('#123f56'))
console.log(valueValidators['eyr']('2031'))
console.log(valueValidators['ecl']('oth'))
console.log(valueValidators['hgt']('76in'))
