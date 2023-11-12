import { api } from "config/config"
import { IAccount, IDashboard, Response,ILineChartMoeny, IPieChart } from "models"
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
export const getDashboard = async (start_date: moment.Moment, end_date: moment.Moment) => {
    const url = api.getDashboard.url
    const user = localStorage.getItem('user')
    let client_id = 0
    if (user) {
        const jsonObject = JSON.parse(user);
        client_id = jsonObject.client_id
    }
    const body = {
        start_date: start_date,
        end_date: end_date,
        client_id:client_id,
    }
    const response = await Fetch.Post<IDashboard>(url, body)
    return response
}
export const getLineChartMoney = async (start_date: moment.Moment, end_date: moment.Moment) => {
    const url = api.getLineChartMoney.url
    const user = localStorage.getItem('user')
    let client_id = 0
    if (user) {
        const jsonObject = JSON.parse(user);
        client_id = jsonObject.client_id
    }
    const body = {
        start_date: start_date,
        end_date: end_date,
        client_id:client_id,
    }
    const response = await Fetch.Post<ILineChartMoeny>(url, body)
    return response
}
export const getPieChartCategory = async (start_date: moment.Moment, end_date: moment.Moment) => {
    const url = api.getPieChartCategory.url
    const user = localStorage.getItem('user')
    let client_id = 0
    if (user) {
        const jsonObject = JSON.parse(user);
        client_id = jsonObject.client_id
    }
    const body = {
        start_date: start_date,
        end_date: end_date,
        client_id:client_id,
    }
    const response = await Fetch.Post<IPieChart[]>(url, body)
    return response
}
export const getPieChartCategoryAction = async (start_date: moment.Moment, end_date: moment.Moment) => {
    const url = api.getPieChartCategoryAction.url
    const user = localStorage.getItem('user')
    let client_id = 0
    if (user) {
        const jsonObject = JSON.parse(user);
        client_id = jsonObject.client_id
    }
    const body = {
        start_date: start_date,
        end_date: end_date,
        client_id:client_id,
    }
    const response = await Fetch.Post<IPieChart[]>(url, body)
    return response
}
export const getAccount = async () => {
    const url = api.getAccount.url
    const response = await Fetch.Post<IAccount[]>(url)
    return response
}