const express = require("express");
const router = express.Router();
const { getPlatforms } = require("../controllers/platformsControllers");

router.get("/", getPlatforms);

module.exports = router;