import { api } from "config/config"
import { Fetch } from "utils/fetch"
import { ISetting, Response } from "models"
import { formatIntToString } from "utils"

export const createSetting = async (name: string, image: string) => {
    const url = api.createSetting.url
    const body = {
        name: name,
        image: image,
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const updateSetting = async (id: string, name: string, image: string) => {
    const url = api.updateSetting.url
    const body = {
        id: id,
        name: name,
        image: image,
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const getAllSetting = async () => {
    const url = api.getAllSetting.url
    const body = {}
    const response = await Fetch.Post<ISetting[]>(url, body)
    return response
}
export const deleteSetting = async (id: string) => {
    const url = api.deleteSetting.url
    const body = {
        id: id,
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const createPrice = async (inputs:any) => {
    const url = api.createPrice.url
    const body = {
        inputs: inputs
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const getAllPrice = async () => {
    const url = api.getAllPrice.url
    const response = await Fetch.Post<Response>(url)
    return response
}