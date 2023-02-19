import React, { useState } from "react";
import Details from "./Details";

const GetWeather = () => {
  const [tableData, setTableData] = useState([]);

  let cities = ["London", "New York", "Los Angles", "Las Vegas"];
  const [ind, setInd] = useState(0);
  const hadleIndex = () => {
    if (ind !== cities.length) {
      setInd((prev) => prev + 1);
      fetch(
        `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cities[ind]}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTableData([...tableData, data]);
        });
    }
  };

  return (
    <div className="row">
      <div className="col-2 left">
        <div className="city-list">
          <div className="btn">
            <button className="btn-get" onClick={hadleIndex}>
              Get Weather
            </button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, i) => {
                  return (
                    <tr key={i} className={ind - 1 === i ? "active" : ""}>
                      <td>{city}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <div className="col-10">
        <Details
          cities={cities}
          ind={ind}
          tableData={tableData}
          setTableData={setTableData}
        />
      </div>
    </div>
  );
};

export default GetWeather;
