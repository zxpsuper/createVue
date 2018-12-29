import axios from 'axios';

let httpServer = {
    post(url, data, config) {
        if (!config) {
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
        }
        return axios.post(url, data, config).then(res => {
            return Promise.resolve(res.data);
        });
    },
    get(url, data) {
        return axios.get(url, { params: data }).then(res => {
            return Promise.resolve(res.data);
        });
    },
};

export default httpServer;
