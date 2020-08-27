// *返回日期
export const getDay = (day = 0, hour = 0, farmat = "yyyy-MM-dd HH:mm:ss", setTime) => {
    if (parseFloat(day).toString() === "NaN" || parseFloat(hour).toString() === "NaN") {
        throw new Error("请输入整数")
    } else if (parseFloat(day).toString().includes('.') || parseFloat(hour).toString().includes('.')) {
        throw new Error("请输入整数")
    }
    let targetDay_time = null;
    setTime !== undefined ? targetDay_time = setTime : targetDay_time = new Date().getTime() + 1000 * 60 * 60 * 24 * Number(day) + 1000 * 60 * 60 * Number(hour);
    const tyear = mapTime(targetDay_time).tyear
    const tMonth = mapTime(targetDay_time).tMonth
    const tDate = mapTime(targetDay_time).tDate
    const tHours = mapTime(targetDay_time).tHours
    const tMinutes = mapTime(targetDay_time).tMinutes
    const tSecounds = mapTime(targetDay_time).tSecounds
    const timeArr = [{
        Double: "yyyy",
        real: tyear
    }, {
        Double: "MM",
        real: tMonth
    }, {
        Double: "dd",
        real: tDate
    }, {
        Double: "HH",
        real: tHours
    }, {
        Double: "mm",
        real: tMinutes
    }, {
        Double: "ss",
        real: tSecounds
    }]
    timeArr.forEach(res => {
        farmat = myReplace(farmat, res.Double, res.real)
    })
    return farmat
}

// *处理时间戳
const mapTime = (time) => {
    const today = new Date()
    today.setTime(time)
    return {
        tyear: today.getFullYear(),
        tMonth: formatTime(today.getMonth() + 1),
        tDate: formatTime(today.getDate()),
        tHours: formatTime(today.getHours()),
        tMinutes: formatTime(today.getMinutes()),
        tSecounds: formatTime(today.getSeconds()),
    }
}

// *数据归零补全
const formatTime = (time) => {
    if (time.toString().length === 1) {
        return `0${time}`
    }
    return time
}

// *处理格式
const myReplace = (str, Double, real) => {
    const reg = new RegExp(Double, 'g')
    str = str.replace(reg, real)
    return str
}

// *获取星期几
export const getDateWeek = (date) => {
    const day = new Date(Date.parse(date));
    const today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    const week = today[day.getDay()];
    return week;
}

// *获取一年内所有周
export const allWeek = (year = new Date().getFullYear(), farmat = 'yyyy-MM-dd HH:mm:ss') => {
    const weeks = [];
    let allDay = 0;
    ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0) ? allDay = 366 : allDay = 365
    let firstTime = new Date(year, 0, 1)
    const firstDay = Number(firstTime.getDay())
    const day = 6 - (firstDay + 6) % 7
    firstTime.setDate(firstTime.getDate() + day)
    const surplusTime = allDay - (day + 1)
    for (let i = 0; i < Number(Math.ceil(surplusTime / 7)); i++) {
        firstTime = new Date(year, 0, 1)
        weeks.push({
            start: null,
            end: null
        })
        weeks[i].start = getDay(0, 0, farmat, firstTime.setDate(firstTime.getDate() + 1 + 7 * i + day))
        firstTime = new Date(year, 0, 1)
        if (i < Number(Math.ceil(surplusTime / 7)) - 1) {
            weeks[i].end = getDay(0, 0, farmat, firstTime.setDate(firstTime.getDate() + (7 * (i + 1)) + day))
        } else {
            if (surplusTime % 7 !== 0) {
                weeks[i].end = getDay(0, 0, farmat, firstTime.setDate(firstTime.getDate() + surplusTime % 7 + i * 7 + day))
            } else {
                weeks[i].end = getDay(0, 0, farmat, firstTime.setDate(firstTime.getDate() + (7 * (i + 1)) + day))
            }
        }
    }
    firstTime = new Date(year, 0, 1)
    weeks.unshift({
        start: getDay(0, 0, farmat, firstTime.getTime()),
        end: null
    })
    firstTime = new Date(year, 0, 1 + day)
    weeks[0].end = getDay(0, 0, farmat, firstTime.getTime())
    return weeks
}

// *未完成全部功能（暂时只能获取今天是今年的第几周）
export const theWeek = () => {
    var totalDays = 0;
    var now = new Date();
    var years = now.getYear()
    if (years < 1000) {
        years += 1900
    }
    var days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;
    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29
    } else {
        days[1] = 28
    }
    if (now.getMonth() == 0) {
        totalDays = totalDays + now.getDate();
    } else {
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    //得到第几周
    var week = Math.round(totalDays / 7);
    return week;
}