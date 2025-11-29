import { getJWToken } from "./decodeJwt"

const token = getJWToken() || 'token'

export async function apiGet(endpoint) {
    const requests = await fetch(process.env.EXPO_PUBLIC_API_URL+endpoint,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
    const json = await requests.json()
    return json
}

export async function apiPost(endpoint,data) {
    const requests = await fetch(process.env.EXPO_PUBLIC_API_URL+endpoint,{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const json = await requests.json()
    return json
}