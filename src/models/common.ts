export interface ListResponse<T> {
    code: number;
    message: string;
    data: T[]
}
export interface MenuSidebar {
    id: number,
    name: string,
    icon?: JSX.Element
    children: MenuChildren[]
    url?: string
    img?: string
}
export interface MenuChildren {
    id: number,
    name: string,
    icon?: JSX.Element
    url: string
    img?: string
}
export interface ActionDialog {
    title: string
    span: string
    onAgree: Function
}