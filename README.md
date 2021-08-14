# Interview Scheduler

Interview Scheduler is an React app to allow users to book and cancel interviews by entering a name and by choosing an interviewer from a provided list. 

We combine a concise API with a WebSocket server to build a realtime experience.


## Functionalities
* Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
* Data is persisted by the API server using a PostgreSQL database.
* The client application communicates with an API server over HTTP, using the JSON format.
* Jest tests are used through the development of the project.

## Dependencies
* axios
* @testing-library/react-hooks
* react-test-renderer
* cypress 
* storybook


## Setup

Install dependencies with `npm install`.

Make sure to also clone this project and follow the set up instructions there. This will be your database. 
https://github.com/x-c-li/scheduler-api

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test Framework

Cypress is set to run with test data in this project. 

Make sure to type the following into scheduler-api:

```sh
NODE_ENV=test npm start
```
Make sure to type the following into scheduler:

```sh
npm run cypress
```

## Final Product 
![ How the App Works](https://github.com/x-c-li/scheduler/blob/master/docs/scheduler.gif)
