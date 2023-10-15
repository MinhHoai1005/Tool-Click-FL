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
export interface Response{
    code: number,
    message: string,
    data: any,
}
export interface IUploadFileResponse {
    is_err: boolean
    is_exist: boolean
    http_status: number
    mgs_err: string
    file_name: string
    data: IFile
}
export interface IFile {
    _id: string
    bucket: string
    source: string
    file_name: string
    file_path: string
    public_file_path: string
    content_type: string
    size: string
    status: string
}
