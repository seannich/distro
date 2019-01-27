import { getWithProxy, postWithProxyXML } from './webRPC';
import {
    PLATFORM_NAME, CLIENT_MAJOR_VERSION, CLIENT_MINOR_VERSION,
    HOST_NCPUS, HOST_CPU_VENDOR, HOST_CPU_MODEL, HOST_FPOPS, HOST_IOPS,
    HOST_MEMBW, HOST_CALCULATED, HOST_RAM_BYTES, HOST_CPU_CACHE,
    HOST_SWAP_SPACE, HOST_TOTAL_DISK_SPACE, HOST_AVAIL_DISK_SPACE,
    HOST_NETWORK_BW_DOWN, HOST_NETWORK_BW_UP, WORK_REQ_SECONDS,
} from './settings';

export function getSchedulerURL(projectURL) {
    return getWithProxy(projectURL)
        .then(response => new Promise((resolve, reject) => {
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
        }));
}

export function createHost(schedulerURL, authenticator) {
    const payload = `
        <scheduler_request>
            <platform_name>${PLATFORM_NAME}</platform_name>
            <core_client_major_version>${CLIENT_MAJOR_VERSION}</core_client_major_version>
            <core_client_minor_version>${CLIENT_MINOR_VERSION}</core_client_minor_version>
            <authenticator>${authenticator}</authenticator>
            <host_info>
                <conn_frac>0.000000</conn_frac>
                <on_frac>0.000000</on_frac>
                <p_ncpus>${HOST_NCPUS}</p_ncpus>
                <p_vendor>${HOST_CPU_VENDOR}</p_vendor>
                <p_model>${HOST_CPU_MODEL}</p_model>
                <p_fpops>${HOST_FPOPS}</p_fpops>
                <p_iops>${HOST_IOPS}</p_iops>
                <p_membw>${HOST_MEMBW}</p_membw>
                <p_calculated>${HOST_CALCULATED}</p_calculated>
                <os_name>Mac OS</os_name>
                <os_version>10.14.2</os_version>
                <m_nbytes>${HOST_RAM_BYTES}</m_nbytes>
                <m_cache>${HOST_CPU_CACHE}</m_cache>
                <m_swap>${HOST_SWAP_SPACE}</m_swap>
                <d_total>${HOST_TOTAL_DISK_SPACE}</d_total>
                <d_free>${HOST_AVAIL_DISK_SPACE}</d_free>
                <n_bwup>${HOST_NETWORK_BW_UP}</n_bwup>
                <n_bwdown>${HOST_NETWORK_BW_DOWN}</n_bwdown>
            </host_info>
        </scheduler_request>`;

    // This response usually throws an XML parsing error because there may be
    // an ampersand in the XML that is not escaped. This error can be ignored
    // as the fast-xml-parser parses the XML fine.
    return postWithProxyXML(schedulerURL, payload);
}

export function fetchWork(schedulerURL, authenticator, hostID) {
    const payload = `
        <scheduler_request>
            <platform_name>${PLATFORM_NAME}</platform_name>
            <core_client_major_version>${CLIENT_MAJOR_VERSION}</core_client_major_version>
            <core_client_minor_version>${CLIENT_MINOR_VERSION}</core_client_minor_version>
            <authenticator>${authenticator}</authenticator>
            <hostid>${hostID}</hostid>
            <work_req_seconds>${WORK_REQ_SECONDS}</work_req_seconds>
        </scheduler_request>`;

    return postWithProxyXML(schedulerURL, payload);
}
