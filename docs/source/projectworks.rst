How the project works
=====================

The Client (distro)
-------------------
The client does everything a normal BOINC client does, except that there is
little to no user interface (so that the user can continue to browse on the
site that they are in).

The client is completely implemented in JavaScript.

The Proxy
---------
As BOINC servers currently do not support `CORS <https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>`_,
a CORS proxy is needed so that distro can communicate with the BOINC server.

The CORS proxy runs an Express server and requests with whatever URL that
follows its own URL. The server then pipes the request back as a response.

The BOINC server implementation
-------------------------------
The BOINC server provided in the distro project is a minimal example of what
needs to be done to start using distro (spoiler: it's not much!).

The BOINC server is created using `boinc-server-docker <https://github.com/marius311/boinc-server-docker>`_
with some adaptation for it to work on Mac.

.. toctree::
