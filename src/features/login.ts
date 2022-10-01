import axios from 'axios';
import {backUrl} from './cookie';

export async function LoginDjango(code: string): Promise<JSON> {
    const url = `${backUrl}token/github/`;
    const config = {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            // TODO: Add real CSRF Token.
            // 'X-CSRFToken': 'NJfuIPmycNBlby6TW4r5xirFqq23915KBfU0h4jekTz8JDmpcPRD2z6MaIOCHYGL',
        },
    };
    const data = {
        access_token: '',
        code: `${code}`,
        id_token: '',
    };
    const res = await axios.post(url, data, config);
    return res.data;
}

export function replacer(key: string, value: any) {
    if (key === 'success' || key === 'message') return undefined;
    else return value;
}

//export {login};
