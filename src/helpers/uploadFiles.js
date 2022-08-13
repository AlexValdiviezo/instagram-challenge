import axios from "axios";
import {env} from '../configs/env'

export const uploadFiles = async(files = []) => {
    const f = new FormData();

    for(let index = 0; index<files.length; index++){
        f.append("photo", files[index]);
    }

    const {data} = await axios.post(env.urlApi + '/upload', f);

    return data;
}   