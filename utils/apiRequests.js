import { getJWToken } from "./decodeJwt"



export async function apiGet(endpoint) {
    const token = getJWToken() || 'token'
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
    const token = getJWToken() || 'token'
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

export async function apiDelete(){
    const token = getJWToken() || 'token'
    const requests = await fetch(process.env.EXPO_PUBLIC_API_URL+endpoint,{
        method:"DELETE",
        headers:{
            "Authorization": `Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const json = await requests.json()
    return json
}