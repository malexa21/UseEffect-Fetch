import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const URL =
  "https://ensemble-api.open-meteo.com/v1/ensemble?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=icon_seamless";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tempData, setTempData] = useState(undefined);

  useEffect(() => {

    fetch(URL, { method: "GET" })
      .then(
        (response) =>
          new Promise((resolve) => setTimeout(() => {
            resolve(response.json());
            }, 2000)
          )
      )
      .then((data) => {
        setIsLoading(false);

        //destructurarea datelor necesare
        const { 
          temperature_2m,
          temperature_2m_member01 ,
          temperature_2m_member02 , 
          temperature_2m_member03 , 
          temperature_2m_member04 , 
          time} = data.hourly;

        //atribuim chei datelor destructurate
        setTempData({
          standard: temperature_2m,
          temp1: temperature_2m_member01,
          temp2: temperature_2m_member02,
          temp3: temperature_2m_member03,
          temp4: temperature_2m_member04,
          time: time,
        });

      });
  }, []);

  if (isLoading) {
    return (

       <div className="lds-circle">
        <div></div>
        </div>

    );
  }

  return (
    <div>
      <h1>Fetch</h1>
      {tempData && (
          <table border="1px solid black">
            <thead>
              <tr>
                <th>time</th>
                <th>standard</th>
                <th>day1</th>
                <th>day2</th>
                <th>day3</th>
                <th>day4</th>
              </tr>
            </thead>
            <tbody>
              {tempData.standard.map(( time , i) => (
                <tr key={i}>
                  <td>{time}</td>
                  <td>{tempData.standard[i]}</td>
                  <td>{tempData.temp1[i]}</td>
                  <td>{tempData.temp2[i]}</td>
                  <td>{tempData.temp3[i]}</td>
                  <td>{tempData.temp4[i]}</td>
                </tr>
            ))}
            </tbody>
        </table>
      )}
    </div>
  );
}

export default App;