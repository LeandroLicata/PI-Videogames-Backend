const Platform = require("../models/platform");
const axios = require("axios");
const { API_KEY } = process.env;

const getPlatforms = async (req, res) => {
try {
    const platforms = await Platform.find();
    if (platforms.length) {
      return res.status(200).json(platforms);
    }

    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    const platformsData = response.data.results;

    const promises = platformsData.map((platform) => Platform.findOneAndUpdate(
      { name: platform.name, id: platform.id },
      { name: platform.name, id: platform.id },
      { upsert: true, new: true }
    ));

    const platformsCreated = await Promise.all(promises);

    const platformsShown = platformsCreated.map(({ id, name }) => ({
      id,
      name,
    }));

    return res.status(200).json(platformsShown);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }

};

module.exports = { getPlatforms }