const app = require('./src/app');
const {SERVER_PORT, onStartLogPort, ROUTES} = require('./src/common/config');

app.listen(SERVER_PORT, () => onStartLogPort(ROUTES.contacts));
