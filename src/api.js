export function history(date,key){
    return `http://v.juhe.cn/todayOnhistory/queryEvent.php?key=${key}&date=${date}`;
}
export function calendar(year,key){
    return `http://v.juhe.cn/calendar/year?year=${year}&key=${key}`;
}
export function ChinaCalendar(date,key){
    return `http://v.juhe.cn/laohuangli/d?date=${date}&key=${key}`;
}
export function weather(city,key){
    return `http://apis.juhe.cn/simpleWeather/query?city=${city}&key=${key}`;
}
export function baiduMap(baiduAK,latitude,longitude){
    return `http://api.map.baidu.com/reverse_geocoding/v3/?ak=${baiduAK}&output=json&location=${latitude},${longitude}`;
}

export function baiduMapAddress(baiduAK,coor){
    return `https://api.map.baidu.com/location/ip?ip=&ak=${baiduAK}&coor = ${coor}`;
}