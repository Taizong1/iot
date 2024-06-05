import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Bar(props) {
  const {messageDataCount, timeLabel} = props;
    const option = {
      xAxis: {
        type: 'category',
        data: timeLabel,
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [
        {
          data: messageDataCount,
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
