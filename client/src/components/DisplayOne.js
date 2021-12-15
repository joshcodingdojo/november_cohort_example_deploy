import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
const DisplayOne = (props) => {
  const [restaurant, setRestaurant] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/restaurant/${props.id}`)
      .then((response) => {
        console.log(response.data);
        setRestaurant(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <div className="container">
      {restaurant && (
        <div className="display-one-box">
          <h1>Details About {restaurant.name}</h1>
          <p>Cuisine Type: {restaurant.cuisineType}</p>
          <p>
            Delivery?:{" "}
            {restaurant.hasDelivery ? <span>Yes</span> : <span>No</span>}
          </p>
          <p>
            Dish Image:{" "}
            <img
              src={restaurant.dishImgUrl}
              style={{ height: "250px" }}
              alt=""
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default DisplayOne;
