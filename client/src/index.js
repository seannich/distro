import { createAccount } from './webRPC/account';
import {
    fetchWork, sendWork, uploadFile, getSchedulerURL, getFile,
} from './webRPC/scheduler';

const projectURL = 'http://127.0.0.1/boincserver/';

async function getMainProgram(workResponse) {
    const fileInfos = workResponse.scheduler_reply.file_info;

    const mainFileInfo = fileInfos.find(fileInfo => (
        fileInfo.executable === ''
    ));

    if (mainFileInfo !== undefined) {
        return getFile(mainFileInfo);
    }

    throw new Error('There is no main program in the workResponse');
}

async function requestDelay(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds);
    });
}

// Create an account
async function main() {
    const schedulerURL = await getSchedulerURL(projectURL);

    const { account_out: { authenticator } } = await createAccount(
        projectURL, 'blahblah@gmail.com', 'password', 'blah', true, 'web',
    );

    let delay = requestDelay(0);
    let hostID;
    while (true) {
        await delay;
        let workResponse;
        if (hostID === undefined) {
            workResponse = await fetchWork(schedulerURL, authenticator);
        } else {
            workResponse = await fetchWork(schedulerURL, authenticator, hostID);
        }

        // Start the timeout
        delay = requestDelay(workResponse.scheduler_reply.request_delay * 1000);

        // Get the main file
        const mainFile = await getMainProgram(workResponse);
        window.eval(mainFile);
        const result = window.jobMain(workResponse.scheduler_reply.workunit.command_line);

        const fileInfo = workResponse.scheduler_reply.file_info[1];
        const newHostID = workResponse.scheduler_reply.hostid;
        if (newHostID !== undefined) {
            hostID = newHostID;
        }
        const taskName = workResponse.scheduler_reply.result.name;

        await uploadFile(schedulerURL, fileInfo, result);
        await sendWork(schedulerURL, authenticator, hostID, taskName, [fileInfo]);
    }
}

main();
