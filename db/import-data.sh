# wait for the SQL Server to come up
sleep 90s

#run the setup script to create the DB and the schema in the DB
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "recApp123" -i setup.sql

# import the data from the csv file
/opt/mssql-tools/bin/bcp Recauradb.dbo.Patients in "/usr/work/patients.csv" -c -t'|' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.Practitioners in "/usr/work/practitioners.csv" -c -t'|' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.CaseFiles in "/usr/work/casefiles.bcp" -c -t',' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.Consultations in "/usr/work/consults.csv" -c -t'|' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.ObjectiveAssessments in "/usr/work/objective.csv" -c -t'|' -S localhost -U sa -P "recApp123"
/opt/mssql-tools/bin/bcp Recauradb.dbo.SubjectiveAssessments in "/usr/work/subjective.csv" -c -t'|' -S localhost -U sa -P "recApp123"