import axios, { AxiosRequestConfig } from 'axios';

export default {
    post<T>(url: string, data: any, config: AxiosRequestConfig) {
        if (!config) {
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
        }
        return axios.post<T>(url, data, config).then(res => {
            return Promise.resolve(res.data);
        });
    },
    get<T>(url: string, data: AxiosRequestConfig) {
        return axios.get<T>(url, { params: data }).then(res => {
            return Promise.resolve(res.data);
        });
    },
};
