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

#### Pre-Installation

For eventually building the client, there needs to be sufficient space allocated to the virtual machine that will be used to run this project. The following instructions apply to VirtualBox.

1. Open up VirtualBox Manager. Ensure the VM intended to contain this project is not running.
2. Select the VM to be used and click on System heading. This should open up settings at the System tab.
3. Increase the memory capacity if needed. (At time of writing, author's capacity was set to 4096 MB).
4. Click OK.

#### Application

1. In your command terminal, navigate to the root of the directory where docker-compose.yml file is located.
2. Run `docker-compose up`.
3. You may visit [localhost:3000](http://localhost:3000) to view the application. If Docker toolbox is being used (such as for Windows 10 Home), replace localhost with 192.168.99.100 (eg. [http://192.168.99.100:5555](http://192.168.99.100:5555))

## Production

This app is not currently deployed.

## Authors

Jeffrey Huang - jeffvh@outlook.com
