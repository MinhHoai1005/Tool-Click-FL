/*eslint no-throw-literal: "off"*/
import { Fetch } from "../fetch"
import { api } from "../../config/config"
import { IPermissionCheckList, IUser } from "models"

interface IUserInfoResponse extends IUser {}

export const getUserInfo = async (): Promise<IUserInfoResponse> => {
    try {
        const response = await Fetch.Get<IUserInfoResponse>(api.userInfo.url)

        if (response?.code === 200) {
            return response?.data
        } else {
            throw response
        }
    } catch (error) {
        console.log("getUserInfo", error)
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await Fetch.Get<any>(api.logOut.url)

        if (response?.code === 200) {
            return response?.data
        } else {
            throw response?.message
        }
    } catch (error) {
        console.log("logOut", error)
        throw error
    }
}

export interface GenAccessTokenResponse {
    access_token: string
}

export const genAccessToken = async (code: string) => {
    const body = {
        authorization_code: code,
    }

    try {
        let url = api.genAccessToken.url
        const response = await Fetch.Post<GenAccessTokenResponse>(url, body)

        if (response?.code === 200) {
            return response?.data
        } else {
            if (response?.code_message) throw response?.code_message_value
            else throw response?.message
        }
    } catch (error) {
        console.log("genAccessToken", error)
        throw error
    }
}


export interface IPermissionUser {
    permission_check_list: IPermissionCheckList
}

export const getPermissionInfo = async (employeeId: number) => {
    const url = api.getPermission.url

    try {
        const response = await Fetch.Get<IPermissionUser>(`${url}?employee_id=${employeeId}`)

        if (response?.code === 200) {
            return response?.data
        } else {
            throw response?.code_message_value ?? response?.message
        }
    } catch (error) {
        console.log("getPermissionInfo", error)
        throw error
    }
}

