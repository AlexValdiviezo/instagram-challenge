import { env } from "../configs/env";

export const deletePublics = async(uid) =>{
    try{
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: uid})
        };
        const result = await fetch(`${env.urlApi}/api/`, requestOptions);
        const {data} = await result.json();
        return data;
    }catch(error){
        return error;
    }
}