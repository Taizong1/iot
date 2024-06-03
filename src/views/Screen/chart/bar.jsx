import React from "react";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export default function Bar(props) {
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
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
