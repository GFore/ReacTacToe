import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { colorTextSecondary } from './constants';

const NivoPieChart = ({ data, colors }) => (
  <ResponsivePie
      data={data}
      colors={colors}
      margin={{ 'top': 20, 'right': 0, 'bottom': 40, 'left': -20 }}
      borderColor={{ 'from': 'color', 'modifiers': [['darker', 0.2]] }}
      enableRadialLabels={false}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor={colorTextSecondary}
      animate={true}
      motionStiffness={90}
      motionDamping={15}

      tooltip={({ id, value, color }) => (
        <strong style={{ color }}>
          {id}: {value}
        </strong>
      )}
      theme={{
        labels: { text: { fontSize: 25, }},
        tooltip: {
          container: {
            background: colorTextSecondary,
            borderRadius: '10px',
          },
        },
      }}
  />
);

export default NivoPieChart;