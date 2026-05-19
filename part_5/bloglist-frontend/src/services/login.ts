import axios from "axios"
import type { Credentials } from "../types"
import type { UserData } from "../types"

const baseUrl = '/api/login'

export const login = async (credentials: Credentials) => {
    const response = await axios.post<UserData>(baseUrl, credentials)
    return response.data
}
