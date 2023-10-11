/* eslint-disable eqeqeq */
/*eslint no-throw-literal: "off"*/
import { Fetch } from "../fetch"
import { api } from "../../config/config"
import { RPUser } from "models"
import { setItemLocalStorage } from "utils"
import { User } from "@firebase/auth"

export const register = async (user_name: string, email: string, phone: string, password: string) => {
    const url = api.createAccount.url
    const body = {
        user_name: user_name,
        email: email,
        phone: phone,
        password: password,
    }
    const response = await Fetch.Post<RPUser>(url, body)
    return response
}

export const login = async (email: string, password: string) => {
    const url = api.loginAccount.url
    const body = {
        email: email,
        password: password,
    }
    const response = await Fetch.Post<RPUser>(url, body)
    if (response.code == 200) {
        setItemLocalStorage("token", response.data.token)
        setItemLocalStorage("user", JSON.stringify(response.data.data))
    }
    return response
}

export const loginFacebook = async (user: User) => {
    const url = api.loginFacebook.url
    const body = {
        user: user,
    }
    const response = await Fetch.Post<RPUser>(url, body)
    if (response.code == 200) {
        setItemLocalStorage("token", response.data.token)
        setItemLocalStorage("user", JSON.stringify(response.data.data))
    }
    return response
}
export const loginGmail = async (user: User) => {
    const url = api.loginGmail.url
    const body = {
        user: user,
    }
    const response = await Fetch.Post<RPUser>(url, body)
    if (response.code == 200) {
        setItemLocalStorage("token", response.data.token)
        setItemLocalStorage("user", JSON.stringify(response.data.data))
    }
    return response
}
export const forgotPasswordSendEmail = async (email: string) => {
    const url = api.forgotPasswordSendEmail.url
    const body = {
        email: email,
    }
    const response = await Fetch.Post<RPUser>(url, body)
    return response
}
export const forgotPassword = async (id?: string, password?: string) => {
    const url = api.forgotPassword.url
    const body = {
        client_id: id,
        password: password,
    }
    const response = await Fetch.Post<RPUser>(url, body)
    return response
}