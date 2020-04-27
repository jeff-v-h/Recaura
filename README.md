# Recaura

A project in the midst of development to practice using Clean Architecture in the backend. Physiotherapy management software for entering and storing data for consultations.

## Getting started

This repository houses both front and back-end components of the application. The front-end application sits within the Recaura.ClientApp directory.

### Requirements

- Docker 19.03.1

#### Front-end

- TypeScript 3.8
- React 16.3
- Redux 4

#### Back-end

- C# .NET Core 3.1
- Entity Framework Core 3.1
- SQL Server 2019

### Installation

The TypeScript api models are automatically generated/updated every time the back-end successfully builds. This file (Recaura.ClientApp/src/api/generated.ts) is committed to source control but should it not be up-to-date, it may be necessary to build the backend first.

When starting up for the first time, for data to seed properly, it will be necessary to allow the database to start up first before the api is initiated.
There are currently [open issues](https://github.com/Microsoft/mssql-docker/issues/229) for ease of seeding data into SQL Server Docker container.

#### Database

1. Make sure [Docker](https://docs.docker.com/get-docker/) is installed on your local machine.
2. In your command terminal, navigate to the root of the directory where docker-compose.yml file is located.
3. Run `docker-compose up sqlserver`.

#### Application

Note: For data to be seeded initially, allow the database container to be completed

1. In your command terminal, navigate to the root of the directory where docker-compose.yml file is located.
2. Run `docker-compose up`.
3. You may visit [localhost:3000](http://localhost:3000) to view the application. The api swagger can be viewed at [localhost:5555/swagger](http://localhost:5555/swagger). If Docker toolbox is being used (such as for Windows 10 Home), replace localhost with 192.168.99.100 (eg. [http://192.168.99.100:5555/swagger](http://192.168.99.100:5555/swagger))

## Production

This app is not currently deployed.

## Authors

Jeffrey Huang - jeffvh@outlook.com
