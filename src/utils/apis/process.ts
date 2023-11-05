import { api } from "config/config"
import { Fetch } from "utils/fetch"
import { Response,IHistory,IHistoryUser } from "models"

export const createProcess = async (id: string, total: number, quantity: number,link:string,note:string,comment?:string,time?:number) => {
    const url = api.createProcess.url
    const user = localStorage.getItem('user')
    let client_id = 0
    if (user) {
        const jsonObject = JSON.parse(user);
        client_id = jsonObject.client_id
    }
    const body = {
        client_id: client_id,
        category_id: id,
        total: total,
        quantity: quantity,
        link:link,
        note:note,
        comment:comment,
        time:time,
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const loadProcessId = async (id: string) => {
    const url = api.loadProcessId.url
    const user = localStorage.getItem('user')
    let client_id = 0
    if (user) {
        const jsonObject = JSON.parse(user);
        client_id = jsonObject.client_id
    }

    const body = {
        client_id: client_id,
        category_id: id,
    }
    const response = await Fetch.Post<IHistory[]>(url, body)
    return response
}
export const loadProcessByLink = async (link: string) => {
    const url = api.loadProcessByLink.url
    const user = localStorage.getItem('user')
    let client_id = 0
    if (user) {
        const jsonObject = JSON.parse(user);
        client_id = jsonObject.client_id
    }

    const body = {
        client_id: client_id,
        link: link,
    }
    const response = await Fetch.Post<IHistory[]>(url, body)
    return response
}
export const processClientID = async (category:string,link:string,page: number,rowspage:number) => {
    const url = api.processClientID.url
    const user = localStorage.getItem('user')
    let client_id = 0
    if (user) {
        const jsonObject = JSON.parse(user);
        client_id = jsonObject.client_id
    }

    const body = {
        client_id: client_id,
        category:category,
        link:link,
        page: page,
        page_size: rowspage,
    }
    const response = await Fetch.Post<IHistoryUser[]>(url, body)
    return response
}