import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as d3 from 'd3';
import './App.css';
import Chart from './components/Chart';
import Header from './components/Header';

const filteredValue = 'Viewer Hometown';
/*

Or can filter by these values instead of hometown

const filteredValue = 'Program Network';
const filteredValue = 'Program Genre';
const filteredValue = 'Program Title';

*/

export default function App() {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //load data from cvs file
    async function fetchData() {
      const info = await d3.csv('/allData.csv');
      const group = d3.group(info, (d) => d[filteredValue]);
      setGroups(group);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="landing">
      <Header />
      <div className="mainContainer">
        {!loading && <Chart groups={groups} />}
      </div>
    </div>
  );
}
