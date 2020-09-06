const express   = require("express");
const router    = express.Router();

const { userById } = require("../controllers/authController");
const { list, create, remove, videogameById, photo } = require("../controllers/videogameController");

router.get("/videogames", list);
router.post("/create/:userById", create);
router.get("/photo/:videogameId", photo);

router.delete("/:videogameId", remove);
router.param("videogameId", videogameById);
router.param("userId", userById);

module.exports = router;