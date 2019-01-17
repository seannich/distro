import axios from 'axios';
import parser from 'fast-xml-parser';
import queryString from 'query-string';

const PROJECT_CONFIG_SUFFIX = 'get_project_config.php';
const SERVER_STATUS_SUFFIX = 'server_status.php';

function constructURL(URL, params) {
    return `${URL}?${queryString.stringify(params)}`;
}

function toCORSProxyURL(URL, params) {
    return `https://cors.io/?${constructURL(URL, params)}`;
}

function fetchWebRPC(projectEndpoint, params, requestOptions) {
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

export function getProjectConfig(projectURL) {
    const endpoint = `${projectURL}${PROJECT_CONFIG_SUFFIX}`;
    return fetchWebRPC(endpoint);
}

export function getServerStatus(projectURL) {
    const endpoint = `${projectURL}${SERVER_STATUS_SUFFIX}`;
    return fetchWebRPC(endpoint, { xml: 1 });
}
