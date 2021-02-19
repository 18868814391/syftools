'use strict';
const expect = require('chai').expect;
const helloWorld = require('../dist/index').helloWorld;
const timeStamp=require('../dist/index').timeStamp;
const dateString=require('../dist/index').dateString;
const timeEver=require('../dist/index').timeEver;
const recentDay=require('../dist/index').recentDay;
const futureDay=require('../dist/index').futureDay;
const numberFormat=require('../dist/index').numberFormat;
const fromHex=require('../dist/index').fromHex;

// describe('syf function test_add', () => {
//   it('test_add', () => {
//     const result = helloWorld('hello', 'world');
//     expect(result).to.equal('helloworld');
//   });
// });

// describe('syf function test_timeStamp', () => {
//   it('test_timeStamp', () => {
//     const result = timeStamp('2015-03-05 17:59:00');
//     expect(result).to.equal(1425549540000);
//   });
// });

// describe('syf function test_dateString', () => {
//   it('test_dateString', () => {
//     const result = dateString(1425549540000);
//     expect(result).to.equal('2015-03-05 17:59:00');
//   });
// });

// describe('syf function test_timeEver', () => {
//   it('test_timeEver', () => {
//     const result = timeEver('2021-02-19 13:43:01');
//     expect(result).to.equal('今天 13:43');
//   });
// });

// describe('syf function test_recentDay', () => {
//   it('test_recentDay', () => {
//     const result = recentDay(7,false,'2020-5-20 15:21:15');
//     console.log(result)
//   });
// });

// describe('syf function test_futureDay', () => {
//   it('test_futureDay', () => {
//     const result = futureDay(7,true);
//     console.log(result)
//   });
// });

// describe('syf function test_numberFormat', () => {
//   it('test_numberFormat', () => {
//     const result = numberFormat(152634.23);
//     console.log(result)
//   });
// });

describe('syf function test_fromHex', () => {
  it('test_fromHex', () => {
    const result = fromHex('#ff0000');
    console.log(result)
  });
});