// *节流&&防抖
// *第一个参数为被执行函数，第二个参数设置时间，第三个参数为所传参数

export const debounce = (fn, mustApplyTime = 1000, data) => {
    fn.timer && clearTimeout(fn.timer);
    fn._cur = Date.now();
    fn._start = fn._start || fn._cur
    if (fn._cur - fn._start > mustApplyTime) {
        fn(data);
        fn._start = fn._cur;
    } else {
        fn.timer = setTimeout(() => {
            fn(data);
        }, mustApplyTime);
    }
}
