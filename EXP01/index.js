const path = require("path");
const ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 데이터베이스 접속
const mysql = require("mysql2");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const { query } = require("express");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwer1234",
  database: "nodejs_db",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", { users: result });
  });
});

// 사용자 정보 입력 화면
app.get("/create", (req, res) =>
  res.sendFile(path.join(__dirname, "html/form.html"))
);

// 사용자 정보 입력문
app.post("/", (req, res) => {
  const sql = "INSERT INTO users SET ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send("등록이 완료 되었습니다.");
  });
});

// 사용자 정보 삭제문
app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

// users 레코드값 수정 페이지 화면
app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fileds) {
    if (err) throw err;
    res.render("edit", { users: result });
  });
});

// users 레코드 값 수정(업데이트)구문
app.post("/update/:id", (req, res) => {
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 대기중입니다.`);
});
