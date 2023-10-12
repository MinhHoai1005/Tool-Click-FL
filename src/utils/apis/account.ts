import { api } from "config/config"
import { RPAccount, Response } from "models"
import { Fetch } from "utils/fetch"


export const getAllAccount = async (keyword: string, page: number, page_size: number) => {
    const url = api.getAllAccount.url
    const body = {
        keyword: keyword,
        page: page,
        page_size: page_size,
    }
    const response = await Fetch.Post<RPAccount>(url, body)
    return response
}
export const switchStausAccount = async (id: string, status: number) => {
    const url = api.switchStausAccount.url
    const body = {
        id: id,
        status: status
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const getAllAccountMoney = async (keyword: string) => {
    const url = api.getAllAccountMoney.url
    const body = {
        keyword: keyword,
    }
    const response = await Fetch.Post<RPAccount>(url, body)
    return response
}