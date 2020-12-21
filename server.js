const hostname = '127.0.0.1';
const port = 5500;

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path')
const morgan = require('morgan')

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan(':remote-addr - :method :url :status - :response-time ms'))

app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/:adress', async function (req, res) {
  res.sendFile(path.join(__dirname + `/public/${req.params.adress}.html`));
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});