import fetchWebRPC from './webRPC';
import {
    TEAM_LOOKUP_SUFFIX, TEAM_MEMBER_LIST_SUFFIX,
} from './settings';

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
