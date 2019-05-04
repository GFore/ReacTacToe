import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { colorTextPrimary, colorTextSecondary } from './constants';

const MyResponsivePie = ({ data, colors }) => (
  <ResponsivePie
      data={data}
      colors={colors}
      margin={{ 'top': 60, 'right': 0, 'bottom': 20, 'left': 0 }}
      borderColor={{ 'from': 'color', 'modifiers': [['darker', 0.2]] }}
      enableRadialLabels={false}
      // radialLabelsSkipAngle={10}
      // radialLabelsTextXOffset={7}
      // radialLabelsTextColor={colorTextPrimary}
      // radialLabelsLinkOffset={0}
      // radialLabelsLinkDiagonalLength={15}
      // radialLabelsLinkHorizontalLength={16}
      // radialLabelsLinkStrokeWidth={1}
      // radialLabelsLinkColor={{ 'from': 'color' }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor={colorTextSecondary}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[{
        'anchor': 'top',
        'direction': 'row',
        'translateY': -40,
        'translateX': 30,
        'itemWidth': 100,
        'itemHeight': 18,
        'itemTextColor': colorTextPrimary,
        'symbolSize': 15,
        'symbolShape': 'circle',
      }]}
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