const Restaurant = require("../models/restaurant.model");

// health check controller to make sure routes and controllers are set up correctly
const healthcheck = (req, res) => {
  res.send("healthcheck set up in controller");
};

// controller to create new restaurant doc
const createRestaurant = (req, res) => {
  console.log("GETS HERE");
  /*
    req.body contains the information sent by client in form
    req.body is JUST AN OBJECT!!! The key will be the form input name,
    and the value will be what is entered into the form input
  */

  // this is the mongoose .create() function. We must feed it an object
  // and the keys in this object MUST match the keys defined in the schema for this model
  console.log(req.body);
  const dishes = [req.body.dishOne, req.body.dishTwo, req.body.dishThree];
  req.body.dishes = dishes;
  console.log("dishes array: ", dishes);
  console.log("after adding,", req.body);
  Restaurant.create(req.body)
    .then((newlyCreatedRestaurant) => {
      res.json({ restaurant: newlyCreatedRestaurant });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// controller function to query restaurant by id
const getAllRestaurants = (req, res) => {
  // mongoose function to find all docs in collection
  Restaurant.find()
    .then((allRestaurants) => {
      res.json(allRestaurants);
    }) // json response w all queried docs
    .catch((err) => res.status(400).json(err));
};

const getRestaurantById = (req, res) => {
  Restaurant.findOne({ _id: req.params.id })
    .then((queriedRestaurant) => res.json(queriedRestaurant))
    .catch((err) => res.status(400).json(err));
};

const updateRestaurant = (req, res) => {
  const { params } = req;
  // mongoose function to find one doc and update it
  // 1st arg: obj w/ query field and val
  // 2nd arg: object with keys as field want to update, values as the value to update these fields to
  // 3rd arg: obj w/ options.
  Restaurant.findOneAndUpdate({ _id: params.id }, req.body, {
    new: true, // this says we want the new doc in the .then()
    runValidators: true, // run validators when updating
  })
    // json reponse w/ updated restaurant
    .then((updatedRestaurant) => res.json(updatedRestaurant))
    .catch((err) => res.status(400).json(err));
};

const deleteRestaurant = (req, res) => {
  const { params } = req;
  Restaurant.deleteOne({ _id: params.id })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  healthcheck,
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
