import { useEffect, useState } from "react";
import { backendUrl } from "../config";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState({
    longUrl: "",
  });
  const [link, setLink] = useState('YR6GeiS-0Sv9hES');
  const [allData, setAllData] = useState([]);
  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleClick = async (ele) => {
    ele.preventDefault();
    console.log(backendUrl)
    console.log(data)
    try{
        const newUrl = await fetch(`${backendUrl}/urlShortener`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const response = await newUrl.json()
          console.log(response)
          if (newUrl.status === 500 || newUrl.status === 401) {
            alert("Url is not valid");
          } else {
            alert("added successfully");
            setLink(response.shortUrl)
          }
          setData({
            longUrl: "",
          });
    }catch(err){
        console.log(err)
    }
  };
  const getData = async()=>{
    const response = await fetch(`${backendUrl}/urlShortener`)
    const allLinks = await response.json()
    setAllData(allLinks)
  }
  // const getSingleData = async(link)=>{
    // const response = await fetch(`${backendUrl}:${link}`)
    // const reDirect = await response.json()
    // console.log(reDirect)
  // }
useEffect(()=>{
    getData();
    // getSingleData(link);
},[data])
  return (
    <div>
      <h3>URL shortener Application</h3>
      <div style={{
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-evenly',
        width : '80vw'
      }}>
      <div>
        <div
          style={{
            height: "250px",
            width: "300px",
            backgroundColor: "black",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            name="longUrl"
            id="longUrl"
            value={data.longUrl}
            onChange={handleChange}
            style={{
              height: "25px",
              width: "70%",
            }}
          />
          <br />
          <button type="button" onClick={handleClick}>
            Generate
          </button>
        </div>
        <div>
          <p>Your Shortener link is : </p>
          <h4>
            <Link to={link}>{link}</Link>
          </h4>
        </div>
      </div>
      <div>
        <table style={{
            width : '500px'
        }}>
          <thead>
            <th>Links</th>
            <th>Total visited count</th>
          </thead>
          <tbody>
            {allData.map((d, i) => (
              <tr key={i}>
                <td>{d.shortUrl}</td>
                <td>{d.visited.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};
