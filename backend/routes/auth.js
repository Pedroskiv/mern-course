const express   = require("express");
const router    = express.Router();

const { signup, signin, signout } = require("../controllers/authController");
const { sign } = require("crypto");

router.get("/signout", signout);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;