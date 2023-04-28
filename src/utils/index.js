const Videogame = require("../models/videogame");
const axios = require("axios");
const { API_KEY } = process.env;

const getDbVideogames = async () => {
  const dbVideogames = await Videogame.find();
  const dbVideogamesClean = dbVideogames.map((videogame) => {
    return {
      id: videogame._id,
      name: videogame.name,
      released: videogame.released,
      rating: videogame.rating,
      platforms: videogame.platforms,
      genres: videogame.genres,
      background_image: videogame.background_image,
      createdInDb: videogame.createdInDb,
    };
  });
  return dbVideogamesClean;
};

const getApiVideogames = async () => {
  let pages = 0;
  let videogamesArray = [];
  let response = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );
  while (pages < 5) {
    pages++;
    const apiVideogames = response.data.results.map((videogame) => {
      const platforms = videogame.platforms.map(
        (platform) => platform.platform.name
      );
      const genres = videogame.genres.map((genre) => genre.name);
      return {
        id: videogame.id,
        name: videogame.name,
        released: videogame.released,
        rating: videogame.rating,
        platforms,
        genres,
        background_image: videogame.background_image,
      };
    });
    videogamesArray = [...videogamesArray, ...apiVideogames];
    response = await axios.get(response.data.next);
  }
  return videogamesArray;
};

const getAllVideogames = async () => {
  const dbVideogames = await getDbVideogames();
  const apiVideogames = await getApiVideogames();
  return [...dbVideogames, ...apiVideogames];
};

const findVideogames = async (name) => {
  const dbVideogames = await getDbVideogames();
  const filteredDbVideogames = dbVideogames.filter((videogame) =>
    videogame.name?.toLowerCase().includes(name.toLowerCase())
  );
  const response = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
  );
  const filteredApiVideogames = response.data.results.map((videogame) => {
    const platforms = videogame.platforms?.map(
      (platform) => platform.platform.name
    );
    const genres = videogame.genres.map((genre) => genre.name);
    return {
      id: videogame.id,
      name: videogame.name,
      released: videogame.released,
      rating: videogame.rating,
      platforms,
      genres,
      background_image: videogame.background_image,
    };
  });

  return [...filteredDbVideogames, ...filteredApiVideogames];
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
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      released: videogame.released,
      rating: videogame.rating,
      platforms,
      genres,
      background_image: videogame.background_image,
    };
  } else {
    const videogame = Videogame.findById(id);
    return videogame;
  }
};

module.exports = {
  getAllVideogames,
  findVideogames,
  findVideogame,
};
