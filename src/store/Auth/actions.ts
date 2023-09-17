import { IPermissionCheckList } from "models"
import { AuthActionTypes } from "./types"

export function setUserInfo(user) {
    return { type: AuthActionTypes.SET_USER_INFO_ACTION, payload: user }
}

export function setAuthenticaion(isAuth) {
    return { type: AuthActionTypes.SET_AUTHENTICATION_ACTION, payload: isAuth }
}

export function authorize(code, path, history) {
    return { type: AuthActionTypes.AUTHORIZE_ACTION, payload: { code, path, history } }
}

export function getUserPermissions() {
    return { type: AuthActionTypes.GET_USER_PERMISSION_ACTION }
}

export function changePermission(data: IPermissionCheckList) {
    return { type: AuthActionTypes.CHANGE_PERMISSION_ACTION, payload: data }
}
