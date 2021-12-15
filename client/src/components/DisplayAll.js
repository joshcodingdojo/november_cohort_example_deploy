import axios from "axios";
import { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
const DisplayAll = () => {
  const [restaurantResponseFromApi, setRestaurantResponseFromApi] = useState(
    []
  );
  const [triggerRequest, setTriggerRequest] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/restaurant")
      .then((response) => {
        setRestaurantResponseFromApi(response.data);
      })
      .catch((err) => console.log(err.response));
  }, [triggerRequest]);

  const handleDeleteRestaurant = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/restaurant/${idFromBelow}`)
      .then((response) => {
        console.log(response);
        // navigate("/");
        setTriggerRequest(!triggerRequest);
      })
      .catch((err) => console.log(err.response));
  };

  const handleNavigateToEditComponent = (idFromBelow) => {
    navigate(`/restaurant/${idFromBelow}/edit`);
  };
  return (
    <div className="container">
      <h1>Favorite Restaurants</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cuisine</th>
            <th>Delivery?</th>
            <th>Dish Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurantResponseFromApi &&
            restaurantResponseFromApi.map((element) => {
              return (
                <tr>
                  <td>{element.name}</td>
                  <td>{element.cuisineType}</td>
                  <td>{element.delivery ? "Yes" : "No"} </td>
                  <td>
                    <img
                      src={element.dishImgUrl}
                      alt=""
                      style={{ height: "100px" }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => handleNavigateToEditComponent(element._id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteRestaurant(element._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/restaurant/${element._id}`}>details</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayAll;
