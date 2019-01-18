import { toCORSProxyURL } from './webRPC/webRPC';

const projectURL = 'http://boinc.thesonntags.com/collatz/';

// const a = createAccount(
//     projectURL, 'joeltiojinhon@gmail.com', 'EbF1e5j18M9wLUU&3IfW@245aG',
//     'joeltio', false, 'URL',
// );

const scheduler = 'https://boinc.thesonntags.com/collatz_cgi/cgi';
const hostID = 1594349;
const authenticator = 'dcf5c6dd3e02d73edfdb63febe3dcd56';

const request = `<scheduler_request>
    <platform_name>i686-pc-linux-gnu</platform_name>
    <core_client_major_version>7</core_client_major_version>
    <core_client_minor_version>7</core_client_minor_version>
    <authenticator>${authenticator}</authenticator>
    <hostid>${hostID}</hostid>
    <host_info>
        <ip_addr>127.0.0.1</ip_addr>
        <conn_frac>0.000000</conn_frac>
        <on_frac>0.000000</on_frac>
        <p_ncpus>1</p_ncpus>
        <p_vendor>GenuineIntel</p_vendor>
        <p_model>Pentium</p_model>
        <p_fpops>0.000000</p_fpops>
        <p_iops>0.000000</p_iops>
        <p_membw>0.000000</p_membw>
        <p_calculated>0.000000</p_calculated>
        <os_name>Linux</os_name>
        <os_version>2.2.14-5.0</os_version>
        <m_nbytes>197427200.000000</m_nbytes>
        <m_cache>131072.000000</m_cache>
        <m_swap>178012160.000000</m_swap>
        <d_total>22108344320.000000</d_total>
        <d_free>18332545024.000000</d_free>
        <n_bwup>0.000000</n_bwup>
        <n_bwdown>0.000000</n_bwdown>
    </host_info>
</scheduler_request>`;

import axios from 'axios';
const newURL = toCORSProxyURL(scheduler);
const a = axios.post(newURL, request, { crossDomain: true });

console.log(a);
window.asdf = a;

// authenticator: dcf5c6dd3e02d73edfdb63febe3dcd56
