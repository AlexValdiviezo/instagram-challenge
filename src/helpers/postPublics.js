import { env } from "../configs/env";

export const postPublics = async(url, txt='') =>{
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imagen: url, titulo:txt, likes:0})
        };
        const result = await fetch(`${env.urlApi}/api/`, requestOptions);
        const {error, data} = await result.json();
        if(error){
            return {
                error: 'Ocurrió un error al intentar subir la imagen'
            }
        }
        return data;
    } catch (error) {
        return error;
    }

}