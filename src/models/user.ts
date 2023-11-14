
export interface RPUser {
    token: string,
    data: IUser
}

export interface IUser {
    client_id: number
    user_name: string
    email: string
    total: number,
    phone:string,
    created_date: Date
}
export interface IPermissionCheckList {
    update_config_currency: boolean
}