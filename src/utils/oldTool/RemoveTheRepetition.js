const Dictionary = {
    object: "[object Object]",
    string: "[object String]",
    array: "[object Array]",
    boolean: "[object Boolean]"
}

const judgeType = (data) => {
    return Object.prototype.toString.call(data)
}

export const removeRepeat = (beforeArr, afterArr, options) => {
    let [tempAr, tempArr] = [[], []]
    if (beforeArr === undefined || afterArr === undefined || options === undefined || options.key === undefined || options.removeString === undefined) {
        throw new Error('参数传递错误')
    }
    if (judgeType(beforeArr) !== Dictionary.array ||
        judgeType(afterArr) !== Dictionary.array ||
        judgeType(options.key) !== Dictionary.string ||
        judgeType(options.removeString) !== Dictionary.boolean) {
        throw new Error('请传递对应类型参数')
    }
    tempAr = beforeArr.map(res => {
        if (judgeType(res) === Dictionary.object) {
            return res[options.key]
        }
    }).filter(res => res !== undefined)
    if (options.removeString) {
        tempArr = beforeArr.map(res => {
            if (judgeType(res) === Dictionary.string && options.removeString) {
                return res
            }
        }).filter(res => res !== undefined)
    }
    afterArr = afterArr.filter(res => {
        if (options.removeString) {
            if (judgeType(res) === Dictionary.object) {
                return !tempAr.includes(res[options.key])
            }
            if (judgeType(res) === Dictionary.string) {
                return !tempArr.includes(res)
            }
        } else {
            return !tempAr.includes(res[options.key])
        }
    })
    return afterArr
}






