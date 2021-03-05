export declare function helloWorld(a: number, b: number): number;
declare function timeStamp(date: string): number;
declare function dateString(timeStamp: string | number): string;
declare function timeEver(timeData: string): string;
declare function recentDay(days: number, strict?: boolean, appoint?: string): string[];
declare function futureDay(days: number, strict?: boolean, appoint?: string): string[];
declare function numberFormat(value: number): string;
declare function fromHex(hex: string): Object;
declare function queryObj(query: string): Object;
interface qo {
    [key: string]: any;
}
declare function queryStr(query: qo): string;
declare function syfPlus(num1: number, num2: number): number;
declare function syfMinus(num1: number, num2: number): number;
declare function syfTimes(num1: number, num2: number): number;
declare function syfdivide(num1: number, num2: number): number;
declare function getParams(key: string, url: string): string;
declare function debounce(func: any, wait: number, immediate: boolean): any;
export { timeStamp, dateString, timeEver, recentDay, futureDay, numberFormat, fromHex, queryObj, queryStr, syfPlus, syfMinus, syfTimes, syfdivide, getParams, debounce };
