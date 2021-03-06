import md5 from 'md5';

import { getXMLWithProxy } from './webRPC';
import {
    CREATE_ACCOUNT_SUFFIX, LOOKUP_ACCOUNT_SUFFIX,
    GET_ACCOUNT_INFO_SUFFIX, SET_ACCOUNT_INFO_SUFFIX,
    SET_HOST_INFO_SUFFIX, SHOW_USER_SUFFIX,
} from './settings';

function createPasswdHash(password, email) {
    // As documented in: https://boinc.berkeley.edu/trac/wiki/PasswordHash
    return md5(password + email);
}

export function createAccount(projectURL, emailAddress, password, userName,
    hasConsent, consentSource, options) {
    const passwdHash = createPasswdHash(password, emailAddress);

    const endpoint = `${projectURL}${CREATE_ACCOUNT_SUFFIX}`;
    const params = {
        email_addr: emailAddress,
        passwd_hash: passwdHash,
        user_name: userName,
        consent_flag: hasConsent ? 1 : 0,
        source: consentSource,
        ...options,
    };

    return getXMLWithProxy(endpoint, params);
}

export function lookupAccount(projectURL, options) {
    const endpoint = `${projectURL}${LOOKUP_ACCOUNT_SUFFIX}`;
    return getXMLWithProxy(endpoint, options);
}

export function getAccountInfo(projectURL, accountKey, opaqueAuth) {
    const endpoint = `${projectURL}${GET_ACCOUNT_INFO_SUFFIX}`;
    const params = {
        account_key: accountKey,
        opaque_auth: opaqueAuth,
    };

    return getXMLWithProxy(endpoint, params);
}

export function setAccountInfo(projectURL, accountKey, opaqueAuth, options) {
    const endpoint = `${projectURL}${SET_ACCOUNT_INFO_SUFFIX}`;
    const params = {
        account_key: accountKey,
        opaque_auth: opaqueAuth,
        ...options,
    };

    return getXMLWithProxy(endpoint, params);
}

export function setHostInfo(projectURL, accountKey, opaqueAuth, hostID, venue) {
    const endpoint = `${projectURL}${SET_HOST_INFO_SUFFIX}`;
    const params = {
        account_key: accountKey,
        opaque_auth: opaqueAuth,
        hostid: hostID,
        venue,
    };

    return getXMLWithProxy(endpoint, params);
}

export function showUser(projectURL, opaqueAuth, options) {
    const endpoint = `${projectURL}${SHOW_USER_SUFFIX}`;
    const params = {
        opaque_auth: opaqueAuth,
        format: 'xml',
        ...options,
    };

    return getXMLWithProxy(endpoint, params);
}
