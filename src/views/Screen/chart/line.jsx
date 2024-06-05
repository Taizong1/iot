import React from "react";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export default function Line({totalDevice, onlineTotalDevice, notOnlintotalDevice, timeLabel}){
  const option = {

    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['上线设备', '离线设备', '总设备数']
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
      data: timeLabel
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '上线设备',
        type: 'line',
        stack: 'Total',
        data: onlineTotalDevice
      },
      {
        name: '离线设备',
        type: 'line',
        stack: 'Total',
        data: notOnlintotalDevice
      },
      {
        name: '总设备数',
        type: 'line',
        stack: 'Total',
        data: totalDevice
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
