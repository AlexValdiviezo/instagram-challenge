import { env } from "../configs/env";

export const putPublics = async(id) =>{
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, likes:1})
        };
        const {data} = await fetch(`${env.urlApi}/api/`, requestOptions);
        return data;
    } catch (error) {
        return error;
    }
}