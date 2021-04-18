import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

const colorData = ['#FF9505', '#EC4E20', '#016FB9', '#7ee081', '#c3f3c0'];
const defaultData = [
  { Genre: 'Sports', Views: 0 },
  { Genre: 'Science Fiction', Views: 0 },
  { Genre: 'Mystery', Views: 500 },
];

export default function PieChart({ city, cityName }) {
  const [pieData, setPieData] = useState(defaultData);

  //update on selected city
  useEffect(() => {
    setPieData(city);
  }, [cityName]);

  return (
    <div className="text-center">
      <h6 className="views-line">
        Views in <b>{cityName}</b> by Genre
      </h6>
      <VictoryPie
        animate={{
          easing: 'exp',
          duration: 2000,
        }}
        colorScale={colorData}
        data={pieData}
        x="Genre"
        y="Views"
        labels={({ datum }) => `${datum.Genre}: ${datum.Views}`}
        style={{
          data: {
            fillOpacity: 0.8,
          },
        }}
        labelComponent={<VictoryLabel renderInPortal />}
      />
    </div>
  );
}
