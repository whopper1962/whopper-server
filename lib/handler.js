const headers = require('../config/response-headers');
const responseJsonGenerator = require('./response-json-generator');

module.exports = async function (req, _, callback) {
  const requestHttpMethod = req.method;
  const requestUrlPath = req.url;

  const responseJson
    = await responseJsonGenerator(requestUrlPath, requestHttpMethod);

  callback(null, {
    headers,
    body: JSON.stringify(responseJson)
  });
}
