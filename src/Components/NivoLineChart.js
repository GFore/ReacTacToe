import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { colorTextSecondary } from './constants';

const theme = {
  // background: "#222222",
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

const NivoLineChart = ({ data, colors }) => (
  <div className="chartWrapper">
    <ResponsiveLine
      data={data}
      curve={"monotoneX"}
      // gridYValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
  
      margin={{ top: 30, right: 10, bottom: 90, left: 45 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: false, min: 0, max: 'auto' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Games Played',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        legend: 'Count',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={colors}
      pointSize={4}
      pointColor={{ from: 'color', modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor', modifiers: [] }}
      pointLabel="y"
      pointLabelYOffset={-12}
      enableSlices="x"
  
      animate={true}
      motionStiffness={90}
      motionDamping={15}
  
      tooltip={({ id, value, color }) => (
        <strong style={{ color }}>{id}{id === 'ties' ? '' : ' wins'}: {value}</strong>
      )}
      theme={theme}
    />
  </div>
);

export default NivoLineChart;
