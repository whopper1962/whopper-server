const fileSystem = require('fs');
const defaultResponse = require('../config/default-response');
const drfaultHeaders = require('../config/default-headers');

module.exports = async function (urlPath, httpMethod) {
  const filePath = getFilePath(urlPath, httpMethod);
  const defaultResponse = getDefaultResponse(httpMethod);
  const responseJson
    = await readResponseFile(`${__dirname}/../response${filePath}`, defaultResponse);
  const headerJson
    = await readResponseFile(`${__dirname}/../headers${filePath}`, drfaultHeaders);
  return {
    headers: headerJson,
    body: responseJson
  };
}

function getFilePath (urlPath, httpMethod) {
  return `${urlPath}/${httpMethod}.json`;
}

function readResponseFile (filePath, defaultResponse) {
  return new Promise((resolve) => {
    fileSystem.readFile(filePath, 'utf-8', (error, response) => {
      if (error) return resolve(defaultResponse);
      resolve(JSON.parse(response));
    });
  });
}

function getDefaultResponse(httpMethod) {
  return defaultResponse[httpMethod.toLowerCase()];
}