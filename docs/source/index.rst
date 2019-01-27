.. distro. documentation master file, created by
   sphinx-quickstart on Sat Jan 26 21:47:34 2019.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Overview
========
What is distro?
^^^^^^^^^^^^^^^^
distro is a project by two Ngee Ann Polytechnic students, Joel Tio and Sean Nicholas, regarding the donation of computational power.

What do we do?
^^^^^^^^^^^^^^
We make the donation of computational power to science more covenient unlike the current `Beverly Open Infrastructure for Network Computing (BOINC) <https://boinc.berkeley.edu/>`_ clients.

Why do we do it?
^^^^^^^^^^^^^^^^
We made this project because people aren't really willing to download the BOINC client.

How do we do it?
^^^^^^^^^^^^^^^^
We run jobs using JavaScript after fetching them from a BOINC server.

Example 1 of code: ::

	print('i am using distro')
	>> i am using distro

Example 2 of code: ::

	print('something')
	>> something


How BOINC works:
================
The BOINC core client communicates with several servers in the course of getting work and returning results. All communication uses HTTP on port 80, so client can function through firewalls and proxies.

* The client downloads the page from project's master URL. From XML tags embedded in this page, it obtains a list of domain names of schedulers.

* The client exchanges request and reply messages with a scheduling server. The reply message contains, among other things, descriptions of work to be performed, and lists of URLs of the input and output files of that work. 

* The client downloads files (application programs and data files) from one or more download data servers. This uses standard HTTP GET requests, perhaps with Range commands to resume incomplete transfers. 

* After the computation is complete, the client uploads the result files. This uses a BOINC-specific protocol that protects against DOS attacks on data servers. 

* The client then contacts a scheduling server again, reporting the completed work and requesting more work. 


Usage:
^^^^^^

.. toctree::
   :maxdepth: 2

   documentation
   license
   help

