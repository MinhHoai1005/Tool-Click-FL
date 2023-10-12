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