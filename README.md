# distro
distro is an implementation of the BOINC client in JavaScript.


BOINC (Berkeley Open Infrastructure for Network Computing) is an open-source software for computing using volunteered resources.

Currently, the BOINC client works like this:

1. The client fetches new jobs from a scheduling server.
2. The client runs the jobs
3. The client sends the results back to the server for evaluation.

However, the BOINC client is an executable that runs on your computer. This project aims to implement the BOINC client on browsers so that jobs can be executed while browsing the web.

## Running / Testing this project

1. [Install yarn](https://yarnpkg.com/en/docs/install).
2. Run `yarn install -g http-server`. This will install a http server to load
the sample page.
3. Run `yarn install`. This will install all the dependencies used by this
project.
4. Run `yarn run webpack`. This will build the minifed JavaScript file that is
used by `index.html`.
5. Run `http-server .` in the same directory as `index.html`. This will start
the http server.
6. Go to `http://127.0.0.1:8080`
7. 🎉🎉🎉

You can also run `yarn run watch` instead of `yarn run webpack` to have webpack
watch for any changes to the file.

## Building for production
Run `yarn run prod`. This will build a production version of the minifed
JavaScript.
