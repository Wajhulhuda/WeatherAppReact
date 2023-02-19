import React, { useState } from "react";

const Details = ({ cities, tableData, setTableData }) => {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");
  // eslint-disable-next-line
  const [descr, setDescr] = useState("");
  const handleClick = () => {
    setCity(inputCity);
    if (cities.indexOf(city) !== -1) {
      fetch(
        `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${inputCity}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTableData([...tableData, data]);
        });
    }
  };
  function handleDelete(id) {
    const data = tableData.filter((item, index) => {
      return id !== index;
    });
    setTableData(data);
  }
  function gethour(endtime) {
    const total = Date.parse(new Date()) - Date.parse(endtime);
    const hours = Math.floor(total / (1000 * 60 * 60));
    return hours;
  }

  const handleDes = (e) => {
    setDescr(e.target.value);
  };
  return (
    <div className="details">
      <div className="search">
        <input
          type="text"
          name="search"
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button className="search-btn" onClick={handleClick}>
          Search
        </button>
      </div>
      <div className="des">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Description</th>
              <th>Temperature(C)</th>
              <th>Pressure(hPa)</th>
              <th>Data age(hrs)</th>
              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            </tr>
          </thead>
          {tableData.length < 1 && (
            <tbody>
              <tr>
                <td className="no-data" colSpan={6}>
                  NO DATA
                </td>
              </tr>
            </tbody>
          )}
          <tbody>
            {tableData.length > 0 &&
              tableData.map((item, index) => {
                return (
                  <tr
                    key={cities[index]}
                    className={index === cities.indexOf(city) ? "back" : ""}
                  >
                    <td>{cities[index]}</td>
                    <td>
                      {item.description ? (
                        <input
                          type="text"
                          onChange={handleDes}
                          defaultValue={item.description}
                        />
                      ) : (
                        "No data"
                      )}
                    </td>
                    <td>
                      {item.temp_in_celsius ? item.temp_in_celsius : "No Data"}
                    </td>
                    <td>
                      {item.pressure_in_hPa ? item.pressure_in_hPa : "No Data"}
                    </td>
                    <td>
                      {item.date_and_time
                        ? gethour(item.date_and_time)
                        : "No data"}
                    </td>
                    <td>
                      {/* eslint-disable-next-line */}
                      <a href="#" onClick={() => handleDelete(index)}>
                        delete
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
