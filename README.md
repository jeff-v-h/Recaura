# Recaura

A project in the midst of development to practice using Docker. Physiotherapy management software for entering and storing data for consultations.

## Getting started

### Requirements

- Docker

#### Front-end

- TypeScript
- React
- Redux

#### Back-end

- Node.js
- Express
- Mongoose
- MongoDB

### Installation

The project can be built and run on local machine or using docker. Setting up to develop locally is advised if front-end causes major lag for your pc. The front-end is currently also not set up for hot module replacement. To set this up, webpack.dev will need to have the watchOptions uncommented.

#### Client Local Development

1. Change directory to client `cd client`
2. Install dependencies `npm i`
3. Run development `npm run dev`
4. Open browser to [localhost:3000](http://localhost:3000)

#### API Local Development

1. From root, change directory to api directory `cd api`
2. Install dependencies `npm i`
3. Run development `npm run dev`
4. Make sure [MongoDB](https://www.mongodb.com/download-center/community) is installed on local machine.

#### Docker Pre-Installation

For eventually building the client, there needs to be sufficient space allocated to the virtual machine that will be used to run this project. The following instructions apply to VirtualBox.

1. Open up VirtualBox Manager. Ensure the VM intended to contain this project is not running.
2. Select the VM to be used and click on System heading. This should open up settings at the System tab.
3. Increase the memory capacity if needed. (At time of writing, author's capacity was set to 4096 MB).
4. Click OK.

#### Docker Development (Client and API)

1. In your command terminal, navigate to the root of the directory where docker-compose.yml file is located.
2. Run `docker-compose up`.
3. You may visit [localhost:3000](http://localhost:3000) to view the application. If Docker toolbox is being used (such as for Windows 10 Home), replace localhost with 192.168.99.100 (eg. [http://192.168.99.100:5000](http://192.168.99.100:5000))

## Production

CI/CD is setup with Travis CI to store docker images on Docker Hub and then deployed to AWS

1. Merge features to develop branch and then merge develop branch into master.
2. New commits to master branch will automatically trigger the CI/CD process.

## Authors

Jeffrey Huang - jeffvh@outlook.com
