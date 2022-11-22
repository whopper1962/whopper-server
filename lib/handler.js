const headers = require('../config/default-headers');
const responseGenerator = require('./response-generator');

module.exports = async function (req, _, callback) {
  const requestHttpMethod = req.method;
  const requestUrlPath = req.url;

  const responseJson
    = await responseGenerator(requestUrlPath, requestHttpMethod);

  callback(null, {
    headers: responseJson.headers,
    body: JSON.stringify(responseJson.body)
  });
}
