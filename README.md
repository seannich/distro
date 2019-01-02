# distro
distro is an implementation of the BOINC client in JavaScript.


BOINC (Berkeley Open Infrastructure for Network Computing) is an open-source software for computing using volunteered resources.

Currently, the BOINC client works like this:

1. The client fetches new jobs from a scheduling server.
2. The client runs the jobs
3. The client sends the results back to the server for evaluation.

However, the BOINC client is an executable that runs on your computer. This project aims to implement the BOINC client on browsers so that jobs can be executed while browsing the web.
