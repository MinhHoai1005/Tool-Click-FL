import { api } from "config/config"
import { Fetch } from "utils/fetch"
import { Response, ICategory } from "models"

export const createCategory = async (id: string | undefined, name: string, url_web: string, image: string) => {
    const url = api.createCategory.url
    const body = {
        id: id,
        name: name,
        url: url_web,
        image: image,
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const getAllCategory = async () => {
    const url = api.getAllCategory.url
    const body = {

    }
    const response = await Fetch.Post<ICategory[]>(url, body)
    return response
}