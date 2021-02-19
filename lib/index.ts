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

export {
  timeStamp,
  dateString,
  timeEver,
  recentDay,
  futureDay,
  numberFormat,
  fromHex
}