import axios from 'axios';
import { toCORSProxyURL } from './webRPC';

export default function getSchedulerURL(projectURL) {
    return axios.get(toCORSProxyURL(projectURL), {
        crossDomain: true,
    }).then(response => new Promise((resolve, reject) => {
        if (response.status === 200) {
            // Try and get the scheduler URL from the HTML comment
            let result = /<head>(?:.|\n)*?<!--(?:.|\n)*?<scheduler>((?:.|\n)*)<\/scheduler>(?:.|\n)*?-->(?:.|\n)*?<\/head>/g.exec(response.data);
            if (result === null) {
                // Try and get from a link tag
                result = /<link rel="boinc_scheduler" href="(.*)"/g.exec(response.data);
            }

            if (result === null) {
                reject(response);
            } else {
                resolve(result[1]);
            }
        } else {
            reject(response);
        }
    }));
}
