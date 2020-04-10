# Dawn

A project in the midst of development to practice using Clean Architecture in the backend. Physiotherapy management software for entering and storing data for consultations.

## Getting started

This repository houses both front and back-end components of the application. The front-end application sits within the Dawn.ClientApp directory.

### Requirements

#### Front-end

- TypeScript 3.8
- React 16.3
- Redux 4

#### Back-end

- C# .NET Core 3.1
- Entity Framework Core 3.1
- SQL Server

### Installation

The TypeScript api models are automatically generated/updated every time the back-end successfully builds. This file (Dawn.ClientApp/src/api/generated.ts) is committed to source control but should it not be up-to-date, it may be necessary to build the backend first.

#### Back-end

1. Open solution in Visual Studio
2. Target Dawn.Web as starting project and run on IIS Express.

#### Front-end

1. Navigate to Dawn.ClientApp and install project dependencies `npm install`
2. Build and run the app with `npm start`
3. Open up a browser and visit "localhost:3000"

## Production

This app is not currently deployed anywhere

## Authors

Jeffrey Huang - jeffvh@outlook.com