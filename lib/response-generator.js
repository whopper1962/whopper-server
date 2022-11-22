const fileSystem = require('fs');
const defaultResponse = require('../config/default-response');
const drfaultHeaders = require('../config/default-headers');
const { validateHeaderName } = require('http');

module.exports = async function (urlPath, httpMethod) {
  const filePath = getFilePath(urlPath, httpMethod);
  const defaultResponse = getDefaultResponse(httpMethod);
  const responseJson
    = await readResponseFile(`${__dirname}/../response${filePath}`, defaultResponse);
  const headerJson
    = await readResponseFile(`${__dirname}/../headers${filePath}`, drfaultHeaders);
  const filteredHeaders = checkHeaders(headerJson);
  return {
    headers: filteredHeaders,
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

function checkHeaders (headers) {
  if (typeof headers !== 'object') return drfaultHeaders;
  return headers;
  // for (const [key, value] of Object.entries(headers)) {
  //   console.log('KEY:', key);
  //   console.log('VALUE:', value);
  //   console.log(validateHeaderName(key, value));
  // }
}