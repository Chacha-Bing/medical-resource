<template>
	<div>
		<div id="myChart2"></div>
		<loading v-if="showLoading" class="loading-box"></loading>
	</div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap';
import loading from 'components/loading'

import {get_heatmap_point} from 'network/hos_poi.js'

export default {
	// @page2，第二页，热力图展示医疗资源密度并作分析
	name: 'page2',
	components: {
		loading
	},
	data() {
		return {
			showLoading: true
		}
	},
	mounted() {
    this.initMap()
	},
	methods: {
		initMap() {
			let myChart = echarts.init(document.getElementById('myChart2'));
			myChart.setOption({
						animation: false,
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                }
            },
            series: [{
                type: 'heatmap',
                coordinateSystem: 'bmap',
                data: [],
                pointSize: 5,
                blurSize: 6
            }],
            bmap: {
                center: [108.13066322374, 35.240018034923],
                zoom: 5,
                roam: true,
                mapStyle: {
                    styleJson: [
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
                            "color": "#044161"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#064f85"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#005b96",
                            "lightness": 1
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#00508b"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
										{
												"featureType": "boundary",
												"elementType": "geometry.fill",
												"stylers": {
														"color": "#029fd4"
												}
										},
										{
												"featureType": "building",
												"elementType": "all",
												"stylers": {
														"color": "#1a5787"
												}
										}
                ]
            }
            },
			});
			get_heatmap_point((data) => {
				let point_coord = [].concat.apply([], data.data.map(function (track) {
					return track.map(function (seg) {
						return seg.coord.concat([1]);
					});
				}));
        myChart.setOption({
					series: [{
						type: 'heatmap',
						coordinateSystem: 'bmap',
						data: point_coord,
						pointSize: 5,
						blurSize: 6
					}]
				});
				this.showLoading = false;
			})
		}
	}
}
</script>

<style>
#myChart2 {
	width: 100vw;
	height: 100vh;
}
div.anchorBL {
	display: none;
}
.loading-box>span {
	color: rgb(246, 235, 13)!important;
	font-family: 'Tencent';
}
</style>
