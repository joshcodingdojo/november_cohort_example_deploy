const restaurantController = require("../controllers/restaurant.controller");

module.exports = (app) => {
  app.get("/api/healthcheck", restaurantController.healthcheck);
  app.post("/api/restaurant", restaurantController.createRestaurant);
  app.get("/api/restaurant", restaurantController.getAllRestaurants);
  app.get("/api/restaurant/:id", restaurantController.getRestaurantById);
  app.put("/api/restaurant/:id", restaurantController.updateRestaurant);
  app.delete("/api/restaurant/:id", restaurantController.deleteRestaurant);
};
