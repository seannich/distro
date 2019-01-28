import axios from 'axios';
import parser from 'fast-xml-parser';
import queryString from 'query-string';

function constructURL(URL, params) {
    return `${URL}?${queryString.stringify(params)}`;
}

function toCORSProxyURL(URL, params) {
    return `http://127.0.0.1:3000/?${constructURL(URL, params)}`;
}

function responseToXMLData(response) {
    return new Promise((resolve) => {
        const data = parser.parse(response.data);
        resolve(data);
    });
}

export function getWithProxy(endpoint, params, requestOptions) {
    const URL = toCORSProxyURL(endpoint, params);

    return axios.get(URL, {
        crossDomain: true,
        ...requestOptions,
    }).then(response => new Promise((resolve, reject) => {
        if (response.status === 200) {
            resolve(response);
        } else {
            reject(response);
        }
    }));
}

export function getXMLWithProxy(endpoint, params, requestOptions) {
    return getWithProxy(endpoint, params, requestOptions)
        .then(responseToXMLData);
}

export function postWithProxy(endpoint, data, postOptions) {
    const URL = toCORSProxyURL(endpoint);

    return axios.post(URL, data, {
        crossDomain: true,
        ...postOptions,
    }).then(response => new Promise((resolve, reject) => {
        if (response.status === 200) {
            resolve(response);
        } else {
            reject(response);
        }
    }));
}

export function postWithProxyXML(endpoint, data, postOptions) {
    return postWithProxy(endpoint, data, postOptions)
        .then(responseToXMLData);
}
