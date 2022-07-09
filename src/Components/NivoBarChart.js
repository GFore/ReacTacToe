import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { colorTextSecondary } from './constants';

const theme = {
  axis: {
    fontSize: "14px",
    tickColor: "#eee",
    ticks: {
      line: { stroke: "#555" },
      text: { fill: "#fff" },
    },
    legend: {
      text: { fill: "#aaa" },
    },
  },
  grid: {
    line: { stroke: "#777" },
  },
  tooltip: {
    container: {
      background: colorTextSecondary,
      borderRadius: '10px',
    },
  },
};

const NivoBarChart = ({ data, maxValue }) => (
  <div className="chartWrapper">
    <ResponsiveBar
      data={data}
      indexBy='player'
      keys={['p1', 'p2', 'ties']}
      maxValue={maxValue}
      colorBy="id"
      colors={({ id, data }) => data[`${id}Color`]}
      margin={{ 'top': 30, 'right': 10, 'bottom': 70, 'left': 20 }}
      padding={0.35}
      borderColor={{ 'from': 'color', 'modifiers': [['darker', 0.2]] }}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
      axisLeft={{ tickSize: 1, tickPadding: 5, tickRotation: 0 }}
      animate={true}
      tooltip={({ color, indexValue, value }) => (
        <div style={{ padding: 6, backgroundColor: colorTextSecondary, borderRadius: 10 }}>
          <strong style={{ color }}>{`${indexValue}: ${value}`}</strong>
        </div>
      )}
      theme={theme}
    />
  </div>
);

export default NivoBarChart;
