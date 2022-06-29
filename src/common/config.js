const PORTS = {
  BACKEND: 3000,
  FRONTEND: 3001,
};

const SERVER_PORT = process.env.SERVER_PORT || PORTS.BACKEND;

const ROUTES = {
  contacts: '/api/v1/contacts',
};

const ENDPOINTS = {
  contacts: `http://localhost:${SERVER_PORT}${ROUTES.contacts}`,
};

const onStartLogPort = (route) => {
  switch (route) {
    case ROUTES.contacts:
      console.log(
        `Server running. Use our API on port: ${SERVER_PORT}. Endpoint: ${ENDPOINTS.contacts}`
      );
      break;

    default:
      console.log(`Provided route not found: '${route}'`);
  }
};

module.exports = {
  SERVER_PORT,
  ROUTES,
  ENDPOINTS,

  onStartLogPort,
};
