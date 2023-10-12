export interface AccountUser {

    email: string,
    phone: string,
}
export interface Token {
    toke: string
}

export interface RPAccount {
    total: number,
    data: IAccount[]
}
export interface IAccount {
    id: string,
    client_id: number,
    user_name: string,
    email: string,
    total: number,
    phone: string,
    photo_url: string,
    uid: string,
    status: number,
    created_date: Date,
}