import axios from 'axios';
import parser from 'fast-xml-parser';

const PROJECT_CONFIG_SUFFIX = 'get_project_config.php';
const SERVER_STATUS_SUFFIX = 'server_status.php?xml=1';

function toCORSProxyURL(URL) {
    return `https://cors.io/?${URL}`;
}

function getProjectConfig(projectURL) {
    const url = toCORSProxyURL(`${projectURL}${PROJECT_CONFIG_SUFFIX}`);

    return axios.get(url, {
        crossDomain: true,
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

function getServerStatus(projectURL) {
    const url = toCORSProxyURL(`${projectURL}${SERVER_STATUS_SUFFIX}`);

    return axios.get(url, {
        crossDomain: true,
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
