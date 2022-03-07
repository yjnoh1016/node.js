var express = require("express");
var router = express.Router();

router.get("/login", function (req, res, next) {
  res.send("Router 상품 목록 페이지");
});

router.get("/register", function (req, res, next) {
  res.send("Router 상품 상세 페이지");
});

module.exports = router;
