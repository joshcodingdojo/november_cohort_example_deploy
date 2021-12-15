require("./config/mongoose.config");

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));
console.log("yoyyouyouiuuio");
const restaurantRoutes = require("./routes/restaurant.routes");
restaurantRoutes(app);

app.listen(8000, () => {
  console.log("express running on port", 8000);
});
