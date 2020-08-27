const arrCookie = document.cookie.split(';')

const Dictionary = {
    object: "[object Object]",
    string: "[object String]",
    array: "[object Array]",
    boolean: "[object Boolean]",
    number: "[object Number]"
}

const judgeType = (data) => {
    return Object.prototype.toString.call(data)
}

export const getCookieById = (name) => {
    let [objCookie, strCookie] = [{}, null]
    const nameLength = name.length

    arrCookie.forEach(res => {
        if (res.split('=')[0].trim() === name) {
            if (res.split('=').length > 2) {
                res = res.slice(nameLength + 2)
                res.split('&').forEach(item => {
                    objCookie[item.split('=')[0]] = item.split('=')[1]
                })
            } else {
                strCookie = res.split('=')[1]
            }
        }
    })

    if (JSON.stringify(objCookie) !== "{}") {
        return objCookie
    } else if (strCookie !== null) {
        return strCookie
    }
}

export const setCookie = (name, value, time, domian = '', path = '') => {
    const [exp, Domian, Path] = [new Date(), `;domain=${domian}`, `;path=${path}`]
    let [str, num, maxAge, Exp] = ["", -1, "", null]

    if (judgeType(name) !== Dictionary.string || (judgeType(value) !== Dictionary.object && judgeType(value) !== Dictionary.string && judgeType(value) !== Dictionary.number)) {
        throw new TypeError('参数类型错误')
    }

    if (time) {
        if (judgeType(time) !== Dictionary.object) {
            throw new TypeError('参数类型错误')
        } else {
            if (time.maxAge && judgeType(time.maxAge) === Dictionary.number) {
                maxAge = `;Max-Age=${time.maxAge}`
            } else if (!time.maxAge) {
                if (time.day && judgeType(time.day) === Dictionary.number) {
                    exp.setTime(exp.getTime() + time.day * 24 * 60 * 60 * 1000)
                }
                if (time.hour && judgeType(time.hour) === Dictionary.number) {
                    exp.setTime(exp.getTime() + time.hour * 60 * 60 * 1000)
                }
                if (time.minute && judgeType(time.minute) === Dictionary.number) {
                    exp.setTime(exp.getTime() + time.minute * 60 * 1000)
                }
                if (time.second && judgeType(time.second) === Dictionary.number) {
                    exp.setTime(exp.getTime() + time.second * 1000)
                }
                if (exp.toGMTString() !== new Date().toGMTString()) {
                    Exp = `;Expires=${exp.toGMTString()}`
                }
            }
        }
    }

    if (judgeType(value) === Dictionary.object) {
        for (let i in value) {
            if (judgeType(value[i]) !== Dictionary.number && judgeType(value[i]) !== Dictionary.string) {
                throw new TypeError('参数类型错误')
            }
            num++;
            if (num === 0) {
                str = `${name}=${i}=${value[i]}`
            } else {
                str = `${str}&${i}=${value[i]}`
            }
        }
    } else {
        str = `${name}=${value}`
    }

    if (maxAge !== "") {
        document.cookie = `${str}${maxAge}${Domian}${Path}`
    } else if (Exp !== null) {
        document.cookie = `${str}${Exp}${Domian}${Path}`
    } else {
        document.cookie = `${str}${Domian}${Path}`
    }
}

export const clearCookie = (name, domian = '', path = '') => {
    const keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (name) {
        document.cookie = `${name}=null;Max-Age=0;domain=${domian};path=${path}`
    } else {
        keys.forEach(res => {
            document.cookie = `${res}=null;Max-Age=0;domain=${domian};path=${path}`
        })
    }
}