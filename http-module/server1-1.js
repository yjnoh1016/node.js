const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello Node!</h1>");
  res.end("<p>Hello Server!</p>");
});
server.listen(8080);

server.on("listening", () => {
  //이벤트 리스너 listening
  console.log("8080번 포트에서 서버 대기 중입니다!");
});
server.on("error", (error) => {
  //이벤트 리스너 error
  console.log(error);
});
