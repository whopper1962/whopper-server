require("colors");

function request(req) {
  console.log(`METHOD: ${req.method}`);
  console.log(`URL: http://localhost${req.url}`);
}

function response(res) {
  console.log("===================RESPONSE===================");
  console.log("response");
}

function startServer(listeningPort) {
  console.log("==============================================");
  console.group();
  console.log("Server is running...🏃");
  console.log(`👉 ` + `http://localhost:${listeningPort}`.green);
  console.log("\nUse Ctrl+C to stop.");
  console.groupEnd();
  console.log("==============================================");
}

function responsesCreated() {
  console.log("==============================================");
  console.group();
  console.log(`response.txt`.green + " created!");
  console.groupEnd();
  console.log("==============================================");
}

module.exports = {
  request,
  response,
  startServer,
  responsesCreated,
};
