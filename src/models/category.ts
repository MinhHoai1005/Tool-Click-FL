export interface ICategory {
    _id: string,
    name: string,
    url: string,
    image: string,
    children?: IChildren[]
}
export interface IChildren {
    id: string,
    name: string,
    url: string,
    image: string,
}