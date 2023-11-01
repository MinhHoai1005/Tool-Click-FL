export interface ICategory {
    _id: string,
    name: string,
    url: string,
    image: string,
    children: IChildren[],
    menu: string ,
}
export interface IChildren {
    id: string,
    name: string,
    url: string,
    image: string,
    menu: string ,
}
export interface ICategoryId {
    id: string,
    url: string,
}