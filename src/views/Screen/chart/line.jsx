import React from "react";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export default function Line(props) {
    const option = {

        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['上线设备','离线设备','总设备数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '上线设备',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '离线设备',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '总设备数',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
        ]
      };
      
      
      
      
  return (
    <div>
      <ReactEcharts
        style={{ width: "100%", height: "300px" }}  
        option={option}
      />
    </div>
  );
}
