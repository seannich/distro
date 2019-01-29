import md5 from 'md5';
import { j2xParser as ToXMLParser } from 'fast-xml-parser';
import { getWithProxy, postWithProxyXML } from './webRPC';
import {
    PLATFORM_NAME, CLIENT_MAJOR_VERSION, CLIENT_MINOR_VERSION,
    HOST_NCPUS, HOST_CPU_VENDOR, HOST_CPU_MODEL, HOST_FPOPS, HOST_IOPS,
    HOST_MEMBW, HOST_CALCULATED, HOST_RAM_BYTES, HOST_CPU_CACHE,
    HOST_SWAP_SPACE, HOST_TOTAL_DISK_SPACE, HOST_AVAIL_DISK_SPACE,
    HOST_NETWORK_BW_DOWN, HOST_NETWORK_BW_UP, WORK_REQ_SECONDS,
    FILE_UPLOAD_SUFFIX, RESULT_FILES_UPLOADED,
} from './settings';

// Ensure that the XML is formatted (each tag is on a new line) so that the XML
// parser on the BOINC server can parse the tags.
const JSONToXMLParser = new ToXMLParser({ format: true });

function generateHostInfo() {
    return `
        <host_info>
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
        </host_info>`;
}

export async function getSchedulerURL(projectURL) {
    const response = await getWithProxy(projectURL);
    // Try and get the scheduler URL from the HTML comment
    let result = /<head>(?:.|\n)*?<!--(?:.|\n)*?<scheduler>((?:.|\n)*)<\/scheduler>(?:.|\n)*?-->(?:.|\n)*?<\/head>/g.exec(response.data);

    if (result === null) {
        // Try and get from a link tag
        result = /<link rel="boinc_scheduler" href="(.*)"/g.exec(response.data);
    }

    if (result !== null) {
        return result[1];
    }

    throw new Error(response);
}

export function fetchWork(schedulerURL, authenticator, hostID) {
    const payload = `
        <scheduler_request>
            <platform_name>${PLATFORM_NAME}</platform_name>
            <core_client_major_version>${CLIENT_MAJOR_VERSION}</core_client_major_version>
            <core_client_minor_version>${CLIENT_MINOR_VERSION}</core_client_minor_version>
            <authenticator>${authenticator}</authenticator>
            ${hostID ? `<hostid>${hostID}</hostid>` : ''}
            <work_req_seconds>${WORK_REQ_SECONDS}</work_req_seconds>
            ${generateHostInfo()}
        </scheduler_request>`;

    return postWithProxyXML(schedulerURL, payload);
}

function getUploadFileURL(schedulerURL) {
    // Remove the "cgi/" part
    const segments = schedulerURL.split('/');

    // Check for trailing slash
    if (segments[segments.length - 1] === '') {
        segments.pop();
    }
    segments.pop();

    segments.push(FILE_UPLOAD_SUFFIX);
    return segments.join('/');
}

export function uploadFile(schedulerURL, fileInfo, data) {
    const payload = `
        <data_server_request>
            <core_client_major_version>${CLIENT_MAJOR_VERSION}</core_client_major_version>
            <core_client_minor_version>${CLIENT_MINOR_VERSION}</core_client_minor_version>
            <core_client_release>1</core_client_release>
            <file_upload>
                <file_info>
                    ${JSONToXMLParser.parse(fileInfo)}
                </file_info>
                <nbytes>${data.length}</nbytes>
                <md5_cksum>${md5(data)}</md5_cksum>
                <offset>0</offset>
            <data>\n${data}`;

    const URL = getUploadFileURL(schedulerURL);
    return postWithProxyXML(URL, payload);
}

export function sendWork(schedulerURL, authenticator, hostID, taskName, files) {
    let fileInfo = '';

    files.forEach((file) => {
        fileInfo += `
            <file_info>
                ${JSONToXMLParser.parse(file)}
            </file_info>`;
    });

    const payload = `
        <scheduler_request>
            <authenticator>${authenticator}</authenticator>
            <hostid>${hostID}</hostid>
            <platform_name>browser</platform_name>
            ${generateHostInfo()}
            <result>
                <name>${taskName}</name>
                <state>${RESULT_FILES_UPLOADED}</state>
                <final_cpu_time>0</final_cpu_time>
                ${fileInfo}
            </result>
        </scheduler_request>
    `;

    return postWithProxyXML(schedulerURL, payload);
}
