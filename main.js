const mocky = require('mocky');

const handler = require('./lib/handler');
const logger = require('./lib/logger');
const findAvailablePort = require('./lib/find-aveilable-port');

const httpMethods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'];

async function main () {
  const listeningPort = await findAvailablePort();
  logger.startServer(listeningPort);
  const routes = httpMethods.map((method) => {
    return {
      url: new RegExp('/*'),
      method: method,
      res: handler
    };
  });
  mocky.createServer(routes).listen(listeningPort);
}

main();