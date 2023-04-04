const express = require("express");
const router = express.Router();
const videogameRoutes = require("./routeVideogame");
const genreRoutes = require("./routeGenre");
const platformRoutes = require("./routePlatform");

router.use("/videogames", videogameRoutes);

router.use("/genres", genreRoutes);

router.use("/platforms", platformRoutes);

module.exports = router;
