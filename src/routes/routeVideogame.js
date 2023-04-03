const express = require("express");
const router = express.Router();
const {
  getVideogames,
  createVideogame,
  getVideogameById,
  updateVideogame,
  deleteVideogame,
} = require("../controllers/videogamesControllers");

router.get("/", getVideogames);

router.get("/:id", getVideogameById);

router.post("/", createVideogame);

router.put("/:id", updateVideogame);

router.delete("/:id", deleteVideogame);

module.exports = router;
