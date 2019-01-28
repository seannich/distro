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

export async function getWithProxy(endpoint, params, requestOptions) {
    const URL = toCORSProxyURL(endpoint, params);

    const response = await axios.get(URL, {
        crossDomain: true,
        ...requestOptions,
    });

    if (response.status === 200) {
        return response;
    }

    throw new Error(response);
}

export async function getXMLWithProxy(endpoint, params, requestOptions) {
    const response = await getWithProxy(endpoint, params, requestOptions);
    return responseToXMLData(response);
}

export async function postWithProxy(endpoint, data, postOptions) {
    const URL = toCORSProxyURL(endpoint);

    const response = await axios.post(URL, data, {
        crossDomain: true,
        ...postOptions,
    });

    if (response.status === 200) {
        return response;
    }

    throw new Error(response);
}

export async function postWithProxyXML(endpoint, data, postOptions) {
    const response = await postWithProxy(endpoint, data, postOptions);
    return responseToXMLData(response);
}
