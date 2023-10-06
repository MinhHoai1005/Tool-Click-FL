/*eslint no-throw-literal: "off"*/
import { Fetch } from "../fetch"
import { api } from "../../config/config"
import { RPUser } from "models"
import Components from "components/Common"

export const register = async (user_name: string, email: string, phone: string, password: string) => {
    const url = api.createAccount.url
    const body = {
        user_name: user_name,
        email: email,
        phone: phone,
        password: password,
    }
    try {
        const response = await Fetch.Post<RPUser>(url, body)
        if (response?.code === 200) {

            localStorage.setItem("token", response?.data?.token)
            return response?.data
        } else {
            throw response?.code_message_value ?? response?.message
        }
    } catch (error) {
        Components.notify("Có lỗi khi chạy api lấy thông tin khách hàng ", "error")
        throw error
    }
}