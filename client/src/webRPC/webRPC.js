import axios from 'axios';
import parser from 'fast-xml-parser';
import queryString from 'query-string';

function constructURL(URL, params) {
    return `${URL}?${queryString.stringify(params)}`;
}

export function toCORSProxyURL(URL, params) {
    return `http://127.0.0.1:3000/?${constructURL(URL, params)}`;
}

export default function fetchWebRPC(projectEndpoint, params, requestOptions) {
    const URL = toCORSProxyURL(projectEndpoint, params);

    return axios.get(URL, {
        crossDomain: true,
        ...requestOptions,
    }).then(response => new Promise((resolve, reject) => {
        if (response.status === 200) {
            // The response data is XML. Parse the XML into a JavaScript object
            const data = parser.parse(response.data);
            resolve(data);
        } else {
            reject(response);
        }
    }));
}
