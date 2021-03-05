# 安装
npm install syftools --save
# 使用
import * as syftools from syftools; //全部引入

import { timeStamp } from syftools; //按需引入
# 功能
1、timeStamp(date:string) : number

  //'2015-03-05 17:59:00' 或者 '2015/03/05 17:59:00' 转时间戳

2、dateString(timeStamp:string | number) : string

  //时间戳转日期字符串

3、timeEver(timeData:string) : string 

  //时间格式：'2019-9-13 18:30:00',返回:昨天18：30 /今天/前天

4、recentDay(days:number,strict:boolean=false,appoint:string='') : string[] 

  //获取今天开始最近n天的数组

  //当strict为false 输入7  输出['2021-2-19 00:00:00','2021-2-26 23:59:59'] 实际上有8天了 :)

  //当strict为true 输入7 输出['2021-2-19 15:21:15','2021-2-25 15:21:15'] 严格往前推7*24小时 :)
  
  //appoint 可选参数 指定某天开始往前n天的数组 格式 '2021-2-19 15:21:15'

5、futureDay(days:number,strict:boolean=false,appoint:string='') : string[]

  //获取未来n天的数组  同recentDay

6、numberFormat(value:number) : string

  // 将整数部分逢三一断

7、fromHex(hex:string) : Object

  //将css的16进制颜色属性值，转变为rgb格式的对像  传入 #ff0000  输出{ b: 0, g: 0, r: 255, a: 1 }

8、queryObj(query:string) : Object

  //将浏览器地址栏的name=liujintao&age=28转成对象  { name: 'liujintao', age: '28' }

9、queryStr(query:qo) : string

  //将{ name: 'liujintao', age: '28' }转成name=liujintao&age=28  

10、syfPlus(num1:number,num2:number) : number

  //两数精确加法

11、syfMinus(num1:number,num2:number) : number

  //两数精确减法

12、syfTimes(num1:number,num2:number) : number

  //两数精确乘法

13、syfdivide(num1:number,num2:number) : number

  //两数精确除法
  
14、getParams(key:string,url:string) : string

  //从地址栏获取指定key的值  不传url为从window.location.search中获取

15、debounce (func:any, wait:number, immediate:boolean) : any
  // 防抖