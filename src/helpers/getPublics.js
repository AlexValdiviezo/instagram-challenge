import { env } from "../configs/env";

export const getPublics = async() =>{
    try {
        const result = await fetch(`${env.urlApi}/api/`);
        const {data} = await result.json();
        return data;
    } catch (error) {
        return error;
    }

}