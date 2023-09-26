const fileSystem = require("fs");
const defaultResponse = require("../config/default-response");
const drfaultHeaders = require("../config/default-headers");
const { validateHeaderName } = require("http");

module.exports = async function (urlPath, httpMethod) {
  const filePath = getFilePath(urlPath, httpMethod);
  const defaultResponse = getDefaultResponse(httpMethod);
  const responseJson = await readResponseFile(
    `${__dirname}/../response${filePath}`,
    defaultResponse,
  );
  const headerJson = await readResponseFile(
    `${__dirname}/../headers${filePath}`,
    drfaultHeaders,
  );
  const filteredHeaders = checkHeaders(headerJson);
  return {
    headers: filteredHeaders,
    body: responseJson,
  };
};

function removeQueryParams(url) {
  const index = url.indexOf("?");
  if (index !== -1) {
    return url.substring(0, index);
  }
  return url;
}

function getFilePath(url, httpMethod) {
  const baseUrl = removeQueryParams(url);
  return `${baseUrl}/${httpMethod}.json`;
}

function readResponseFile(filePath, defaultResponse) {
  return new Promise((resolve) => {
    if (!fileSystem.existsSync(filePath)) resolve(defaultResponse);
    fileSystem.readFile(filePath, "utf-8", (error, response) => {
      try {
        resolve(JSON.parse(response));
      } catch {
        resolve(defaultResponse);
      }
    });
  });
}

function getDefaultResponse(httpMethod) {
  return defaultResponse[httpMethod.toLowerCase()];
}

function checkHeaders(headers) {
  if (typeof headers !== "object") return drfaultHeaders;
  return headers;
}
