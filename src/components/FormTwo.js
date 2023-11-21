import React, { useState } from "react";
//Here imported the Inbuilt Formik and Form class which is available in formik library..
import { Formik, Form } from "formik";
//It is library which is used to validate the fields..
import * as Yup from "yup";
//Here I have imported below component so that i can pass the props..
import TextField from "./TextField";

export default function FormTwo() {
  //Here I have defined the validate so that i can verify all the fields before submitting the forms...
  const validate = Yup.object({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(12, "Too Long!")
      .required("FirstName is required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(12, "Too Long!")
      .required("LastName is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match!")
      .required("Confirm password is required"),
    phoneNumber: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10, "Phone Number must be 10 digits..")
      .required("A phone number is required"),
  });

  //Here I have defined the success state so that i can display the success messsage..
  const [success, setSuccess] = useState(false);
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        setSuccess(true);
      }}
    >
      {(formik) => {
        return (
          <div
            style={{ width: "500px", paddingTop: "30px", paddingLeft: "10px" }}
          >
            <h2>Signup Form using Formik library</h2>

            {success ? (
              <div className="message successful">
                <h4 style={{ color: "green" }}>Submitted Successfully..</h4>
              </div>
            ) : (
              ""
            )}
            <Form>
              <TextField label="First Name" name="firstName" type="text" />
              <TextField label="Last Name" name="lastName" type="text" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <TextField label="Phone Number" name="phoneNumber" type="text" />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-dark"
                style={{ marginLeft: "10px" }}
              >
                Reset
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
