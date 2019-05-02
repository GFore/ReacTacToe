import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
      data={data}
      margin={{
          "top": 40,
          "right": 80,
          "bottom": 80,
          "left": 80
      }}
      colors={{
          "scheme": "nivo"
      }}
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
      radialLabelsTextColor="#333333"
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
              "anchor": "bottom",
              "direction": "row",
              "translateY": 56,
              "itemWidth": 100,
              "itemHeight": 18,
              "itemTextColor": "#999",
              "symbolSize": 18,
              "symbolShape": "circle",
              "effects": [
                  {
                      "on": "hover",
                      "style": {
                          "itemTextColor": "#000"
                      }
                  }
              ]
          }
      ]}
  />
);


export default MyResponsivePie;