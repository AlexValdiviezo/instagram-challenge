import { env } from "../configs/env";

export const putAllproperty = async(id, imagen, titulo) =>{
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, imagen, titulo, like:0})
        };
        const {data} = await fetch(`${env.urlApi}/api/`, requestOptions);
        return data;
    } catch (error) {
        return error;
    }
}