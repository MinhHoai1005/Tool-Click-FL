export interface ICategory {
    _id: string,
    name: string,
    url: string,
    image: number,
    children?: IChildren[]
}
export interface IChildren {
    id: string,
    name: string,
    url: string,
    image: number,
}