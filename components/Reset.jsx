import { useState } from "react";
import { backendUrl } from "../config";
import { Navigate } from "react-router-dom";

export const Reset = ()=>{
  const [isReset, setIsReset] = useState(false)
    const [data, setData] = useState({
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
        const response = await fetch(`${backendUrl}/resetPassword`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        // const checkUser = await response.json();
        // console.log(checkUser);
        if (response.status === 401) {
          alert("Error");
        } else {
          alert("password reset successfully");
          setIsReset(true)
        }
        setData({
          password: "",
        });
      };
      if(isReset === true){
        return <Navigate to={'/login'} replace/>
      }
    return(
        <div style={{
            height : '250px',
            width : '220px',
            backgroundColor : 'black',
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            flexDirection : 'column',
            borderRadius : '10px'
        }}>
            <h4>Password reset Form</h4>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="password">Password : </label>
            <input type="text" name="password" id="password" required value={data.password} onChange={handleChange} />
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
    )
}