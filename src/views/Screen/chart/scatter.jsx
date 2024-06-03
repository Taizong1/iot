import React, {useRef, useEffect} from 'react';
 
//import echarts from 'echarts/lib/echarts'; 
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';  //引入bmap
//let exfn = ()=><div>页面</div>;
 
 
 
export default function Scatter() {
    
    const mapRef = useRef();
 
 
    useEffect(() => {
    	//var chartDom = document.getElementById('main');
		//var myChart = echarts.init(chartDom);
		var option;
 	//特别注意格式是name:"名称"，value前两个值是坐标，最后一个值是mqtt值，mqtt越大散点越大。
    const res = [  
      { name: '设备1', value: [121.1351, 30.2614, 125.84] },  
      { name: '设备2', value: [120.1325, 32.2604, 116.56] },  
      { name: '设备3', value: [122.1338, 31.2597, 109.32] },  
      { name: '设备4', value: [118.1366, 31.2601, 115.57] },  
      { name: '设备5', value: [120.1347, 30.2597, 129.92] },  
      { name: '设备6', value: [122.1327, 28.2598, 140.03] },  
      { name: '设备7', value: [120.1344, 28.2601, 144.83] },  
      { name: '设备8', value: [118.1343, 29.2597, 132.17] },  
      { name: '设备9', value: [120.1335, 30.2601, 141.85] },  
      { name: '设备10', value: [120.1313, 30.2599, 119.66] },  
      { name: '设备11', value: [120.1335, 30.2598, 126.79] },  
      { name: '设备12', value: [120.1325, 30.2602, 107.45] },  
      { name: '设备13', value: [120.1325, 30.2602, 116.82] },  
      { name: '设备14', value: [120.1331, 30.2602, 139.49] },  
      { name: '设备15', value: [120.1347, 30.2601, 130.57] },  
    ];   
 
		option = {

		    tooltip : {
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
    },[]);
 
 
    //style={{backgroundColor:theme.palette.background,flexGrow:1,color:theme.palette.text.primary}}
	return (
		<div>
 
            <div style={{width: 900, height: 600, }} id="m" ref={mapRef}>
                
            </div>
        </div>
	);
 
};
 
//export default exfn;