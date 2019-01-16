import axios from 'axios';

const PROJECT_CONFIG_SUFFIX = 'get_project_config.php';

function toCorsProxyURL(URL) {
    return `https://cors.io/?${URL}`;
}

function getProjectConfig(projectURL) {
    const url = toCorsProxyURL(`${projectURL}${PROJECT_CONFIG_SUFFIX}`);
    return axios.get(url, {
        crossDomain: true,
    }).then(response => new Promise((resolve, reject) => {
        if (response.status === 200) {
            resolve(response.data);
        } else {
            reject(response);
        }
    }));
}
