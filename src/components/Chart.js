import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Button } from 'react-bootstrap';
import BarChart from './BarChart';
import PieChart from './PieChart';
import './Chart.css';

const category = 'Program Genre';
/*

Other possible filter values

const category = 'Program Network';
const category = 'Viewer Hometown';
const category = 'Program Title';

*/

export default function Chart({ groups }) {
  const [singleGroup, setSingleGroup] = useState('');
  const [loadChart, setLoadChart] = useState(false);
  const [barState, setBarState] = useState(false);
  const [pieState, setPieState] = useState(false);
  const [cityNames, setCityNames] = useState([]);
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    //get all cities names
    const allCityNames = Array.from(groups.keys());
    setCityNames(allCityNames);
  }, []);

  function handleBar() {
    setPieState(false);
    setLoadChart(false);
    setBarState(!barState);
  }
  function handlePie() {
    setBarState(false);
    setLoadChart(false);
    setPieState(!pieState);
  }
  function handlePickCity(pickedCity) {
    setSingleGroup(pickedCity);
    //calculate views for selected city by genre
    const oneCity = d3
      .rollups(
        groups.get(pickedCity),
        (xs) => d3.sum(xs, (x) => x['Number of Viewers']),
        (d) => d[category]
      )
      .map(([k, v]) => ({ Genre: k, Views: v }));
    setCityData(oneCity);
    setLoadChart(true);
  }

  return (
    <div className="chartContainer">
      <div className="buttons-chart w-75 d-flex justify-content-center mx-1 px-1">
        <Button className="mx-2" variant="success" onClick={handleBar}>
          Bar Chart
        </Button>
        <Button className="mx-2" variant="success" onClick={handlePie}>
          Pie Chart
        </Button>
      </div>
      {(barState || pieState) && (
        <div className="city-container">
          <ul className="city-list">
            {cityNames.map((c, idx) => (
              <li className="" key={idx} onClick={() => handlePickCity(c)}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
      {barState && loadChart && (
        <BarChart city={cityData} cityName={singleGroup} />
      )}
      {pieState && loadChart && (
        <PieChart city={cityData} cityName={singleGroup} />
      )}
    </div>
  );
}
