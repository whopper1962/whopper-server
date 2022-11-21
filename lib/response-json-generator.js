const fileSystem = require('fs');
const defaultResponse = require('../config/default-response');

module.exports = async function (urlPath, httpMethod) {
  const filePath = getFilePath(urlPath, httpMethod);
  const defaultResponse = getDefaultResponse(httpMethod);
  const responseJson = await readResponseFile(filePath, defaultResponse);
  return responseJson;
}

function getFilePath (urlPath, httpMethod) {
  return `${__dirname}/../response${urlPath}/${httpMethod}.json`;
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