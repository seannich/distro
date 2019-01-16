import axios from 'axios';
import parser from 'fast-xml-parser';

const PROJECT_CONFIG_SUFFIX = 'get_project_config.php';
const SERVER_STATUS_SUFFIX = 'server_status.php?xml=1';

function toCORSProxyURL(URL) {
    return `https://cors.io/?${URL}`;
}

function fetchWebRPC(URL, options) {
    return axios.get(URL, {
        crossDomain: true,
        ...options,
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

function getProjectConfig(projectURL) {
    const URL = toCORSProxyURL(`${projectURL}${PROJECT_CONFIG_SUFFIX}`);
    return fetchWebRPC(URL);
}

function getServerStatus(projectURL) {
    const URL = toCORSProxyURL(`${projectURL}${SERVER_STATUS_SUFFIX}`);
    return fetchWebRPC(URL);
}
