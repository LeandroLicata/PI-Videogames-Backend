const Videogame = require("../models/videogame");
const axios = require("axios");
const { API_KEY } = process.env;

const getDbVideogames = async (name, genres, platforms) => {
  let dbVideogames = await Videogame.find();

  if (name) {
    dbVideogames = dbVideogames.filter((videogame) =>
      videogame.name?.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (genres) {
    dbVideogames = dbVideogames.filter((videogame) =>
      videogame.genres.some((g) => g.slug === genres)
    );
  }

  if (platforms) {
    dbVideogames = dbVideogames.filter((videogame) =>
      videogame.platforms.some((p) => p.id === platforms)
    );
  }

  const dbVideogamesClean = dbVideogames.map((videogame) => {
    const platforms = videogame.platforms.map((platform) => platform.name);
    const genres = videogame.genres.map((genre) => genre.name);
    return {
      id: videogame._id,
      name: videogame.name,
      released: videogame.released,
      rating: videogame.rating,
      platforms,
      genres,
      background_image: videogame.background_image,
      createdInDb: videogame.createdInDb,
    };
  });
  return dbVideogamesClean;
};

const getApiVideogames = async (name, genres, platforms) => {
  let pages = 0;
  let videogamesArray = [];
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

  if (name) {
    url += `&search=${name}`;
  }
  if (genres) {
    url += `&genres=${genres}`;
  }
  if (platforms) {
    url += `&platforms=${platforms}`;
  }

  let response = await axios.get(url);

  while (pages < 5) {
    pages++;
    const apiVideogames = response.data.results.map((videogame) => {
      const platforms = videogame.platforms?.map(
        (platform) => platform.platform.name
      );
      const genres = videogame.genres.map((genre) => genre.name);
      const short_screenshots = videogame.short_screenshots.map(
        (screenshot) => screenshot.image
      );
      return {
        id: videogame.id,
        name: videogame.name,
        released: videogame.released,
        rating: videogame.rating,
        platforms,
        genres,
        background_image: videogame.background_image,
        short_screenshots,
      };
    });
    videogamesArray = [...videogamesArray, ...apiVideogames];
    response.data.next
      ? (response = await axios.get(response.data.next))
      : (pages = 5);
  }
  return videogamesArray;
};

const getAllVideogames = async (name, genres, platforms) => {
  const dbVideogames = await getDbVideogames(name, genres, platforms);
  const apiVideogames = await getApiVideogames(name, genres, platforms);
  return [...apiVideogames, ...dbVideogames];
};

const findVideogame = async (id) => {
  if (id.length !== 24) {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const videogame = response.data;
    const platforms = videogame.platforms.map(
      (platform) => platform.platform.name
    );
    const genres = videogame.genres.map((genre) => genre.name);
    const screenshotsResponse = await axios.get(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
    );
    const screenshots = screenshotsResponse.data.results.map((s) => s.image);
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      released: videogame.released,
      rating: videogame.rating,
      platforms,
      genres,
      background_image: videogame.background_image,
      background_image_additional: videogame.background_image_additional,
      screenshots,
    };
  } else {
    const videogame = await Videogame.findById(id);
    const platforms = videogame.platforms?.map((platform) => platform.name);
    const genres = videogame.genres?.map((genre) => genre.name);
    return {
      id: videogame._id,
      name: videogame.name,
      description: videogame.description,
      released: videogame.released,
      rating: videogame.rating,
      platforms,
      genres,
      background_image: videogame.background_image,
    };
  }
};

module.exports = {
  getAllVideogames,
  findVideogame,
};
