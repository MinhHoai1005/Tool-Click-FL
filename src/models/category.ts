export interface ICategory {
    _id: string,
    name: string,
    url: string,
    image: string,
    children: IChildren[]
}
export interface IChildren {
    id: string,
    name: string,
    url: string,
    image: string,
}
export interface ICategoryId{
    id: string,
    url: string,
}