import { priceToCents } from '../scripts/utility/price.js'

console.log('TEST SUITE: Price of items from cents to dollars');


console.log('TEST #1:converts into dollars?');


if (priceToCents(2095) === 20.95) {
    console.log('Passed')
}else{
    console.log('Failed')
};


console.log('TEST #2: Works with 0?');

if (priceToCents(0) === 0) {
    console.log('Passed');
}else{
    console.log('Failed')
};

console.log('TEST #3: Rounds to the nearest cent?');

if (priceToCents(2000.5) === 20.01) {
    console.log('Passed');
}else{
    console.log('Failed')
};