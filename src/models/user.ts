export interface RPUser {
    id: string,
    user_name: string,
    pass_word: string,
    token: string,
}

export interface IUser {
    acting_title_ids: number[]
    department_id: number
    full_name: string
    is_off: boolean
    main_title_id: number
    phone: string
    user_id: number
    is_manager: boolean
}
export interface IPermissionCheckList {
    update_config_currency: boolean
}