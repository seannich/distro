import { getProjectConfig, getServerStatus } from 'webRPC/project';

const testProjectURL = 'http://boinc.thesonntags.com/collatz/';

test('get project config has project config', () => (
    getProjectConfig(testProjectURL).then(data => (
        expect(data).toHaveProperty('project_config')
    ))
));

test('get server status has server status', () => (
    getServerStatus(testProjectURL).then(data => (
        expect(data).toHaveProperty('server_status')
    ))
));
