const Videogame = require("../models/videogame");
const { getAllVideogames, findVideogame } = require("../utils/index");

const createVideogame = async (req, res) => {
  try {
    const {
      name,
      released,
      description,
      rating,
      platforms,
      genres,
      background_image,
      createdInDb,
    } = req.body;

    const newVideogame = new Videogame({
      name,
      released,
      description,
      rating,
      platforms,
      genres,
      background_image,
      createdInDb,
    });

    await newVideogame.save();
    res.status(200).send("Videogame added successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVideogames = async (req, res) => {
  const { name, genres, platforms } = req.query;
  let results = await getAllVideogames(name, genres, platforms);
  results.length
    ? res.status(200).json(results)
    : res.status(404).send("Videogame not found :(");
};

const getVideogameById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findVideogame(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Videogame not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const update = {};
    if (req.body.name) update["name"] = req.body.name;
    if (req.body.description) update["description"] = req.body.description;
    if (req.body.released) update["released"] = req.body.released;
    if (req.body.rating) update["rating"] = req.body.rating;
    if (req.body.platforms) update["platforms"] = req.body.platforms;
    if (req.body.genres) update["genres"] = req.body.genres;
    if (req.body.background_image)
      update["background_image"] = req.body.background_image;
    const updatedVideogame = await Videogame.updateOne(
      { _id: id },
      { $set: update }
    );
    res.status(200).json(updatedVideogame);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideogame = await Videogame.findByIdAndDelete(id);
    if (!deletedVideogame)
      return res.status(404).json({ message: "Videogame do not exists in DB" });
    res.status(200).json(deletedVideogame);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getVideogames,
  createVideogame,
  getVideogameById,
  updateVideogame,
  deleteVideogame,
};
