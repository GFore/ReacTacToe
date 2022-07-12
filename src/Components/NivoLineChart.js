import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { colorTextSecondary } from './constants';

const theme = {
  axis: {
    fontSize: "14px",
    tickColor: "#eee",
    ticks: {
      line: { stroke: "#555" },
      text: { fill: "#fff" },
    },
    legend: { text: { fill: "#aaa" } },
  },
  grid: { line: { stroke: "#777" } },
  tooltip: {
    container: {
      background: colorTextSecondary,
      borderRadius: '10px',
    },
  },
};

const NivoLineChart = ({ colors, data, maxValue }) => {
  const gameCount = data[0].data.length;
  return (
    <ResponsiveLine
      data={data}
      curve={"monotoneX"}   
      margin={{ top: 30, right: 30, bottom: 70, left: 45 }}
      xScale={{ type: gameCount < 10 ? 'point' : 'linear' }}
      yScale={{ type: 'linear', stacked: false, min: 0, max: maxValue }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: gameCount < 10 ? gameCount : 10,
        legend: 'Games Played',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: maxValue < 10 ? maxValue : 10,
        legend: 'Count',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={colors}
      enableGridX={gameCount < 30}
      enablePoints={gameCount < 30}
      pointSize={gameCount > 10 ? 2 : 4}
      pointColor={{ from: 'color', modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor', modifiers: [] }}
      enableSlices="x"
      theme={theme}
      sliceTooltip={({slice}) => (
        <div style={{ padding: 8, backgroundColor: colorTextSecondary, borderRadius: 10, fontSize: 12 }}>              
          {slice.points.map(point => (
            <div key={point.id} style={{ color: point.serieColor, padding: '2px 0 2px 2px' }}>
              <strong>{point.data.yFormatted}</strong> {point.serieId === 'ties' ? 'Ties' : `${point.serieId.toUpperCase()} Wins`}
            </div>
          ))}
          <hr />
          <div>{slice.points[0].data.x} Games Played</div>
        </div>
      )}
    />
  );
};

export default NivoLineChart;
