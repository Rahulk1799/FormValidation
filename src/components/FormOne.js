import React from "react";
import { useState, useEffect } from "react";

export default function FormOne() {
  const initialValues = { name: "", email: "", password: "", age: "" };
  const [formValues, setFormValues] = useState({ initialValues });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    //console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  //Here I have created the validate() method to check the input values...
  const validate = (values) => {
    const errors = {};
    //This is a pattern to check a particular email is valid or not!..
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
    }
    if (!isNaN(values.name)) {
      errors.name =
        "Enter the appropriate Username!.. Either text or mixed of text and numbers..";
    }
    if (!values.age) {
      errors.age = "Age is required!";
    } else if (isNaN(values.age)) {
      errors.age = "Enter appropriate value for age";
    } else if (values.age <= 0) {
      errors.age = "Age could not be less than Zero ";
    } else if (values.age > 120) {
      errors.age = "Age could not be greater than 120 ";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
  const myFunction = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <div className="forms" style={{ paddingLeft: "10px", width: "500px" }}>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="message successful">
          <h2 style={{ color: "green" }}>Submitted Successfully..</h2>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleOnSubmit}>
        <h2>Signup Form</h2>
        <div className="ui divider"></div>
        <div className="form">
          <div className="field">
            <label>UserName</label>
            <br />
            <input
              type="text"
              name="name"
              placeholder="UserName"
              value={formValues.name}
              onChange={handleOnChange}
              style={{ width: "480px" }}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.name}</p>
          <div className="field">
            <label>Email</label>
            <br />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleOnChange}
              style={{ width: "480px" }}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.email}</p>
          <div className="field">
            <label>Age</label>
            <br />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formValues.age}
              onChange={handleOnChange}
              style={{ width: "480px" }}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.age}</p>
          <div className="field">
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleOnChange}
              id="myInput"
              style={{ width: "480px" }}
            />
            <br />
            <input
              type="checkbox"
              onClick={myFunction}
              style={{ marginLeft: "350px" }}
            />
            Show Password
          </div>
          <p style={{ color: "red" }}>{formErrors.password}</p>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
