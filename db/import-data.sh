# Currently open issue for a better way to import data: https://github.com/Microsoft/mssql-docker/issues/229
# wait for the SQL Server to come up
sleep 90s

#run the setup script to create the DB and the schema in the DB
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "recApp123" -i setup.sql

# import the data from the csv file
/opt/mssql-tools/bin/bcp Recauradb.dbo.Patients in "/usr/work/seeddata/patients.csv" -c -t'|' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.Practitioners in "/usr/work/seeddata/practitioners.csv" -c -t'|' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.CaseFiles in "/usr/work/seeddata/casefiles.bcp" -c -t',' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.CaseFiles in "/usr/work/seeddata/casefiles2.bcp" -c -t',' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.Consultations in "/usr/work/seeddata/consults.csv" -c -t'|' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.ObjectiveAssessments in "/usr/work/seeddata/objective.csv" -c -t'|' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.SubjectiveAssessments in "/usr/work/seeddata/subjective.csv" -c -t'|' -S localhost -U sa -P "recApp123"