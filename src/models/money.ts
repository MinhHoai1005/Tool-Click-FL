export interface RPMoney {
    total: number,
    data: IMoney[]
}
export interface IMoney {
    id: string,
    client_id: number,
    total: number,
    type: number,
    reason: string,
    status: number,
    created_date: Date,
}
export interface IProgress {
    category_id: string,
    client_id: number,
    total: number,
    quantity: string,
    status: number,
    link:string,
    note:string,
    created_date: Date,
}
export interface IHistory {
    total: number,
    quantity: number,
    status: number,
    link:string,
    note:string,
    created_date: Date,
}