// [NAME_CONSTRANT] = '@@[namespace]/[NAME_CONSTRANT]',

import { IPermissionCheckList, IUser } from "models"

// ex: FETCH_SUCCESS = '@@auth/FETCH_SUCCESS',
export enum AuthActionTypes {
    SET_USER_INFO_ACTION = '@@auth/SET_USER_INFO_ACTION',
    SET_USER_INFO = '@@auth/SET_USER_INFO',
    AUTHORIZE_ACTION = '@@auth/AUTHORIZE_ACTION',
    CHANGE_LOADING = '@@auth/CHANGE_LOADING',
    GET_USER_PERMISSION_ACTION = '@@auth/GET_USER_PERMISSION_ACTION',
    GET_USER_PERMISSION = '@@auth/GET_USER_PERMISSION',
    SET_AUTHENTICATION_ACTION = '@@auth/SET_AUTHENTICATION_ACTION',
    SET_AUTHENTICATION = '@@auth/SET_AUTHENTICATION',
    CHANGE_PERMISSION_ACTION = "@@auth/CHANGE_PERMISSION_ACTION",
    CHANGE_PERMISSION = "@@auth/CHANGE_PERMISSION",
}

export interface AuthState {
    readonly loading: boolean
    readonly isAuthenticated: boolean
    readonly user: IUser|null
    readonly permission: IPermissionCheckList
}
