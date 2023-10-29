import { api } from "config/config"
import { Fetch } from "utils/fetch"
import { Response, ICategory,ICategoryId } from "models"

export const createCategory = async ( name: string, url_web: string, image: string) => {
    const url = api.createCategory.url
    const body = {
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
export const deleteCategory = async (id: string) => {
    const url = api.deleteCategory.url
    const body = {
        id: id
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const updateCategory = async (id: string | undefined, name: string, url_web: string, image: string) => {
    const url = api.updateCategory.url
    const body = {
        id: id,
        name: name,
        url: url_web,
        image: image,
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const getDetailCategory = async (id: string|undefined) => {
    const url = api.getDetailCategory.url
    const body = {
        id: id
    }
    const response = await Fetch.Post<ICategory>(url, body)
    return response
}

export const deleteChildrenCategory = async (id: string|undefined,id_children: string|undefined) => {
    const url = api.deleteChildrenCategory.url
    const body = {
        id: id,
        id_children: id_children,
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const updateChildrenCategory = async (id: string|undefined,id_children: string|undefined, name: string, url_web: string, image: string) => {
    const url = api.updateChildrenCategory.url
    const body = {
        id: id,
        id_children: id_children,
        name: name,
        url: url_web,
        image: image,
    }
    const response = await Fetch.Post<Response>(url, body)
    return response
}
export const createChildrenCategory = async (id: string|undefined, name: string, url_web: string, image: string) => {
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
export const getCategoryId = async ( url_web: string) => {
    const url = api.getCategoryId.url
    const body = {
        url: url_web,
    }
    const response = await Fetch.Post<ICategoryId>(url, body)
    return response
}