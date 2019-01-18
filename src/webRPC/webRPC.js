import axios from 'axios';
import parser from 'fast-xml-parser';
import queryString from 'query-string';
import md5 from 'md5';

export const METHOD_POST_DETAILS = 'user_posts';
export const METHOD_THREAD_DETAILS = 'user_threads';

function constructURL(URL, params) {
    return `${URL}?${queryString.stringify(params)}`;
}

function toCORSProxyURL(URL, params) {
    return `https://cors.io/?${constructURL(URL, params)}`;
}

function createPasswdHash(password, email) {
    // As documented in: https://boinc.berkeley.edu/trac/wiki/PasswordHash
    return md5(password + email);
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

export function createAccount(projectURL, emailAddress, password, userName, options) {
    const passwdHash = createPasswdHash(password, emailAddress);

    const endpoint = `${projectURL}${CREATE_ACCOUNT_SUFFIX}`;
    const params = {
        email_addr: emailAddress,
        passwd_hash: passwdHash,
        user_name: userName,
        ...options,
    };

    return fetchWebRPC(endpoint, params);
}

export function lookupAccount(projectURL, options) {
    const endpoint = `${projectURL}${LOOKUP_ACCOUNT_SUFFIX}`;
    return fetchWebRPC(endpoint, options);
}

export function getAccountInfo(projectURL, accountKey, opaqueAuth) {
    const endpoint = `${projectURL}${GET_ACCOUNT_INFO_SUFFIX}`;
    const params = {
        account_key: accountKey,
        opaque_auth: opaqueAuth,
    };

    return fetchWebRPC(endpoint, params);
}

export function setAccountInfo(projectURL, accountKey, opaqueAuth, options) {
    const endpoint = `${projectURL}${SET_ACCOUNT_INFO_SUFFIX}`;
    const params = {
        account_key: accountKey,
        opaque_auth: opaqueAuth,
        ...options,
    };

    return fetchWebRPC(endpoint, params);
}

export function setHostInfo(projectURL, accountKey, opaqueAuth, hostID, venue) {
    const endpoint = `${projectURL}${SET_HOST_INFO_SUFFIX}`;
    const params = {
        account_key: accountKey,
        opaque_auth: opaqueAuth,
        hostid: hostID,
        venue,
    };

    return fetchWebRPC(endpoint, params);
}

export function showUser(projectURL, opaqueAuth, options) {
    const endpoint = `${projectURL}${SHOW_USER_SUFFIX}`;
    const params = {
        opaque_auth: opaqueAuth,
        format: 'xml',
        ...options,
    };

    return fetchWebRPC(endpoint, params);
}

export function getResultStatus(projectURL, options) {
    const endpoint = `${projectURL}${GET_RESULT_STATUS_SUFFIX}`;

    return fetchWebRPC(endpoint, options);
}

export function teamLookupByName(projectURL, teamName) {
    const endpoint = `${projectURL}${TEAM_LOOKUP_SUFFIX}`;
    const params = {
        format: 'xml',
        team_name: teamName,
    };

    return fetchWebRPC(endpoint, params);
}

export function teamLookupByID(projectURL, teamID) {
    const endpoint = `${projectURL}${TEAM_LOOKUP_SUFFIX}`;
    const params = {
        team_id: teamID,
    };

    return fetchWebRPC(endpoint, params);
}

export function getTeamMemberList(projectURL, teamID, opaqueAuth, options) {
    const endpoint = `${projectURL}${TEAM_MEMBER_LIST_SUFFIX}`;
    const params = {
        xml: 1,
        teamid: teamID,
        opaque_auth: opaqueAuth,
        ...options,
    };

    return fetchWebRPC(endpoint, params);
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

export function getAppVersions(projectURL) {
    const endpoint = `${projectURL}${APP_VERSIONS_SUFFIX}`;
    return fetchWebRPC(endpoint, { xml: 1 });
}
