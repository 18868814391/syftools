export function helloWorld(a:number, b:number) : number {
  return a + b;
}

function timeStamp(date:string) : number {
  // '2015-03-05 17:59:00' 或者 '2015/03/05 17:59:00' 转时间戳
  date = date.substring(0,19);
  date = date.replace(/-/g,'/');
  let timestamp = new Date(date).getTime();
  return timestamp
}

function dateString(timeStamp:string | number) : string {
  // 时间戳转日期字符串
  let stamp:number=Number(timeStamp)
  //输出13位的时间戳
  stamp=String(stamp).length>=12?stamp:stamp * 1000
  let d:Date = new Date(stamp);
  let year:string=String(d.getFullYear())
  let month:string=(d.getMonth()+1)>=10?String(d.getMonth()+1):'0'+String(d.getMonth()+1)
  let day:string=(d.getDate())>=10?String(d.getDate()):'0'+String(d.getDate())
  let hour:string=(d.getHours())>=10?String(d.getHours()):'0'+String(d.getHours())
  let minute:string=(d.getMinutes())>=10?String(d.getMinutes()):'0'+String(d.getMinutes())
  let second:string=(d.getSeconds())>=10?String(d.getSeconds()):'0'+String(d.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

function timeEver(timeData:string) : string {
  //时间格式：'2019-9-13 18:30:00',返回:昨天18：30 /今天/前天
  let stamp:number=timeStamp(timeData) // 先转成时间戳
  let d:Date = new Date() // 当前时间
  let times1 = d.getTime() // 当前时间戳
  let hour1 = d.getHours()
  let minute1 = d.getMinutes()
  let second1 = d.getSeconds()
  let ZeroTime = times1 - hour1 * 3600 * 1000 - minute1 * 60 * 1000 - second1 * 1000 //当天零点的时间戳
  let ZeroTime2 = times1 - hour1 * 3600 * 1000 - minute1 * 60 * 1000 - second1 * 1000-24*60*60*1000 //昨天零点的时间戳
  let ZeroTime3 = times1 - hour1 * 3600 * 1000 - minute1 * 60 * 1000 - second1 * 1000-24*60*60*1000*2 //前天零点的时间
  if(stamp>=ZeroTime){//说明是今天零时后
    // let ddd=`今天${d.Substring(0,10)}`
    return `今天${timeData.substr(10,6)}`
  }else if(stamp>=ZeroTime2){
    return `昨天${timeData.substr(10,6)}`
  }else if(stamp>=ZeroTime3){
    return `前天${timeData.substr(10,6)}`
  }
  else{
    return timeData.substr(0,16)
  }
}

function recentDay(days:number,strict:boolean=false,appoint:string='') : string[] {
  //获取今天开始最近n天的数组
  //当strict为false 输入7  输出['2021-2-19 00:00:00','2021-2-26 23:59:59'] 实际上有8天了 :)
  //当strict为true 输入7 输出['2021-2-19 15:21:15','2021-2-25 15:21:15'] 严格往前推7*24小时 :)
  //appoint 可选参数 指定某天开始往前n天的数组 格式 '2021-2-19 15:21:15'
  if(strict&&!appoint){ //严格计算  且不存在指定时间
    let d:number = new Date().getTime() // 当前时间的时间戳 
    let d2:number=new Date().getTime()-days*24*60*60*1000 // 往前推算的时间戳
    let time1:string=dateString(d)
    let time2:string=dateString(d2)
    return [time2,time1]
  }else if(!strict&&!appoint){ //不严格计算  且不存在指定时间
    let d:number = new Date().getTime() // 当前时间的时间戳 
    let d2:number=new Date().getTime()-days*24*60*60*1000 // 往前推算的时间戳
    let time1:string=dateString(d).substr(0,11)+'23:59:59'
    let time2:string=dateString(d2).substr(0,11)+'00:00:00'
    return [time2,time1]
  }else if(strict&&appoint){ //严格计算  且指定时间
    let appointTime:string=appoint.replace(/-/g,'/');
    let d:number = new Date(appointTime).getTime() // 指定时间的时间戳 
    let d2:number=d-days*24*60*60*1000 // 往前推算的时间戳
    let time1:string=dateString(d)
    let time2:string=dateString(d2)
    return [time2,time1]    
  }else{ //不严格计算  且指定时间
    let appointTime:string=appoint.replace(/-/g,'/');
    let d:number = new Date(appointTime).getTime() // 指定时间的时间戳 
    let d2:number=d-days*24*60*60*1000 // 往前推算的时间戳
    let time1:string=dateString(d).substr(0,11)+'23:59:59'
    let time2:string=dateString(d2).substr(0,11)+'00:00:00'
    return [time2,time1]    
  }
}

function futureDay(days:number,strict:boolean=false,appoint:string='') : string[] {
  //获取未来n天的数组  同recentDay
  if(strict&&!appoint){ //严格计算  且不存在指定时间
    let d:number = new Date().getTime() // 当前时间的时间戳 
    let d2:number=new Date().getTime()+days*24*60*60*1000 
    let time1:string=dateString(d)
    let time2:string=dateString(d2)
    return [time1,time2]
  }else if(!strict&&!appoint){ //不严格计算  且不存在指定时间
    let d:number = new Date().getTime() 
    let d2:number=new Date().getTime()+days*24*60*60*1000 
    let time1:string=dateString(d).substr(0,11)+'23:59:59'
    let time2:string=dateString(d2).substr(0,11)+'00:00:00'
    return [time1,time2]
  }else if(strict&&appoint){ //严格计算  且指定时间
    let appointTime:string=appoint.replace(/-/g,'/');
    let d:number = new Date(appointTime).getTime() 
    let d2:number=d+days*24*60*60*1000 
    let time1:string=dateString(d)
    let time2:string=dateString(d2)
    return [time1,time2]    
  }else{ //不严格计算  且指定时间
    let appointTime:string=appoint.replace(/-/g,'/');
    let d:number = new Date(appointTime).getTime() 
    let d2:number=d+days*24*60*60*1000 
    let time1:string=dateString(d).substr(0,11)+'23:59:59'
    let time2:string=dateString(d2).substr(0,11)+'00:00:00'
    return [time1,time2]    
  }  
}

function numberFormat(value:number) : string{
  // 将整数部分逢三一断
  let f, r
  if ((!value && value != 0) || Number.isNaN(Number(value))) return '--'
  !Number.isInteger(Number(value)) ? ([r, f] = value.toString().split('.')) : (r = value.toString())
  r = r.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (f) {
    return r + '.' + f
  }
  return r  
}

function fromHex(hex:string) : Object{
  //将css的16进制颜色属性值，转变为rgb格式的对像  传入 #ff0000  输出{ b: 0, g: 0, r: 255, a: 1 }
  var t:any = {},
    bits = hex.length == 4 ? 4 : 8,
    mask = (1 << bits) - 1
  let color = Number('0x' + hex.substr(1))
  if (isNaN(color)) {
    return {}
  }
  ['b', 'g', 'r'].forEach(function(x) {
    var c = color & mask
    color >>= bits
    t[x] = bits == 4 ? 17 * c : c
  })
  t.a = 1
  return t  
}

function queryObj(query:string) : Object{
  //将浏览器地址栏的name=liujintao&age=28转成对象  { name: 'liujintao', age: '28' }
  interface qo {
    [key: string]: any
  }    
  let arr:string[]=query.split('&')
  let obj:qo={}
  arr.forEach((v,i,a)=>{
    let arr_s:string[]=v.split('=')
    obj[arr_s[0]]=arr_s[1]
  })
  return obj
}
interface qo {
  [key: string]: any
}   
function queryStr(query:qo) : string{
  //将{ name: 'liujintao', age: '28' }转成name=liujintao&age=28  
  let arr:string[]=[]
  for(let key in query){
    arr.push(`${key}=${query[key]}`)
  }
  return arr.join('&')
}

function syfPlus(num1:number,num2:number) : number{
  //两数精确加法
  let r1:number=0,r2:number=0,m:number=0
  try{
    r1=num1.toString().split(".")[1]?num1.toString().split(".")[1].length:0;
  }catch{
    r1=0
  }
  try{
    r2=num2.toString().split(".")[1]?num2.toString().split(".")[1].length:0;
  }catch{
    r2=0
  }
  m=Math.pow(10, Math.max(r1, r2));
  return (num1 * m + num2 * m) / m;
}

function syfMinus(num1:number,num2:number) : number{
  //两数精确减法
  let r1:number=0,r2:number=0,m:number=0,n:number=0
  try{
    r1=num1.toString().split(".")[1]?num1.toString().split(".")[1].length:0;
  }catch{
    r1=0
  }
  try{
    r2=num2.toString().split(".")[1]?num2.toString().split(".")[1].length:0;
  }catch{
    r2=0
  }
  m=Math.pow(10,Math.max(r1, r2))
  n=(r1>=r2)?r1:r1
  return Number(((num1 * m - num2 * m) / m).toFixed(n))
}

function syfTimes(num1:number,num2:number) : number{
  //两数精确乘法
  let m:number=0
  let s1:string=num1.toString()
  let s2:string=num2.toString()
  try{
    m+=s1.split(".")[1]?s1.split(".")[1].length:0
  }catch(e){
    console.log(e)
  }
  try{
    m+=s2.split(".")[1]?s2.split(".")[1].length:0
  }catch(e){
    console.log(e)
  }
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

function syfdivide(num1:number,num2:number) : number{
  //两数精确除法
  let t1:number=0,t2:number=0,r1:number=0,r2:number=0
  try{
    t1=num1.toString().split(".")[1]?num1.toString().split(".")[1].length:0
  }catch(e){

  }
  try{  
    t2=num2.toString().split(".")[1]?num2.toString().split(".")[1].length:0
  }catch(e){

  }
  r1=Number(num1.toString().replace(".",""))
  r2=Number(num2.toString().replace(".",""))
  return syfTimes((r1/r2),Math.pow(10,t2-t1))
}

function getParams(key:string,url:string) : string{
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
  if (!url) {
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
  } else {
    let r = url.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
  }
  return ''
}

function debounce (func:any, wait:number, immediate:boolean) : any {
  let timeout:any, args:any, context:any, timestamp:any, result:any
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...args:any) {
    // @ts-ignore
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}


export {
  timeStamp,
  dateString,
  timeEver,
  recentDay,
  futureDay,
  numberFormat,
  fromHex,
  queryObj,
  queryStr,
  syfPlus,
  syfMinus,
  syfTimes,
  syfdivide,
  getParams,
  debounce
}