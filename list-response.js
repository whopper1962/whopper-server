const fileSystem = require('fs');
const logger = require('./lib/logger');

(function main () {
  const files = getFilesRecursively('./response');
  writeFile(files);
})();

function getFilesRecursively (dirPath, files = []) {
  const dirContents = fileSystem.readdirSync(dirPath);
  for (const content of dirContents) {
    const currentPath = `${dirPath}/${content}`;
    if (fileSystem.statSync(currentPath).isDirectory()) {
      getFilesRecursively(currentPath, files);
    } else if (currentPath.slice(-9) !== '/.gitkeep') {
      files.push(currentPath);
    }
  }
  return files;
}

function writeFile (files) {
  if (files.length === 0) throw new Error('Must declare at least one response.');
  for (const [index, file] of files.entries()) {
    if (index === 0) {
      fileSystem.writeFileSync('response.txt', `${file.slice(11)}\n`);
    } else {
      fileSystem.appendFileSync('response.txt', `${file.slice(11)}\n`);
    }
  }
  logger.responsesCreated();
}
