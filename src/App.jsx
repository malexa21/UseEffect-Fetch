import { useState, useEffect } from "react";
import "./App.css";

const URL =
  "https://ensemble-api.open-meteo.com/v1/ensemble?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=icon_seamless";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [meteoData, setMeteoData] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);

    fetch(URL, { method: "GET" })
      .then(
        (response) =>
          new Promise((resolve) =>
            setTimeout(() => {
              resolve(response.json());
            }, 3000)
          )
      )
      .then((data) => {
        setIsLoading(false);
        const { temperature_2m,temperature_2m_member01 , temperature_2m_member02 , temperature_2m_member03 , temperature_2m_member04 , time} = data.hourly;

        setMeteoData({
          standard: temperature_2m,
          day1: temperature_2m_member01,
          day2: temperature_2m_member02,
          day3: temperature_2m_member03,
          day4: temperature_2m_member04,
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
      {meteoData && (
        <table>
          <thead>
            <tr>
              <th>standard</th>
              <th>day1</th>
              <th>day2</th>
              <th>day3</th>
              <th>day4</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {meteoData.standard.map((_, i) => (
              <tr key={i}>
                <td>{meteoData.time[i]}</td>
                <td>{meteoData.standard[i]}</td>
                <td>{meteoData.day1[i]}</td>
                <td>{meteoData.day2[i]}</td>
                <td>{meteoData.day3[i]}</td>
                <td>{meteoData.day4[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;