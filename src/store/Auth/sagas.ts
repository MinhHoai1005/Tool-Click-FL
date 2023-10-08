/*eslint no-throw-literal: "off"*/
import { takeEvery, put, call, all } from "redux-saga/effects"
import { AuthActionTypes } from "./types"
import { setItemLocalStorage, sleep } from "../../utils"
import { IUser } from "models"
import { api } from "config/config"
import { Fetch } from "utils/fetch"

export function* authorize(data) {
    let { code, path, history } = data.payload

    let userId = 0

    try {
        const tokenReponse = yield call(genAccessToken, code)

        if (!tokenReponse?.access_token) {
            throw "Error: get token"
        }

        const token = tokenReponse.access_token

        setItemLocalStorage("token", token)

        const [userResponse] = yield all([call(getUserInfo), call(sleep, 1000)])

        if (!userResponse) {
            throw "Error: get user info"
        }

        userId = userResponse.user_id

        setItemLocalStorage("user", JSON.stringify(userResponse))

        yield put({ type: AuthActionTypes.SET_USER_INFO, payload: userResponse })

        yield put({ type: AuthActionTypes.SET_AUTHENTICATION, payload: true })
    } catch (error) {
        yield put({ type: AuthActionTypes.SET_AUTHENTICATION, payload: false })
    }

    if (path && history) {
        history.push(path)
    }

    yield put({ type: AuthActionTypes.GET_USER_PERMISSION_ACTION, payload: userId })
}
interface IUserInfoResponse extends IUser { }
export const getUserInfo = async (): Promise<IUserInfoResponse> => {
        const response = await Fetch.Get<IUserInfoResponse>(api.userInfo.url)

        if (response?.code === 200) {
            return response?.data
        } else {
            throw response
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
export function* setAuthWatcher() {
    console.log("setAuthWatcher")
    yield takeEvery(AuthActionTypes.AUTHORIZE_ACTION, authorize)
}
