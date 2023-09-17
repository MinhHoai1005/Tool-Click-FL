import axios, { Method } from "axios"
import { removeItemLocalStorage } from ".."
import { CacheManager } from "../cacheStorage"

export interface IPaging<T> {
    data: T[]
    total: number
}

export interface IResponse<T> extends IResponseResult {
    data: T
}

export interface IResponseResult {
    code: number
    message?: string
    code_message_value?: string
    code_message?: string
}

export class Fetch {
    public static async Get<T>(url: string, headers: object = {}, isCache: boolean = false): Promise<IResponse<T>> {
        const token = localStorage.getItem("token")
        const defaultHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
        }

        const request = {
            url: url,
            method: "GET" as Method,
            headers: { ...defaultHeaders, ...headers },
        }
        const keyCache = btoa(JSON.stringify(request))

        try {
            if (isCache) {
                const { result, wait } = await CacheManager.wait<IResponse<T>>(keyCache)

                if (result) return result

                if (wait) {
                    const data = await CacheManager.get<IResponse<T>>(keyCache)
                    return data
                }
            }

            const response = await axios.request<IResponse<T>>(request)

            const responseData = response?.data

            if (isCache) CacheManager.set<IResponse<T>>(keyCache, responseData)

            return responseData
        } catch (error) {
            if (isCache) CacheManager.error(keyCache, error)

            if (error.message === "Network Error") {
                return Promise.resolve({
                    code: 400,
                    message: "Lỗi mạng. Vui lòng kiểm tra và thử lại",
                    data: null,
                    code_message: "400",
                    code_message_value: "Lỗi mạng. Vui lòng kiểm tra và thử lại",
                }) as unknown as Promise<IResponse<T>>
            }

            if (error?.response?.data?.code === 401) {
                removeItemLocalStorage("token")
                removeItemLocalStorage("user")
                window.location.href = `/qlns/login?previous_path=${encodeURIComponent(
                    window.location.pathname + window.location.search
                )}`
            }

            return error?.response?.data
        }
    }

    public static async Post<T>(
        url: string,
        data: object = {},
        headers: object = {},
        isRawData: boolean = false,
        isCache: boolean = false
    ): Promise<IResponse<T>> {
        const token = localStorage.getItem("token")
        const defaultHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
        }

        const request = {
            url: url,
            method: "POST" as Method,
            data: isRawData ? data : JSON.stringify(data),
            headers: { ...defaultHeaders, ...headers },
        }
        const keyCache = JSON.stringify(request)

        try {
            if (isCache) {
                const { result, wait } = await CacheManager.wait<IResponse<T>>(keyCache)

                if (result) return result

                if (wait) {
                    const data = await CacheManager.get<IResponse<T>>(keyCache)
                    return data
                }
            }

            const response = await axios.request<IResponse<T>>(request)

            const responseData = response?.data

            if (isCache) CacheManager.set<IResponse<T>>(keyCache, responseData)

            return responseData
        } catch (error) {
            if (isCache) CacheManager.error(keyCache, error)

            if (error.message === "Network Error") {
                return Promise.resolve({
                    code: 400,
                    message: "Lỗi mạng. Vui lòng kiểm tra và thử lại",
                    data: null,
                    code_message: "400",
                    code_message_value: "Lỗi mạng. Vui lòng kiểm tra và thử lại",
                }) as unknown as Promise<IResponse<T>>
            }

            // if (error?.response?.data?.code === 401) {
            //     removeItemLocalStorage("token")
            //     removeItemLocalStorage("user")
            //     window.location.href = `/qlns/login?previous_path=${encodeURIComponent(
            //         window.location.pathname + window.location.search
            //     )}`
            // }

            return error?.response?.data
        }
    }
    public static async Put<T>(
        url: string,
        data: object = {},
        headers: object = {},
        isRawData: boolean,
        isCache: boolean = false
    ): Promise<IResponse<T>> {
        const token = localStorage.getItem("token")
        const defaultHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
        }

        const request = {
            url: url,
            method: "PUT" as Method,
            data: isRawData ? data : JSON.stringify(data),
            headers: { ...defaultHeaders, ...headers },
        }
        const keyCache = JSON.stringify(request)

        try {
            if (isCache) {
                const { result, wait } = await CacheManager.wait<IResponse<T>>(keyCache)

                if (result) return result

                if (wait) {
                    const data = await CacheManager.get<IResponse<T>>(keyCache)
                    return data
                }
            }

            const response = await axios.request<IResponse<T>>(request)

            const responseData = response?.data

            if (isCache) CacheManager.set<IResponse<T>>(keyCache, responseData)

            return responseData
        } catch (error) {
            if (isCache) CacheManager.error(keyCache, error)

            if (error.message === "Network Error") {
                return Promise.resolve({
                    code: 400,
                    message: "Lỗi mạng. Vui lòng kiểm tra và thử lại",
                    data: null,
                    code_message: "400",
                    code_message_value: "Lỗi mạng. Vui lòng kiểm tra và thử lại",
                }) as unknown as Promise<IResponse<T>>
            }

            if (error?.response?.data?.code === 401) {
                removeItemLocalStorage("token")
                removeItemLocalStorage("user")
                window.location.href = `/qlns/login?previous_path=${encodeURIComponent(
                    window.location.pathname + window.location.search
                )}`
            }

            return error?.response?.data
        }
    }
    
    public static async Delete<T>(url: string, headers: object = {}, isCache: boolean = false): Promise<IResponse<T>> {
        const token = localStorage.getItem("token")
        const defaultHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
        }

        const request = {
            url: url,
            method: "DELETE" as Method,
            headers: { ...defaultHeaders, ...headers },
        }
        const keyCache = JSON.stringify(request)

        try {
            if (isCache) {
                const { result, wait } = await CacheManager.wait<IResponse<T>>(keyCache)

                if (result) return result

                if (wait) {
                    const data = await CacheManager.get<IResponse<T>>(keyCache)
                    return data
                }
            }

            const response = await axios.request<IResponse<T>>(request)

            const responseData = response?.data

            if (isCache) CacheManager.set<IResponse<T>>(keyCache, responseData)

            return responseData
        } catch (error) {
            if (isCache) CacheManager.error(keyCache, error)

            if (error.message === "Network Error") {
                return Promise.resolve({
                    code: 400,
                    message: "Lỗi mạng. Vui lòng kiểm tra và thử lại",
                    data: null,
                    code_message: "400",
                    code_message_value: "Lỗi mạng. Vui lòng kiểm tra và thử lại",
                }) as unknown as Promise<IResponse<T>>
            }

            if (error?.response?.data?.code === 401) {
                removeItemLocalStorage("token")
                removeItemLocalStorage("user")
                window.location.href = `/qlns/login?previous_path=${encodeURIComponent(
                    window.location.pathname + window.location.search
                )}`
            }

            return error?.response?.data
        }
    }
}
