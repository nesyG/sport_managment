import React, { FunctionComponent, useState, useEffect, useContext, PropsWithChildren } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { IncomingMessage } from "http";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import App from "../App";
// type CustomProp = {
// onLogin: Function 
// }
type Props = {}


const Login: React.FC<Props> = ({ }) => {
  let navigate: NavigateFunction = useNavigate();

  const [onLoginHover, setOnLoginHover] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  function toggleLoginChange() {
    setOnLoginHover(!onLoginHover);
  }
  //post request on login
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const API_URL = "http://localhost:3500/";

   const handlePost = (e: any) => {
    e.preventDefault();
    console.log(formValue);
    let res = axios({
      method: "POST",
      data: formValue,
      url: "http://localhost:3500/login",
    }).then((res) => console.log(res.data))
    navigate("/classes");
  };

  return (
    <div>
      <h1 className="welcome-container">Welcome to Sports Arena</h1>
      <div className="login-container">
        <h3
          className={onLoginHover ? "login-btn login-hover" : "login-btn"}
          onMouseOver={toggleLoginChange}
          onMouseLeave={toggleLoginChange}
          onClick={() => setIsLoginOpen(!isLoginOpen)}
        >
          Login
        </h3>
        {isLoginOpen && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handlePost}
          >
            <Form>
              <div className="login-form-container">
                <label htmlFor="email">email</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  value={formValue.email}
                  onChange={handleInput}
                  placeholder="example123@gmail.com"
                />
              </div>

              <div className="login-form-container ">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  value={formValue.password}
                  onChange={handleInput}
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-secondary btn-block"
                  onClick={handlePost}
                >
                  <span>Login</span>
                </button>
              </div>

              {/* {message && (
               <div className="form-group">
                 <div className="alert alert-danger" role="alert">
                   {message}
                 </div>
               </div>
             )} */}
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Login;

// export const JWTContext = createContext(null);

// // In your root component:
// <JWTContext.Provider value={token}>
//   {/* Your app goes here */}
// </JWTContext.Provider>

// // In a child component:
// import { useContext } from 'react';
// import { JWTContext } from './JWTContext';

// function ChildComponent() {
//   const jwt = useContext(JWTContext);
//   // Use the JWT here
// }