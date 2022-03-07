const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send('Hello World! <br> <a href="/hi">안녕!!</a>');
});

app.get("/hi", (req, res) => {
  res.send('Hi. This is express router <br> <a href="/">돌아가기</a>');
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 대기중입니다.`);
});
