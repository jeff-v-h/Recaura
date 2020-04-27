# SQL Server process must be right most command to be the foreground process.
# All other commands are run in the background. 
# If script was in foreground, the container would shutdown when it completes
/usr/work/import-data.sh & /opt/mssql/bin/sqlservr