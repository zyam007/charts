import React from 'react';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory';

export default function BarChart({ city, cityName }) {
  return (
    <div className="mt-4">
      <h6 className="views-line text-center">
        Views in <b>{cityName}</b> by Genre
      </h6>
      <VictoryChart
        className="victoryContainer"
        style={{ tickLabels: { fontSize: 120 } }}
        width={600}
        height={400}
        padding={{ top: 10, bottom: 40, left: 80, right: 10 }}
        animate={{
          duration: 500,
          onLoad: { duration: 200 },
        }}
        domainPadding={100}
      >
        <VictoryBar
          data={city}
          x="Genre"
          y="Views"
          labels={({ datum }) => datum.Views}
          style={{
            labels: { fill: 'white' },
            data: {
              fill: '#05668D',
              fillOpacity: 0.7,
            },
          }}
          labelComponent={<VictoryLabel dy={20} />}
        />
      </VictoryChart>
    </div>
  );
}
