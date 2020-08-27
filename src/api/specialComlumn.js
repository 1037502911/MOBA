import request from '@/utils/axios'


// *获取分类模块
export const getSpecialComlumnList = () => {
    return request.get({
        url: "/specialColumns/list"
    })
}

// *新增分类
export const saveCategoryList = (option) => {
    return request.json({
        data: option,
        url: "/categories/add",
    })
}