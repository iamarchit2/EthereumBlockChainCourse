const path = require('path');
const fs = require('fs');
const solc = require('solc')
// Cannot directly require .sol Files.
// Thus, we create a path and access it.

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
// __dirname takes you to the working directory directly.
const source = fs.readFileSync(inboxPath, 'utf8');
// read the file through fs -> FileSync
module.exports = solc.compile(source, 1).contracts[':Inbox'];
