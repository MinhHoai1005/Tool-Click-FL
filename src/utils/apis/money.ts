import { api } from "config/config"
import { Fetch } from "utils/fetch"
import { Response, RPMoney } from "models"

export const moneyAddByAdmin = async (id: number | null | string, total: number) => {
    const url = api.moneyAddByAdmin.url
    const body = {
        client_id: id,
        total: total,

    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const getMoney = async (client_id: number, page: number, page_size: number) => {
    const url = api.getAllMoney.url
    const body = {
        client_id: client_id,
        page: page,
        page_size: page_size

    }
    const response = await Fetch.Post<RPMoney>(url, body)
    return response
}
export const switchStatusMoney = async (id: string, status: number) => {
    const url = api.switchStausMoney.url
    const body = {
        id: id,
        status: status

    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}