import http = require("http");
import fs = require("fs");
import url = require("url");

const host = "127.0.0.1";
const port = 8080;

http
  .createServer((req, res) => {
    if (req.url == null) {
      return;
    }
    const path = url.parse(req.url);
    if (path.path == null || path.path === "/") {
      fs.readFile("index.html", (_, file) => {
        res.end(file);
      });
    } else {
      fs.readFile(`.${path.path}`, (err, file) => {
        if (err) {
          console.log(`${path.path} notfound.`);
          res.end();
          return;
        }
        res.end(file);
      });
    }
  })
  .listen(port, host);

console.log(`http://${host}:${port}`);
