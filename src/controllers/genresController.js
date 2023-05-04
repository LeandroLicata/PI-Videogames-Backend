const Genre = require("../models/genre");
const axios = require("axios");
const { API_KEY } = process.env;

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    if (genres.length) {
      return res.status(200).json(genres);
    }

    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresData = response.data.results;

    const promises = genresData.map((genre) =>
      Genre.findOneAndUpdate(
        { name: genre.name, slug: genre.slug },
        { name: genre.name, slug: genre.slug },
        { upsert: true, new: true }
      )
    );

    const genresCreated = await Promise.all(promises);

    const genresShown = genresCreated.map(({ _id, name, slug }) => ({
      id: _id,
      name,
      slug,
    }));

    return res.status(200).json(genresShown);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { getGenres };
