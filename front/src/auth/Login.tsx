import React, { FunctionComponent, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { login } from "../services/auth.service";

type Props = {};

const Login: FunctionComponent<Props> = () => {
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

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage("");
    setLoading(true);

    login(email, password).then(
      () => {
        navigate("/classes");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  function toggleLoginChange() {
    setOnLoginHover(!onLoginHover);
  }

  return (
    <>
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
           onSubmit={handleLogin}
         >
           <Form>
             <div className="login-form-container">
               <label htmlFor="email">email</label>
               <Field name="email" type="email" className="form-control" placeholder="example123@gmail.com" />
               <ErrorMessage
                 name="email"
                 component="div"
                
               />
             </div>
 
             <div className="login-form-container ">
               <label htmlFor="password">Password</label>
               <Field name="password" type="password" className="form-control" />
               <ErrorMessage
                 name="password"
                 component="div"
               
               />
             </div>
 
             <div className="form-group">
               <button type="submit" className="btn btn-secondary btn-block" disabled={loading}>
                 <span>Login</span>
               </button>
             </div>
 
             {message && (
               <div className="form-group">
                 <div className="alert alert-danger" role="alert">
                   {message}
                 </div>
               </div>
             )}
           </Form>
         </Formik>
        )}
      </div>
    </>
  );
};

export default Login;
