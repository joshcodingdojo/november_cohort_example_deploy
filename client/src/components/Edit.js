import { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
const Edit = (props) => {
  const [name, setName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [hasDelivery, setHasDelivery] = useState(false);
  const [dishImgUrl, setDishImgUrl] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/restaurant/${props.id}`)
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setCuisineType(response.data.cuisineType);
        setHasDelivery(response.data.delivery);
        setDishImgUrl(response.data.dishImgUrl);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/restaurant/${props.id}`, {
        name,
        cuisineType,
        delivery: hasDelivery,
        dishImgUrl,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <>
      <h1>Edit Restaurant</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {/* If you want the error message to be directly below the name input field... */}
          {/* {errors.name && (
                <p className="error-text">{errors.name.message}</p>
              )} */}
        </div>
        <div>
          <label htmlFor="cuisine" className="form-label">
            Cuisine
          </label>
          <select
            id="cuisineType"
            className="form-select"
            onChange={(e) => setCuisineType(e.target.value)}
            value={cuisineType}
          >
            <option>-------------------</option>
            <option value="Mexican">Mexican</option>
            <option value="American">American</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="hasDelivery"
            className="form-check-input"
            checked={hasDelivery}
            onChange={() => setHasDelivery(!hasDelivery)}
            readOnly
            value={hasDelivery}
          />
          <label className="form-check-label" htmlFor="hasDelivery">
            Has Delivery?
          </label>
        </div>
        <div>
          <label htmlFor="dishImgUrl" className="form-label">
            Dish Image URL
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDishImgUrl(e.target.value)}
            value={dishImgUrl}
          />
        </div>
        <div style={{ marginTop: "15px" }}>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Edit;
