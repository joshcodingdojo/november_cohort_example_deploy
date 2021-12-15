import { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import "../App.css";
const Form = () => {
  const [name, setName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [hasDelivery, setHasDelivery] = useState(false);
  const [dishImgUrl, setDishImgUrl] = useState("");
  const [dishOne, setDishOne] = useState("");
  const [dishTwo, setDishTwo] = useState("");
  const [dishThree, setDishThree] = useState("");
  const [errors, setErrors] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("inside form handler");
    // 1. pack data into object which will be form obj sent to server
    const postData = {
      name: name,
      cuisineType: cuisineType,
      hasDelivery: hasDelivery,
      dishImgUrl: dishImgUrl,
      dishOne,
      dishTwo,
      dishThree,
    };
    console.log(postData);
    // 2. axios post
    axios
      .post("http://localhost:8000/api/restaurant", postData)
      .then((response) => {
        console.log("SUCCESS", response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        // console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
        // setErrors()
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h2>Add New Favorite Restaurant</h2>
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
              />
            </div>
            <div>
              <label htmlFor="dishOne" className="form-label">
                Dish One
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDishOne(e.target.value)}
                id="dishOne"
              />
            </div>
            <div>
              <label htmlFor="dishTwo" className="form-label">
                Dish Two
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDishTwo(e.target.value)}
                id="dishTwo"
              />
            </div>
            <div>
              <label htmlFor="dishThree" className="form-label">
                Dish Three
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDishThree(e.target.value)}
                id="dishThree"
              />
            </div>
            <button>PLUS</button>
            <div style={{ marginTop: "15px" }}>
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
          {/* display errors */}
          {errors &&
            Object.keys(errors).map((errKey, index) => {
              return (
                <p className="error-text" key={index}>
                  {errors[errKey].message}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Form;
