// *对象的非空校验，第一个参数为对象本身，后续参数为对象内部的键名
// !注意替换message组件

import { Message } from 'element-ui'

const DetectBlank = (obj, ...keys) => {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        throw new TypeError(`第一个参数类型错误，请输入Object类型,当前参数类型为${Object.prototype.toString.call(obj).slice(8, -1)}`)
    }
    for (let i of Object.keys(obj)) {
        if (keys.length !== 0) {
            for (let [r, item] of keys.entries()) {
                if (Object.prototype.toString.call(item) !== '[object String]') {
                    throw new TypeError(`第${r + 2}个参数类型错误，请输入String类型,当前参数类型为${Object.prototype.toString.call(item).slice(8, -1)}`)
                }
                if (i === item && obj[i] === "") {
                    Message({
                        message: `请填写必填项`,
                        type: "error"
                    });
                    throw new TypeError(`${item}信息为空，已阻止用户`)
                }
            }
        } else {
            if (obj[i] === '') {
                Message({
                    message: `请填写必填项`,
                    type: "error"
                });
                throw new TypeError(`${i}为空`)
            }
        }
    }
}

export {
    DetectBlank
}