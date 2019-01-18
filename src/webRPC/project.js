import fetchWebRPC from './webRPC';
import {
    PROJECT_CONFIG_SUFFIX, SERVER_STATUS_SUFFIX,
    APP_VERSIONS_SUFFIX, GET_RESULT_STATUS_SUFFIX,
} from './settings';

export function getProjectConfig(projectURL) {
    const endpoint = `${projectURL}${PROJECT_CONFIG_SUFFIX}`;
    return fetchWebRPC(endpoint);
}

export function getServerStatus(projectURL) {
    const endpoint = `${projectURL}${SERVER_STATUS_SUFFIX}`;
    return fetchWebRPC(endpoint, { xml: 1 });
}

export function getResultStatus(projectURL, options) {
    const endpoint = `${projectURL}${GET_RESULT_STATUS_SUFFIX}`;

    return fetchWebRPC(endpoint, options);
}

export function getAppVersions(projectURL) {
    const endpoint = `${projectURL}${APP_VERSIONS_SUFFIX}`;
    return fetchWebRPC(endpoint, { xml: 1 });
}
