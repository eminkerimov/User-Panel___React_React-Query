import axios from "axios"

const usersApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getUsers = async () => {
    const response = await usersApi.get("/users")
    return response.data
}

export const getUser = async (id) => {
    const response = await usersApi.get(`/users/${id}`)
    return response.data
}

export const searchUser = async (value) => {
    return await usersApi.get(`/users?name=${value}`)
}

export const addUser = async (user) => {
    return await usersApi.post("/users", user)
}

export const updateUser = async (id, user) => {
    return await usersApi.put(`/users/${id}`, user)
}

export const deleteUser = async ({ id }) => {
    return await usersApi.delete(`/users/${id}`, id)
}

export default usersApi; 