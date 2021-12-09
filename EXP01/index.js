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
  database: "book",
});

// 도서 내역 불러오기
app.get("/", (req, res) => {
  const sql = "SELECT * FROM book";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", { book: result });
  });
});

// 도서 정보 입력 화면
app.get("/bookform", (req, res) =>
  res.sendFile(path.join(__dirname, "html/form.html"))
);

// 사용자 정보 입력문
// app.post("/", (req, res) => {
//   const sql = "INSERT INTO book SET ?";
//   con.query(sql, req.body, function (err, result, fields) {
//     if (err) {
//       const sql = "INSERT INTO customer SET ?";
//       con.query(sql, req.body, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.send("등록이 완료 되었습니다.");
//       });
//     }
//     console.log(result);
//     res.send("등록이 완료 되었습니다.");
//   });
// });

// 사용자 추가
app.post("/customer", (req, res) => {
  const sql = "insert into customer set ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.redirect("/");
  });
});

// 도서 추가
app.post("/book", (req, res) => {
  const sql = "insert into book set ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    //res.send("도서 등록이 완료 되었습니다.");
    res.redirect("/");
  });
});

app.post("/rent", (req, res) => {
  const sql = "insert into rent set ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // res.send("대여 등록이 완료 되었습니다.");
    res.redirect("/");
  });
});

// 사용자 정보 입력 화면
app.get("/userform", (req, res) =>
  res.sendFile(path.join(__dirname, "html/form2.html"))
);

// 대여 정보 입력 화면
app.get("/rentform", (req, res) =>
  res.sendFile(path.join(__dirname, "html/form3.html"))
);

// 도서 정보 삭제문
app.get("/delete/:book_no", (req, res) => {
  const sql = "DELETE FROM book WHERE book_no = ?";
  con.query(sql, [req.params.book_no], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

// 도서 레코드값 수정 페이지 화면
app.get("/edit/:book_no", (req, res) => {
  const sql = "SELECT * FROM book WHERE book_no = ?";
  con.query(sql, [req.params.book_no], function (err, result, fileds) {
    if (err) throw err;
    res.render("edit", { book: result });
  });
});

//사용자 목록
app.get("/user/list", (req, res) => {
  const sql = "select * FROM customer";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render("customer", { customer: result });
  });
});

// 도서 레코드 값 수정(업데이트)구문
app.post("/update/:book_no", (req, res) => {
  const sql = "UPDATE book SET ? WHERE book_no = " + req.params.book_no;
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    //  console.log(result);
    res.redirect("/");
  });
});

// 대출 내역 불러오기
app.get("/rent/list", (req, res) => {
  const sql =
    "select B.book_name, C.cust_name, R.rent_date, R.return_date from rent R LEFT OUTER JOIN customer C ON R.cust_no = C.cust_no LEFT OUTER JOIN book B ON R.book_no = B.book_no";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render("rent", { book: result });
  });
});

// 대여 추가
// app.get("/rentSystem", (req, res) => {
//   const sql = "insert into rent set ?";
//   con.query(sql, req.body, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     // res.send("대여 등록이 완료 되었습니다.");
//     res.redirect("/");
//   });
// });

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 대기중입니다.`);
});
