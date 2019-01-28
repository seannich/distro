import { createAccount } from './webRPC/account';
import {
    fetchWork, sendWork, uploadFile, getSchedulerURL,
} from './webRPC/scheduler';

const projectURL = 'http://127.0.0.1/boincserver/';

// Creat an account
async function main() {
    const schedulerURL = await getSchedulerURL(projectURL);

    const { account_out: { authenticator } } = await createAccount(
        projectURL, 'blahblah@gmail.com', 'password', 'blah', true, 'web',
    );

    const workResponse = await fetchWork(schedulerURL, authenticator);

    const fileInfo = workResponse.scheduler_reply.file_info[2];
    const hostID = workResponse.scheduler_reply.hostid;
    const taskName = workResponse.scheduler_reply.result.name;

    await uploadFile(schedulerURL, authenticator, 'hello there, general kenobi');
    sendWork(schedulerURL, authenticator, hostID, taskName, [fileInfo]);
}

main();
