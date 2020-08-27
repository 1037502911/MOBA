import request from '@/utils/axios'

// *获取分类列表
export const getCatetoryList = () => {
    return request.get({
        url: "/categories/list"
    })
}