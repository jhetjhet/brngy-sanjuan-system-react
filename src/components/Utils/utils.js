

import axios from 'axios';
import {Buffer} from 'buffer';

export async function UrlToBase64(url, auth_token) {
    const config = {
        responseType: 'arraybuffer',
    }
    if(auth_token)
        config.headers = {
            Authorization: `token ${auth_token}`
        }
    try {
        let image = await axios.get(url, config);
        let raw = Buffer.from(image.data).toString('base64');
        return "data:" + image.headers["content-type"] + ";base64," + raw;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export function dataFrameJSONToRowsColums(data){
    let columns = Object.keys(data); 
    let rows = [];
    try {
        let values = Object.values(data).map((val) => Object.values(val));
        rows = values[0].map((_, i) => values.map((val) => val[i]));
    } catch (error) {}
    return [columns, rows];
}