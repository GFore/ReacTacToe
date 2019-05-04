import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { colorTextSecondary } from './constants';

const MyResponsivePie = ({ data, colors }) => (
  <ResponsivePie
      data={data}
      colors={colors}
      margin={{ 'top': 40, 'right': 0, 'bottom': 20, 'left': 0 }}
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
        legends: { text: { fontSize: 14, }},
        tooltip: {
          container: {
            background: colorTextSecondary,
            borderRadius: '10px',
          },
        },
      }}
  />
);

export default MyResponsivePie;