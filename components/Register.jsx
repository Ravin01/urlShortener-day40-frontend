import { useState } from "react";
import { backendUrl } from "../config";
import { Link, Navigate } from "react-router-dom";

export const Register = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (ele) => {
    ele.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData({
        userName: "",
        email: "",
        password: "",
      });
      if (response.status === 409) {
        alert("User already exists");
      } else {
        alert("User register successfully");
        setLoggedIn(true)
      }
    } catch (err) {
      console.log(err);
      alert("Error while register");
    }
  };
  if(loggedIn === true){
    return <Navigate  to={'/login'} replace/>
  }
  if (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"))
  ) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div
      style={{
        height: "350px",
        width: "300px",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <h4>Registration Form</h4>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="userName">Name : </label>
        <input
          type="text"
          name="userName"
          id="userName"
          required
          value={data.userName}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="email">Email : </label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={data.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password : </label>
        <input
          type="text"
          name="password"
          id="password"
          required
          value={data.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={'/login'} >Already registered ? Login</Link>
    </div>
  );
};
