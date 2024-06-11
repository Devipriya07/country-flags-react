import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CountryCard = ({ name, flagImg, flagAltTxt }) => {
  return (
    <div className="country-flag-card countryCard" 
          style={{
            border: "1px solid black", 
            borderRadius: "15px",
            height: "24vh",
            width:"9em"
          }}>
      <img src={flagImg} alt={flagAltTxt} loading="lazy" style={{ width: "8vw", height: "14vh", marginTop: "3%" }}/>
      <p>{name}</p>
    </div>
  );
};

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlags = async () => {
    const apiurl = "https://xcountries-backend.azurewebsites.net/all";
    try {
      let response = await axios.get(apiurl);
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ");
      setLoading(false);
      }
  };
  useEffect(() => {
    fetchFlags();
  }, []);


//   const apiurl = "https://xcountries-backend.azurewebsites.net/all";
//   useEffect(()=>{
//     fetch(apiurl).then((res) => res.json())
//   .then((data)=>setCountries(data))
//   .catch((error)=>console.log("Error fetching data: ", error));
// }, [] );

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Country Flags</h1>

      { loading ? 
      (<Box sx={{ display: 'flex',
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"center",
        height:"90vh",
        width:"100vw"
       }}>
      <CircularProgress/> <div>Loading...</div>
      </Box>) :
      (<div className="flags-container countryCard"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em"
        }} >
        {countries.map((country, index) => (
          <CountryCard 
            key={index} 
            name={country.name} 
            flagAltTxt={country.name} 
            flagImg={country.flag} 
          />
        ))}
      </div>)        }
    </div>
  );
};
export default Countries;
