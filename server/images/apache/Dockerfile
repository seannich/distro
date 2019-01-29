FROM joeltio/boinc_server_apache:4.0.0

# Install python mysqldb for py/Boinc
RUN apt-get update && apt-get install -y python-mysqldb

# Install python-pip and other python packages
COPY requirements.txt $PROJECT_ROOT
RUN apt-get update && apt-get install -y python-pip
RUN pip install -r $PROJECT_ROOT/requirements.txt
