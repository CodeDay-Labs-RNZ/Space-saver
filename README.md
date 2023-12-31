# Space-saver

### Overview
Space-saver is an application developed by [Nicklas Di Pietro](https://www.linkedin.com/in/nicklasdipietro/), [Zini Wang](https://www.linkedin.com/in/ziniwang/), and [Robel Hailu](https://www.linkedin.com/in/robelhailu/) as part of the CodeDay Labs summer internship. The application allows users to sign up and reserve spaces from businesses that collaborate with the platform.

### Features
- User Authenticaiton 
- Space Booking
- User Management

### Tech Stack
- **Backend**: NestJS
- **Frontend**: React, TypeScript

### Prerequisites
- Node.js
- npm
- Docker (optional)


## Installation

#### Backend 
```
cd backend
npm install
```

#### Fronted
```
cd frontend
npm install
```


## Running the application

#### Backend 
```
npm run start:dev
```

#### Fronted
```
npm run start
```

#### Docker Support
###### if you prefer using docker, you can run, and stop the containers in your terminal in the root directory of the Space-saver project:
```
docker-compose -f docker-compose.dev.yml build   // not needed: building docker containers done in scripts
docker-compose -f docker-compose.dev.yml up      // running docker containers
docker-compose -f docker-compose.dev.yml down    // stopping docker containers
```
