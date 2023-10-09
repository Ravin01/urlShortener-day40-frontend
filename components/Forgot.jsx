import { useState } from "react";
import { backendUrl } from "../config";

export const Forgot = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [hold, setHold] = useState(false);
  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (ele) => {
    ele.preventDefault();
    setHold(true);
    const response = await fetch(`${backendUrl}/forgotPassword`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const checkUser = await response.json();
    // console.log(checkUser);
    if (response.status === 401) {
      alert("invalid email");
    } else {
      setHold(false);
      alert("verify your email, please check your email");
    }
    setData({
      email: "",
    });
  };
  return (
    <div
      style={{
        height: "250px",
        width: "220px",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <h4>Forgot password Form</h4>
      <form action="" onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
      {hold && <p>Hold tight, we are sending email to you</p>}
    </div>
  );
};
