import axios from 'axios'
import { Message } from 'element-ui'
import { getCookieById } from "@/utils/oldTool/cookie-js"

class HttpRequest {
    constructor() {
        this.baseURL = process.env.VUE_APP_DEV_API
        this.token = getCookieById('token_ark')
    }
    interceptors(instance) {
        instance.interceptors.request.use(
            config => {
                config.baseURL = this.baseURL
                config.headers.Authorization = `bearer ${this.token}`
                return config
            },
            err => {
                return Promise.reject(err)
            }
        )
        instance.interceptors.response.use(
            res => {
                if (res.data.code === 200) {
                    return Promise.resolve(res.data)
                }
            },
            err => {
                Message({
                    type: "error",
                    message: '请求失败'
                })
                return Promise.reject(err)
            }
        )
    }
    jsonBecomeFormDate(data) {
        const formData = new FormData();
        for (let i of Object.keys(data)) {
            formData.append(i, data[i])
        }
        return formData
    }
    getInsideConfig(options) {
        return {
            url: options.url,
            params: options.params,
            data: options.data
        }
    }
    get(options) {
        const config = Object.assign(this.getInsideConfig(options), {
            method: 'get'
        })
        const instance = axios.create(config)
        this.interceptors(instance)
        return instance()
    }
    json(options, method = 'post') {
        const config = Object.assign(this.getInsideConfig(options), {
            method: method
        })
        const instance = axios.create(config)
        this.interceptors(instance)
        return instance()
    }
    formData(options, method = 'post') {
        const config = Object.assign(this.getInsideConfig(options), {
            method: method,
            data: this.jsonBecomeFormDate(options.data)
        })
        const instance = axios.create(config)
        this.interceptors(instance)
        return instance()
    }
    delete(options) {
        const config = Object.assign(this.getInsideConfig(options), {
            method: 'delete'
        })
        const instance = axios.create(config)
        this.interceptors(instance)
        return instance()
    }
}

const request = new HttpRequest()

export default request