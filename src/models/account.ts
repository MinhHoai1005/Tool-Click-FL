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
    _id: string,
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
export interface IDashboard {
    earnings: number,
    action: number,
    pending: number,
    category_name: string,
    maxTotal: number,
    total:number,
}
export interface ILineChartMoeny{
    action: number[],
    amount_used: number[],
}