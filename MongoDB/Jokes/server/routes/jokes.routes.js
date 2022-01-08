const JokeController = require("../controllers/jokes.controller");

module.exports = app => {
  app.get("/api/jokes/", JokeController.findAll);
  app.get("/api/jokes/:_id", JokeController.findOne);
  app.get("/api/jokes/random", JokeController.findOneRandom);
  app.post("/api/jokes/create", JokeController.create);
  app.get("/api/jokes/new", JokeController.new);
  app.put("/api/jokes/update/:_id", JokeController.update);
  app.delete("/api/jokes/delete/:_id", JokeController.delete);
};