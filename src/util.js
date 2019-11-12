export function test(){
    
}
//重复功能,计算传入的日期在重复标准后的日子
export function repeatDate(date, repeatcycle) {
    if (repeatcycle == '不重复') {
        return date;
    }
    let text = repeatcycle.split('重复')[0].split('每')[1];//这个是要重复的周期，是 天，周，月，年或者num天，num周，num月，num年
    let num = 0;
    if (text.indexOf('天') != -1) {
        num = text.split('天').join('') != '' > 1 ? text.split('天')[0] : 1;
        return getAfterDayDate(date, num);
    } else if (text.indexOf('周') != -1) {
        num = text.split('周').join('') != '' ? text.split('周')[0] : 1;
        return getAfterWeekDate(date, num);
    } else if (text.indexOf('月') != -1) {
        num = text.split('月').join('') != '' ? text.split('月')[0] : 1;
        return getAfterMonthDate(date, num);
    } else if (text.indexOf('年') != -1) {
        num = text.split('年').join('') != '' ? text.split('年')[0] : 1;
        let afterYear = date.split('-')[0] * 1 + num * 1;
        return afterYear + '-' + date.split('-')[1] + '-' + date.split('-')[2];
    }

}

export function getAfterDayDate(date, num) {
    //日期，num重复间隙，distanceTodayNum到今天的天数
    let distanceTodayNum = getDiffDate(date).dayNum;
    date = new Date(date.replace(/-/ig, '/'));
    let cycles = Math.ceil(distanceTodayNum / num)
    let standard = 1000 * 60 * 60 * 24 * num * cycles;
    date = + date + standard;
    let repeatAfterDate = new Date(date);
    let str = repeatAfterDate.getFullYear() + '-' + (repeatAfterDate.getMonth() + 1) + '-' + repeatAfterDate.getDate();
    return str
}
export function getAfterWeekDate(date, num) {
    let distanceTodayNum = getDiffDate(date).dayNum;
    date = new Date(date.replace(/-/ig, '/'));
    let cycles = Math.ceil(distanceTodayNum / 7 / num * 1)
    let standard = 1000 * 60 * 60 * 24 * 7 * num * 1 * cycles;
    date = + date + standard;
    let repeatAfterDate = new Date(date);
    let str = repeatAfterDate.getFullYear() + '-' + (repeatAfterDate.getMonth() + 1) + '-' + repeatAfterDate.getDate();
    return str
}
export function getAfterMonthDate(date, num) {
    date = new Date(date.replace(/-/ig, '/'));
    // 因为getMonth()获取的月份的值只能在0~11之间所以我们在进行setMonth()之前先给其减一
    date.setMonth((date.getMonth()) + num * 1);
    var yy1 = date.getFullYear();
    var mm1 = date.getMonth() + 1;
    //console.log(mm1);
    var dd1 = date.getDate();
    return yy1 + '-' + mm1 + '-' + dd1;
}
//获取指定日期的月份有多少天
export function getCountDays(date) {
    var curDate = new Date(date);
    /* 获取当前月份 */
    var curMonth = curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    /* 将日期设置为0, 是为了通过下一个月份日期获取当前月份日期的最后一天日期 */
    curDate.setDate(0);
    /* 是为了返回当前月份日期的最后一天，即当前月份的天数 */
    return curDate.getDate();
}


//数组深拷贝
export function arr_slice_deep_copy(arr) {
    return arr.slice(0);
}


//插入排序
export function insert_sort(arr, isPast) {
    var len = arr.length;
    var temp, j;
    for (var i = 1; i <= len - 1; i++) {
        temp = arr[i];
        j = i;
        if (isPast) {
            while (j > 0 && new Date((arr[j - 1].date).replace(/-/ig, '/')).getTime() <= new Date((temp.date).replace(/-/ig, '/')).getTime()) {
                arr[j] = arr[j - 1];
                j--;
            }
        } else {
            while (j > 0 && new Date((arr[j - 1].date).replace(/-/ig, '/')).getTime() >= new Date((temp.date).replace(/-/ig, '/')).getTime()) {
                arr[j] = arr[j - 1];
                j--;
            }
        }

        arr[j] = temp;
    }
    return arr;
}


//获取今天的日期
export function getTodayDate(targetDate) {
    let year, month, day = '';
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    day = new Date().getDate();
    return {
        year: year,
        month: month,
        day: day
    }
}

//计算日期差
export function get_time_diff(date) {
    var diff = '';
    var time=new Date(date.replace(/-/ig, '/')).getTime()
    var time_diff = time - new Date().getTime(); //时间差的毫秒数 

    //计算出相差天数 
    var days = Math.floor(time_diff / (24 * 3600 * 1000));
    if (days > 0) {
        diff += days + '天';
    }
    //计算出小时数 
    var leave1 = time_diff % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours > 0) {
        diff += hours + '小时';
    } else {
        if (diff !== '') {
            diff += hours + '小时';
        }
    }
    //计算相差分钟数 
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes > 0) {
        diff += minutes + '分';
    } else {
        if (diff !== '') {
            diff += minutes + '分';
        }
    }
    //计算相差秒数 
    var leave3 = leave2 % (60 * 1000);
    var seconds = Math.round(leave3 / 1000);
    if (seconds > 0) {
        diff += seconds + '秒';
    } else {
        if (diff !== '') {
            diff += seconds + '秒';
        }
    }
    //setTimeout(get_time_diff(date),1000)
    return diff;
}	
//计算到今天的天数
export function getDiffDate(targetDate) {
    let result = {};
    let date1 = new Date(targetDate.replace(/-/ig, '/'));
    let date2 = new Date();
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = date2.getTime() - date1.getTime();
    const diffDate = diff / (24 * 60 * 60 * 1000);
    if (diffDate == 0) {//今天
        result = {
            text: '就是今天',
            dayNum: 0,
            diff:diff
        }
    } else if (diffDate > 0) {//过去
        result = {
            text: '已过去',
            dayNum: diffDate,
            diff:diff
        }
    } else {//还没到
        result = {
            text: '还有',
            dayNum: Math.abs(diffDate),
            diff:diff
        }
    }
    //setTimeout("showtime()",1000);
    //setTimeout(getDiffDate(targetDate), 1000);
    return result;
}


//计算星期
export function getDay(date) {
    var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var index = new Date(date.replace(/-/ig, '/')).getDay();
    var week = weekArray[index];
    return week;
}


//获取农历日期
var lunar = {
    tg: '甲乙丙丁戊己庚辛壬癸',
    dz: '子丑寅卯辰巳午未申酉戌亥',
    number: '一二三四五六七八九十',
    year: '鼠牛虎兔龙蛇马羊猴鸡狗猪',
    month: '正二三四五六七八九十冬腊',
    monthadd: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    calendar: [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95]
};
export function getLunarDate(date) {
    var year, month, day;
    if (!date) {
        date = new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate();
    } else {
        date = date.split('-'), year = parseInt(date[0]), month = date[1] - 1, day = parseInt(date[2]);
    }

    if (year < 1921 || year > 2020) {
        return {}
    }

    var total, m, n, k, bit, lunarYear, lunarMonth, lunarDay;
    var isEnd = false;
    var tmp = year;
    if (tmp < 1900) {
        tmp += 1900;
    }
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + lunar.monthadd[month] + day - 38;
    if (year % 4 == 0 && month > 1) {
        total++;
    }
    for (m = 0; ; m++) {
        k = (lunar.calendar[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            bit = (lunar.calendar[m] >> n) & 1;
            if (total <= 29 + bit) {
                isEnd = true;
                break;
            }
            total = total - 29 - bit;
        }
        if (isEnd) break;
    }
    lunarYear = 1921 + m;
    lunarMonth = k - n + 1;
    lunarDay = total;
    if (k == 12) {
        if (lunarMonth == Math.floor(lunar.calendar[m] / 0x10000) + 1) {
            lunarMonth = 1 - lunarMonth;
        }
        if (lunarMonth > Math.floor(lunar.calendar[m] / 0x10000) + 1) {
            lunarMonth--;
        }
    }

    return {
        lunarYear: lunarYear,
        lunarMonth: lunarMonth,
        lunarDay: lunarDay,
    };
}


export function getLunarDateString(lunarDate) {
    if (!lunarDate.lunarDay) return;
    var data = {},
        lunarYear = lunarDate.lunarYear,
        lunarMonth = lunarDate.lunarMonth,
        lunarDay = lunarDate.lunarDay,
        dateStr = '';

    data.tg = lunar.tg.charAt((lunarYear - 4) % 10);
    data.dz = lunar.dz.charAt((lunarYear - 4) % 12);
    data.year = lunar.year.charAt((lunarYear - 4) % 12);
    data.month = lunarMonth < 1 ? '(闰)' + lunar.month.charAt(-lunarMonth - 1) : lunar.month.charAt(lunarMonth - 1);

    data.day = (lunarDay < 11) ? "初" : ((lunarDay < 20) ? "十" : ((lunarDay < 30) ? "廿" : "三十"));
    if (lunarDay % 10 != 0 || lunarDay == 10) {
        data.day += lunar.number.charAt((lunarDay - 1) % 10);
    }
    dateStr = data.tg + data.dz + '年' + data.month + '月' + data.day;
    return dateStr;
}