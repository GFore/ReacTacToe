import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const MyResponsivePie = ({ data, colors }) => (
  <ResponsivePie
      data={data}
      margin={{
          "top": 80,
          "right": 80,
          "bottom": 40,
          "left": 80
      }}
      colors={colors}
      borderColor={{
          "from": "color",
          "modifiers": [
              [
                  "darker",
                  0.2
              ]
          ]
      }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={7}
      radialLabelsTextColor="whitesmoke"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={15}
      radialLabelsLinkHorizontalLength={16}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{
          "from": "color"
      }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
          {
              "anchor": "top",
              "direction": "row",
              "translateY": -20,
              "translateX": 30,
              "itemWidth": 100,
              "itemHeight": 18,
              "itemTextColor": "whitesmoke",
              "symbolSize": 14,
              "symbolShape": "circle",
              // "effects": [
              //     {
              //         "on": "hover",
              //         "style": {
              //             "itemTextColor": "#bbb"
              //         }
              //     }
              // ]
          }
      ]}
      tooltip={({ id, value, color }) => (
        <strong style={{ color }}>
          {id}: {value}
        </strong>
      )}
      theme={{
        tooltip: {
          container: {
            background: '#333',
          },
        },
      }}
  />
);


export default MyResponsivePie;