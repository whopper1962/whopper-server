const findFreePort = require("find-free-port");

const PORT_FROM = 3000;

module.exports = function () {  
  return new Promise((resolve) => {
    findFreePort(PORT_FROM, (_, freePort) => {
      resolve(freePort);
    });
  });
};