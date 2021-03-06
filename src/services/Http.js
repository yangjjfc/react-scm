import axios from 'axios';
import Interceptor from './interceptor';
import {store} from '@/index';
let interceptor = new Interceptor();
interceptor.init();

let Http = {
    post: async (url, data = {}, type = 'post') => {
        let headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'apiName': url
        };
        let token = store.getState().currentUser.token || '';
        if (token) {
            headers = Object.assign(headers, {'jtoken': token});
        }
        delete data.token;
        console.log(token)
        let config = {
            url: url,
            method: type,
            data: data,
            timeout: 5000,
            headers: headers,
            responseType: 'json',
            validateStatus: function (status) {
                return status >= 200 && status < 300; // 默认的
            },
            maxRedirects: 5
        };
        try {
            var response = await axios(config);
        } catch (error) {
            throw new Error(error);
        }
        return response;
    },
    get: (url, data = {}) => {
        let config = { 
            url: url,
            method: 'get',
            data: data,
            timeout: 5000,
            responseType: 'json',
            validateStatus: function (status) {
                return status >= 200 && status < 300; // 默认的
            },
            maxRedirects: 5
        };
        var response = axios(config);
        return response;
    }
};
export default Http;
