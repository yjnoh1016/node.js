const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const app = express();
const port = 9000;
const FileStore = require("session-file-store")(session);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwer1234",
  database: "node_db",
});

app.use(
  session({
    secret: "mykey",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.get("/register", (_, res) => {
  console.log("user join the sign up pages");
  res.render("register");
});

app.post("/register", (req, res) => {
  console.log("user post register url");
  const body = req.body;
  const { id, pw, name, age } = body;
  con.query("select * from users where id=?", [id], (err, data) => {
    if (data.length == 0) {
      console.log("success register");
      con.query("insert into users(id, pw, name, age) values(?, ?, ?, ?)", [
        id,
        pw,
        name,
        age,
      ]);
      res.send('<script>alert("회원가입 성공"); location.href="/"</script>');
    } else {
      console.log("failed register");
      res.send(
        '<script>alert("회원가입 실패, 동일한 정보가 존재합니다."); location.href="/register"</script>'
      );
    }
  });
});

app.get("/login", (_, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const body = req.body;
  const { id, pw } = body;
  con.query("select * from users where id=?", [id], (err, data) => {
    if (id == data[0]?.id && pw == data[0]?.pw) {
      req.session.is_logined = true;
      req.session.name = data.name;
      req.session.id = data.id;
      req.session.pw = data.pw;

      req.session.save(function () {
        res.render("index", {
          name: data[0].name,
          id: data[0].id,
          age: data[0].age,
          is_logined: true,
        });
      });
    } else {
      res.render("login");
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
