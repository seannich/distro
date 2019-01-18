import axios from 'axios';

import fetchWebRPC from './webRPC';
import {
    UPDATE_FORUM_PREF_SUFFIX, USER_LAST_FORUM_POST_SUFFIX,
} from './settings';

export const METHOD_POST_DETAILS = 'user_posts';
export const METHOD_THREAD_DETAILS = 'user_threads';

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
