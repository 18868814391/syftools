"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function syfConvert2Echarts(json) {
    var results = '';
    json.UTF8Encoding = true;
    var features = json.features;
    if (!features) {
        console.warn('请输入合法的地图信息http://datav.aliyun.com/tools/atlas/index.html');
        return;
    }
    features.forEach(function (feature) {
        var encodeOffsets = feature.geometry.encodeOffsets = [];
        var coordinates = feature.geometry.coordinates;
        if (feature.geometry.type === 'Polygon') {
            coordinates.forEach(function (coordinate, idx) {
                coordinates[idx] = encodePolygon(coordinate, encodeOffsets[idx] = []);
            });
        }
        else if (feature.geometry.type === 'MultiPolygon') {
            coordinates.forEach(function (polygon, idx1) {
                encodeOffsets[idx1] = [];
                polygon.forEach(function (coordinate, idx2) {
                    coordinates[idx1][idx2] = encodePolygon(coordinate, encodeOffsets[idx1][idx2] = []);
                });
            });
        }
        else if (feature.geometry.type === 'MultiLineString') {
            coordinates.forEach(function (coordinate, idx) {
                coordinates[idx] = encodePolygon(coordinate, encodeOffsets[idx] = []);
            });
        }
    });
    results = JSON.stringify(json);
    return results;
}
function encodePolygon(coordinate, encodeOffsets) {
    if (coordinate.length === 0)
        return;
    var result = '';
    var prevX = quantize(coordinate[0][0]);
    var prevY = quantize(coordinate[0][1]);
    encodeOffsets[0] = prevX;
    encodeOffsets[1] = prevY;
    for (var i = 0; i < coordinate.length; i++) {
        var point = coordinate[i];
        result += encode(point[0], prevX);
        result += encode(point[1], prevY);
        prevX = quantize(point[0]);
        prevY = quantize(point[1]);
    }
    return result;
}
function encode(val, prev) {
    val = quantize(val);
    val = val - prev;
    if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
        val--;
    }
    val = (val << 1) ^ (val >> 15);
    return String.fromCharCode(val + 64);
}
function quantize(val) {
    return Math.ceil(val * 1024);
}
exports.default = syfConvert2Echarts;
