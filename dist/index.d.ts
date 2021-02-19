export declare function helloWorld(a: number, b: number): number;
declare function timeStamp(date: string): number;
declare function dateString(timeStamp: string | number): string;
declare function timeEver(timeData: string): string;
declare function recentDay(days: number, strict?: boolean, appoint?: string): string[];
declare function futureDay(days: number, strict?: boolean, appoint?: string): string[];
declare function numberFormat(value: number): string;
declare function fromHex(hex: string): Object;
export { timeStamp, dateString, timeEver, recentDay, futureDay, numberFormat, fromHex };
