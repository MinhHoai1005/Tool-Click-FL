import { api } from "config/config"
import { Token } from "models"
import axiosClient from "./axiosClient"

const accountApi = {
    create():Promise<Token> {
        const url = api.createAccount.url
        return axiosClient.get(url,{params:{
            email:"111",
            password:"1111"
        }})
    }
}
export default accountApi