# Space-saver

### Overview
Space-saver is an application developed as part of the CodeDay Labs initiative by Nicklas Di Peitro, Zini Wang, and Robel Hailu. The application allows users to sign up and reserve spaces from businesses that collaborate with the platform.

### Features
- User Authenticaiton 
- Space Booking
- User Management

### Tech Stack
- Backend: NestJS
- Frontend: React, TypeScript

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
###### if you prefer using docker, you can build, run, and stop the containers in your terminal in the root directory of the Space-saver project:
```
docker-compose -f docker-compose.dev.yml build  // building docker containers
docker-compose -f docker-compose.dev.yml up     // running docker containers
docker-compose -f docker-compose.dev.yml down   // stopping docker containers
```
