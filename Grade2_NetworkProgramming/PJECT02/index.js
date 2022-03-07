const express = require("express");
const app = express();
const port = 3000;

const goodsRouter = require("./routes/goods");
app.use("/goods", goodsRouter);

// app.get('/goods/list', (req, res) => {
//   res.send('상품 목록 페이지')
// })

// app.get('/goods/detail', (req, res) => {
//   res.send('상품 상세 페이지')
// })

const userRouter = require("./routes/user");
app.use("/user", userRouter);

// app.get("/user/login", (req, res) => {
//   res.send("로그인 페이지");
// });

// app.get("/user/register", (req, res) => {
//   res.send("회원가입 페이지");
// });

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 대기중입니다.`);
});
