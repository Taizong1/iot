import React, { useRef, useEffect } from 'react';

//import echarts from 'echarts/lib/echarts'; 
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';  //引入bmap
//let exfn = ()=><div>页面</div>;



export default function Scatter({ deviceData, messageData }) {
	const mapRef = useRef();


	useEffect(() => {
		//var chartDom = document.getElementById('main');
		//var myChart = echarts.init(chartDom);
		var option;
		//特别注意格式是name:"名称"，value前两个值是坐标，最后一个值是mqtt值，mqtt越大散点越大。
		let res = []
		deviceData.forEach((item, index) => {
			const message = messageData[index];
			res.push({
				name: item.device_name,
				value: [message.latitude, message.longitude, message.value]
			})
		})

		option = {

			tooltip: {
				trigger: 'item'
			},
			bmap: {
				center: [120.1603, 30.2717],
				zoom: 8,
				roam: true,
				mapStyle: {
					styleJson: [{
						'featureType': 'water',
						'elementType': 'all',
						'stylers': {
							'color': '#d1d1d1'
						}
					}, {
						'featureType': 'land',
						'elementType': 'all',
						'stylers': {
							'color': '#f3f3f3'
						}
					}, {
						'featureType': 'railway',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					}, {
						'featureType': 'highway',
						'elementType': 'all',
						'stylers': {
							'color': '#fdfdfd'
						}
					}, {
						'featureType': 'highway',
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					}, {
						'featureType': 'arterial',
						'elementType': 'geometry',
						'stylers': {
							'color': '#fefefe'
						}
					}, {
						'featureType': 'arterial',
						'elementType': 'geometry.fill',
						'stylers': {
							'color': '#fefefe'
						}
					}, {
						'featureType': 'poi',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					}, {
						'featureType': 'green',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					}, {
						'featureType': 'subway',
						'elementType': 'all',
						'stylers': {
							'visibility': 'off'
						}
					}, {
						'featureType': 'manmade',
						'elementType': 'all',
						'stylers': {
							'color': '#d1d1d1'
						}
					}, {
						'featureType': 'local',
						'elementType': 'all',
						'stylers': {
							'color': '#d1d1d1'
						}
					}, {
						'featureType': 'arterial',
						'elementType': 'labels',
						'stylers': {
							'visibility': 'off'
						}
					}, {
						'featureType': 'boundary',
						'elementType': 'all',
						'stylers': {
							'color': '#fefefe'
						}
					}, {
						'featureType': 'building',
						'elementType': 'all',
						'stylers': {
							'color': '#d1d1d1'
						}
					}, {
						'featureType': 'label',
						'elementType': 'labels.text.fill',
						'stylers': {
							'color': '#999999'
						}
					}]
				}
			},
			series: [
				{
					name: '设备',
					type: 'scatter',
					coordinateSystem: 'bmap',
					data: res,
					symbolSize: function (val) {
						return val[2] / 10;
					},
					encode: {
						value: 2
					},
					label: {
						formatter: '{b}',
						position: 'right',
						show: false
					},
					emphasis: {
						label: {
							show: true
						}
					}
				}
			]

		};

		//option && myChart.setOption(option);
		//console.log(option);
		let mapInstance;
		function renderChart() {
			const renderedInstance = echarts.getInstanceByDom(mapRef.current);
			if (renderedInstance) {
				mapInstance = renderedInstance;
			} else {
				mapInstance = echarts.init(mapRef.current);
			}
			mapInstance.setOption(option);
		};
		renderChart();
		//console.log(mapInstance);
		/*
		return () => {
			mapInstance && mapInstance.dispose();
		};
		*/
	}, [deviceData]);


	//style={{backgroundColor:theme.palette.background,flexGrow:1,color:theme.palette.text.primary}}
	return (
		<div>

			<div style={{ width: 900, height: 600, }} id="m" ref={mapRef}>

			</div>
		</div>
	);

};

//export default exfn;