const express = require("express");
const router = express();
const { register } = require("../controllers/auth");

router.route("/").post(register);

module.exports = router;
