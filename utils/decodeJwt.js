import * as SecureStore from 'expo-secure-store';

export function getUserID(){
    const jwt = SecureStore.getItem("userToken");
    const b64jwt = JSON.parse( atob(jwt.split(".")[1]))
    return b64jwt.id
}

export function getJWToken(){
     const jwt = SecureStore.getItem("userToken");

     return jwt
}