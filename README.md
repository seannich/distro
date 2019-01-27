# distro
distro is an implementation of the BOINC client in JavaScript.


BOINC (Berkeley Open Infrastructure for Network Computing) is an open-source software for computing using volunteered resources.

Currently, the BOINC client works like this:

1. The client fetches new jobs from a scheduling server.
2. The client runs the jobs
3. The client sends the results back to the server for evaluation.

However, the BOINC client is an executable that runs on your computer. This project aims to implement the BOINC client on browsers so that jobs can be executed while browsing the web.

## Overview

This project has three components:
1. The distro client (in `client/`)
2. A CORS Proxy (in `proxy/`)
3. An example BOINC server that supports distro (in `server/`)

You will need the following to run the components:
1. [yarn](https://yarnpkg.com/)
2. [Docker with docker-compose](https://www.docker.com/)

The distro client is a JavaScript file that communicates with the BOINC server. It retrieves jobs and executes them. After that, it sends the results back to the BOINC server.

The CORS Proxy allows the BOINC server to be accessed by the distro client. As BOINC servers currently do not implement [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), this CORS proxy is needed to allow distro to talk to the BOINC server.

Lastly, the BOINC server houses (and generates) all the jobs for distro to run. Typically BOINC servers generate jobs and houses executables (e.g. .exe) for the client to download and run.

## Building and running the distro client
1. Run `yarn install -g http-server`. This will install a http server to load
the sample page.
2. Run `yarn install`. This will install all the dependencies used by this
project.
3. Run `yarn run webpack`. This will build the minifed JavaScript file that is
used by `index.html`.
4. Run `http-server .` in the same directory as `index.html`. This will start
the http server.
5. Go to `http://127.0.0.1:8080`
6. 🎉🎉🎉

You can also run `yarn run watch` instead of `yarn run webpack` to have webpack
watch for any changes to the file.

To build for production, run `yarn run prod`.

## Running the CORS Proxy
1. Run `yarn install`
2. Run `yarn run app`
3. That's all!

## Running the BOINC server
1. Run `docker-compose up` or `sudo docker-compose up` if you do not have sufficient privileges
2. You should now see the project page at `http://127.0.0.1/boincserver`
