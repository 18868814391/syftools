function syfConvert2Echarts(json:any):any{
  let results = ''
  json.UTF8Encoding = true
  let features = json.features
  if (!features) {
    console.warn('请输入合法的地图信息http://datav.aliyun.com/tools/atlas/index.html')
    return
  }
  features.forEach(function (feature:any) {
    let encodeOffsets:any = feature.geometry.encodeOffsets = []
    let coordinates:any = feature.geometry.coordinates
    if (feature.geometry.type === 'Polygon') {
      coordinates.forEach(function (coordinate:any, idx:any) {
        coordinates[idx] = encodePolygon(
          coordinate, encodeOffsets[idx] = []
        )
      })
    } else if (feature.geometry.type === 'MultiPolygon') {
      coordinates.forEach(function (polygon:any, idx1:any) {
        encodeOffsets[idx1] = []
        polygon.forEach(function (coordinate:any, idx2:any) {
          coordinates[idx1][idx2] = encodePolygon(
            coordinate, encodeOffsets[idx1][idx2] = []
          )
        })
      })
    } else if (feature.geometry.type === 'MultiLineString') {
      coordinates.forEach(function (coordinate:any, idx:any) {
        coordinates[idx] = encodePolygon(
          coordinate, encodeOffsets[idx] = []
        )
      })
    }
  })
  results = JSON.stringify(json)
  return results
}

function encodePolygon (coordinate:any, encodeOffsets:any) {
if (coordinate.length === 0) return
let result = ''
let prevX = quantize(coordinate[0][0])
let prevY = quantize(coordinate[0][1])
encodeOffsets[0] = prevX
encodeOffsets[1] = prevY
for (let i = 0; i < coordinate.length; i++) {
  let point = coordinate[i]
  result += encode(point[0], prevX)
  result += encode(point[1], prevY)
  prevX = quantize(point[0])
  prevY = quantize(point[1])
}
return result
}

function encode (val:any, prev:any) {
val = quantize(val)
val = val - prev
if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
  val--
}
val = (val << 1) ^ (val >> 15)
return String.fromCharCode(val + 64)
}

function quantize (val:any) {
return Math.ceil(val * 1024)
}
export default syfConvert2Echarts;