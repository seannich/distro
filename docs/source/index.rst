.. distro documentation master file, created by
   sphinx-quickstart on Sun Jan 27 21:36:19 2019.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Introduction
============

distro is an implementation of the BOINC Client in JavaScript.

`BOINC (Berkeley Open Infrastructure for Network Computing) <https://boinc.berkeley.edu/>`_. is an open-source
software for computing using volunteered resources.

Currently, the BOINC client works like this:
1. The client fetches new jobs from a scheduling server.
2. The client runs the jobs (e.g. checking if a number is prime).
3. The client sends the results back to the server for evaluation.

distro does all this, but without the need to install the BOINC client. distro
runs on your browser. Whenever you visit a site with distro, it will use your
computer to do computation in the background.

This project is done by two Ngee Ann Polytechnic students, Joel Tio and Sean Nicholas.

.. toctree::
   :maxdepth: 2
   :caption: Overview

   usage
   boincworks
   projectworks
   license
