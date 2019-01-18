import axios from 'axios';
import parser from 'fast-xml-parser';
import queryString from 'query-string';

export const METHOD_POST_DETAILS = 'user_posts';
export const METHOD_THREAD_DETAILS = 'user_threads';

function constructURL(URL, params) {
    return `${URL}?${queryString.stringify(params)}`;
}

function toCORSProxyURL(URL, params) {
    return `https://cors.io/?${constructURL(URL, params)}`;
}

export function fetchWebRPC(projectEndpoint, params, requestOptions) {
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

export function setForumPref(projectURL, accountKey, options) {
    const endpoint = `${projectURL}${UPDATE_FORUM_PREF_SUFFIX}`;
    const payload = {
        account_key: accountKey,
        ...options,
    };

    return axios.post(endpoint, payload);
}

export function getForumLastPost(projectURL, method, userID, options) {
    const endpoint = `${projectURL}${USER_LAST_FORUM_POST_SUFFIX}`;
    const params = {
        method,
        userid: userID,
        ...options,
    };

    return fetchWebRPC(endpoint, params);
}
