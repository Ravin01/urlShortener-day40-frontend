import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { backendUrl } from "../config";

export const Login = ()=>{
    const [login, setLogin] = useState({
        email : '',
        password : ''
    })
    const handleChange = (ele)=>{
        const {name, value} = ele.target
        setLogin({...login, [name] : value})
    }
    const handleSubmit = async(ele) => {
        ele.preventDefault();
        const loginResponse = await fetch(`${backendUrl}/login`,{
            method : 'POST',
            body : JSON.stringify(login),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        if(loginResponse.status === 401){
            alert('Login failed')
        }else if(loginResponse.status === 403){
            alert('Not registered')
        }
        else{
            alert('Login success');
            localStorage.setItem('user', JSON.stringify(loginResponse));
        }
        setLogin({
            email : '',
            password : ''
          });
      };
      
      if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) {
        return <Navigate to={'/'} replace />;
      }
    return(
        <div style={{
            height : '320px',
            width : '290px',
            backgroundColor : 'black',
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            flexDirection : 'column',
            borderRadius : '10px'
        }}>
            <h4>Login Form</h4>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">Email : </label>
            <input type="text" name="email" id="email" required value={login.email} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="password">Password : </label>
            <input type="text" name="password" id="password" required value={login.password} onChange={handleChange} />
            <br />
            <br />
            <Link to='/forgotPassword' >Forgot Password ?</Link>
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
          <br />
          <Link to={'/register'} >not yet registered ? Register</Link>
        </div>
    )
}