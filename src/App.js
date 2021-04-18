import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as d3 from 'd3';
import './App.css';
import Chart from './components/Chart';
import Header from './components/Header';

export default function App() {
  const [cityGroups, setCityGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //load data from cvs file
    async function fetchData() {
      const info = await d3.csv('/allData.csv');
      const groups = d3.group(info, (d) => d['Viewer Hometown']);
      setCityGroups(groups);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="landing">
      <Header />
      <div className="mainContainer">
        {!loading && <Chart cityGroups={cityGroups} />}
      </div>
    </div>
  );
}
