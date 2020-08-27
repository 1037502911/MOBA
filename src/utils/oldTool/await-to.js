// *处理await 异常请求

export const to = (promise) => {
    return promise.then(res => {
        return [null, res]
    }).catch(err => {
        return [err]
    })
}