How BOINC works
===============
The BOINC core client communicates with several servers in the course of getting work and returning results. All communication uses HTTP on port 80, so client can function through firewalls and proxies.

* The client downloads the page from project's master URL. From XML tags embedded in this page, it obtains a list of domain names of schedulers.
    
* The client exchanges request and reply messages with a scheduling server. The reply message contains, among other things, descriptions of work to be performed, and lists of URLs of the input and output files of that work.
    
* The client downloads files (application programs and data files) from one or more download data servers. This uses standard HTTP GET requests, perhaps with Range commands to resume incomplete transfers.
   
* After the computation is complete, the client uploads the result files. This uses a BOINC-specific protocol that protects against DOS attacks on data servers.
    
* The client then contacts a scheduling server again, reporting the completed work and requesting more work. 

.. toctree::
