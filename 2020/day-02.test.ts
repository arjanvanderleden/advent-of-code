import { onSecondRuleMatch } from './day-02';

const matchingPasswords =[{
  min: 1,
  max: 2,
  char: 'a',
  password: 'ab'
    }, {
    min: 1,
    max: 3,
    char: 'a',
    password: 'bba'
  }, {
    min: 1,
    max: 3,
    char: 'a',
    password: 'bba'
  }]

const notMatchingpasswords = [{
    min: 1,
    max: 3,
    char: 'a',
    password: 'bbb'
  },
  {
    min: 1,
    max: 3,
    char: 'a',
    password: 'aaa'
  },
  {
    min: 1,
    max: 3,
    char: 'a',
    password: ''
  }

]

const isOk = matchingPasswords.filter(onSecondRuleMatch).length === matchingPasswords.length
const isAlsoOk = notMatchingpasswords.filter(onSecondRuleMatch).length === 0;
console.log(isOk);
console.log(isAlsoOk);