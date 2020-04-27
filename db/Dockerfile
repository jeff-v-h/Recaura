FROM mcr.microsoft.com/mssql/server

# Create work directory
RUN mkdir -p /usr/work
WORKDIR /usr/work

# Copy all scripts into working directory
COPY . /usr/work/

# Change to root user and then grant permissions for the import-data script to be executable
USER root
# RUN chmod +x /usr/work/import-data.sh
EXPOSE 1433

# ENTRYPOINT ["/bin/bash", "/usr/work/entrypoint.sh"]
CMD ["/opt/mssql/bin/sqlservr"]

# CMD /bin/bash ./entrypoint.sh