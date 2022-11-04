const PORTS = {
  BACKEND: 3000,
  FRONTEND: 3001,
};
const { PORT } = process.env;

const SERVER_PORT = PORT || PORTS.BACKEND;

const baseUrl = '/api/v1';

const ROUTES = {
  users: `${baseUrl}/users`,
  contacts: `${baseUrl}/contacts`,
};

// for testing
const loginRoute = `${ROUTES.users}/login`;
const verifyEmailRoute = `${ROUTES.users}/verify`;

const localhost = 'http://localhost';

const ENDPOINTS = {
  contacts: `${localhost}:${SERVER_PORT}${ROUTES.contacts}`,
  users: `${localhost}:${SERVER_PORT}${ROUTES.users}`,
};

const logPort = (route) => {
  switch (route) {
    case ROUTES.contacts:
      console.log(
        `Server started. Endpoints: ${ENDPOINTS.contacts}\n ${ENDPOINTS.users}`,
      );
      break;

    default:
      console.log(`Provided route not found: '${route}'`);
  }
};

module.exports = {
  SERVER_PORT,
  ROUTES,
  loginRoute,
  verifyEmailRoute,

  ENDPOINTS,

  logPort,
};
