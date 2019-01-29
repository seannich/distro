FROM boinc/server_makeproject:4.0.0

USER $BOINC_USER

COPY config.xml $PROJECT_ROOT
COPY project.xml $PROJECT_ROOT
COPY templates $PROJECT_ROOT/templates
COPY apps $PROJECT_ROOT/apps
COPY py $PROJECT_ROOT/py
COPY bin $PROJECT_ROOT/bin
COPY results $PROJECT_ROOT/results

# The files belong to root
USER root
RUN chown -R $BOINC_USER:$BOINC_USER $PROJECT_ROOT
