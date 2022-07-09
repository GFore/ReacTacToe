import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { colorTextSecondary } from './constants';

const NivoPieChart = ({ data, colors }) => (
  <div className="chartWrapper">
    <ResponsivePie
      data={data}
      colors={colors}
      margin={{ 'top': 20, 'right': 0, 'bottom': 40, 'left': -20 }}
      cornerRadius={2}
      borderColor={{ 'from': 'color', 'modifiers': [['darker', 0.2]] }}
      enableArcLinkLabels={false}
      arcLabel="value"
      arcLabelsRadiusOffset={0.6}
      arcLabelsSkipAngle={40}
      arcLabelsTextColor={colorTextSecondary}
      animate={false}
      theme={{ labels: { text: { fontSize: 25 }} }}
      tooltip={({datum: { id, value, color }}) => (
        <div style={{ padding: 6, backgroundColor: colorTextSecondary, borderRadius: 10 }}>
          <strong style={{ color }}>{id}: {value}</strong>
        </div>
      )}      
    />
  </div>
);

export default NivoPieChart;
