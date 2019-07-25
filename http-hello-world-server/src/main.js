import http from "http";

const server = http.createServer((request, response) => {
  response.end("Hello World!\n");
});

server.listen(8080);
