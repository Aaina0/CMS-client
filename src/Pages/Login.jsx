import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../assets/css/form.css";
import Validation from "../Components/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext); // Only destructure setUser
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = Validation(values);
    setErrors(error);

    if (!error.email && !error.password) {
      axios
        .post("http://localhost:3000/contactms/login", values, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Login Successfully", {
              position: "top-right",
              autoClose: 5000,
            });
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data.errors) {
            setServerErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              name="email"
              value={values.email}
              onChange={handleInput}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              name="password"
              value={values.password}
              onChange={handleInput}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          {serverErrors.length > 0 &&
            serverErrors.map((error, index) => (
              <p className="error" key={index}>
                {error.msg}
              </p>
            ))}
          <button className="form-btn">Login</button>
          <p>
            Don&apos;t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
