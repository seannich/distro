How BOINC works
===============
As BOINC is an infrastructure, it is important to keep in mind that there is
more than one component that is under BOINC. However, there are mainly two
components: the client and the server.

Between the client and the server, is an RPC (Remote Procedure Call), which is
just another way of saying that they have a common language to communicate with
each other. The RPC is done through HTTP or HTTPs, or, in other words, it is
done over the web.

Every project (e.g. `Collatz <http://boinc.thesonntags.com/collatz/>`_,
`SETI@Home <https://setiathome.berkeley.edu/>`_, `Cosmo@Home <http://www.astronomysource.com/tag/cosmoshome/>`_
, etc.) has its own server.

Accounts
--------
Most projects require users to sign up for an account with the server. When a
user registers for an account, the server replies with an authenticator token
which will be used for further correspondence to authenticate the user.

Scheduler Servers
-----------------
Once users have signed up for an account, they can start to request for work
to do.

Firstly, the BOINC client downloads the page from project's master URL. From
XML tags embedded in this page, it obtains a list of domain names of
schedulers.

Secondly, the BOINC client sends the authenticator token and some information
about the computer's CPU and memory to the scheduling server. The scheduling
server creates a new host and replies with some links of where to download the
input files. A `host` is a computer that runs the jobs.

Input and Output Files
----------------------
BOINC runs jobs by using the input files given by the scheduling server. After
running the jobs, the program should have some output files. These output files
are then uploaded to the BOINC server.

Result Submission
-----------------
Although the output files have already been uploaded to the BOINC server, these
output files have no meaning to the BOINC server. The BOINC client, after
uploading the files, then notifies the BOINC scheduling server that it has
completed the job, and that the results are located on the BOINC server.

If all goes well, the BOINC scheduling server will accept the result. The
client will then request for more work to do.

Validation
----------
Since all this work is done on untrusted machines, it is important to ensure
that the results from the users are valid. Hence, BOINC implements a few
different ways to ensure that the results are valid. The most simple method is
to duplicate jobs for other hosts to do and then cross validate.

.. toctree::
