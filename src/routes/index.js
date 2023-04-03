const express = require("express");
const router = express.Router();
const videogameRoutes = require("./routeVideogame");
const genreRoutes = require("./routeGenre");

router.use("/videogames", videogameRoutes);

router.use("/genres", genreRoutes);

module.exports = router;
