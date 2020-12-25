// To RUN: EXE[node .]

const hostname = '127.0.0.1';
const port = 5500;

import http from "http";
import express from "express";
import path from "path";
import morgan from "morgan";

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan(':remote-addr - :method :url :status - :response-time ms'))

app.get('/', async (req: any, res: any) => {
  res.sendFile(path.join(__dirname + 'public/html/index.html'));
});

app.get('/:adress', async (req: any, res: any) => {
  res.sendFile(path.join(__dirname + `/../public/${req.params.adress}.html`));
});

// listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});