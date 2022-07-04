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

const ENDPOINTS = {
  contacts: `http://localhost:${SERVER_PORT}${ROUTES.contacts}`,
};

const logPort = (route) => {
  switch (route) {
    case ROUTES.contacts:
      console.log(`Server started. Endpoint: ${ENDPOINTS.contacts}`);
      break;

    default:
      console.log(`Provided route not found: '${route}'`);
  }
};

module.exports = {
  SERVER_PORT,
  ROUTES,
  ENDPOINTS,

  logPort,
};
