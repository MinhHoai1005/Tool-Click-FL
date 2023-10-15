import { api } from "config/config"
import { IAccount, Response } from "models"
import { Fetch } from "utils/fetch"


export const getAllAccount = async (client_id: number, page: number, page_size: number) => {
    const url = api.getAllAccount.url
    const body = {
        client_id: client_id,
        page: page,
        page_size: page_size,
    }
    const response = await Fetch.Post<IAccount[]>(url, body)
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
    const response = await Fetch.Post<IAccount[]>(url, body)
    return response
}