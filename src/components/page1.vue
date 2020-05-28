<template>
	<div>
		<h1 class="main-title">全国医疗点位数据</h1>
		<h2 class="sub-title">疫情加油</h2>
		<search-bar class="search-bar-pos" @startSearch='startSearch'></search-bar>
		<loading v-if="showLoading" class="loading-box"></loading>
		<detail-box v-show="isShow" :detailMsg="detailMsg" @hideBox='hideBox' ref="detailBox"></detail-box>
		<tool-tips ref="toolTips">
			<template v-slot:tipTitle>
				<p>该地点不存在</p>
			</template>
			<template v-slot:tipText1>
				<p>1.搜索地点，返回20km以内的医疗点，如输入点未查询到则你会看到此提示</p>
			</template>
			<template v-slot:tipText2>
				<p>2.搜索某家医院，支持模糊搜索，并请总是加上‘医院’二字，可能返回多家医院</p>
			</template>
		</tool-tips>
		<show-button class="show-wrapper1" child-id='firstShow' show-color='#ddb925' @showClick='showClick'>
			<template v-slot:show-title>
				<p>医疗全点</p>
			</template>
		</show-button>
		<show-button class="show-wrapper2" child-id='secondShow' show-color='#a9334c' @showClick='showClick'>
			<template v-slot:show-title>
				<p>发热门诊</p>
			</template>
		</show-button>
		<show-button class="show-wrapper3" child-id='thirdShow' show-color='#b339ff' @showClick='showClick'>
			<template v-slot:show-title>
				<p>搜索目标</p>
			</template>
		</show-button>
		<div id="myChart1"></div>
	</div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap';

import searchBar from 'components/searchBar'
import detailBox from 'components/detailBox'
import toolTips from 'components/toolTips'
import showButton from 'components/showButton'
import loading from 'components/loading'

import {get_hos_point, get_fever_point, search_hos_point, search_accurate_hos, search_distance_point} from 'network/hos_poi.js'

var hospital_poi = [];
var hospital_fever_poi = [];
var myChart;
var option;
export default {
	// @page1 首页，展示医疗点位数据以及查询和交互
	name: 'page1',
	components: {
		searchBar,
		detailBox,
		toolTips,
		showButton,
		loading
	},
	data() {
		return {
			isShow: false,
			showLoading: true,
			showObj: {
				firstShow : ['医疗全点', []],
				secondShow : ['发热门诊', []],
				thirdShow : ['搜索结果', []]
			},
			detailMsg: {
				name: '我是占位',
				tag: '我是占位',
				tel: '我是占位',
				addr: '我是占位',
			}
		}
	},
	mounted() {
    this.getmap()
	},
	methods: {
		hideBox() {
			this.isShow = false
		},
		showSearch(resData) {
			let search_array = [];
			let opSeries = option.series;
			let flag_key;

			for (const item of resData) {
				search_array.push({
					name: item.name,
					value: [item.lng, item.lat]
				})
			}

			this.showObj.thirdShow[1] = search_array;

			//为找到的医院数据着色
			for (flag_key = 0; flag_key < opSeries.length; flag_key++) {
				if(opSeries[flag_key].type === 'effectScatter') {
					opSeries[flag_key].data = search_array;
					break;
				}
			}
			if(flag_key === opSeries.length) {
				opSeries.push(
					{
						name: '搜索结果',
						type: 'effectScatter',
						coordinateSystem: 'bmap',
						data: search_array,
						symbolSize: function (val) {
								return 8;
						},
						showEffectOn: 'emphasis',
						rippleEffect: {
								brushType: 'stroke'
						},
						hoverAnimation: true,
						itemStyle: {
								color: '#b339ff',
						},
						tooltip: {
							position: 'top',
							formatter: '{b}'
						},
						zlevel: 1
					}
				)
			}
		},
		startSearch(hos_search) {
			let that = this;
			if(hos_search === '') {
				console.log('内容不能为空');
			} else if(hos_search.includes('医院')) {
				//搜索框中有‘医院’二字的判断为定点搜索数据库中的医院
				//注意返回的数据是一家/多家在显示上会有区别
				search_hos_point(hos_search, (data) => {
					let hos_data = data.data;
					//没找到这个地点时，message属性会存在并且提示警告信息
					if(hos_data.message){
						this.$refs.toolTips.tipActive = true;
						setTimeout(() => {
							this.$refs.toolTips.tipActive = false;
						}, 2000)
					} else if (hos_data.hospital.length === 1) {
						let search_point = [hos_data.hospital[0].lng, hos_data.hospital[0].lat];
						this.showSearch(hos_data.hospital);
						option.bmap.center = search_point;
						option.bmap.zoom = 11;
						myChart.setOption(option);
					} else {
						this.showSearch(hos_data.hospital);
						option.bmap.center = [104.114129, 37.550339];
						option.bmap.zoom = 5;
						myChart.setOption(option);
					}
				})
			} else {
				//搜索框没有‘医院’二字的判断为搜索本地区一定范围内的医院
				search_distance_point(hos_search, (data) => {
					if(data.data.message){
						//没找到这个地点
						this.$refs.toolTips.tipActive = true;
						setTimeout(() => {
							this.$refs.toolTips.tipActive = false;
						}, 2000)
					} else {
						let search_point = data.data.address_location;
						this.showSearch(data.data.hospital);
						option.bmap.center = search_point;
						option.bmap.zoom = 11;
						myChart.setOption(option);
					}
				})
			}
		},
		showClick(childId, showBtmColor) {
			let nameId = this.showObj[childId][0];
			let opSeries = option.series;

			for (let i = 0; i < opSeries.length; i++) {
				if(opSeries[i].name === nameId) {
					if(showBtmColor) {
						opSeries[i].data = this.showObj[childId][1];
					} else {
						opSeries[i].data = [];
					}

					if(childId !== 'thirdShow') {
						option.bmap.center = [104.114129, 37.550339];
						option.bmap.zoom = 5;
					}
					myChart.setOption(option);
					break;
				}
			}
		},
		show_pos(data) {
			for (const item of data.data.features) {
				hospital_poi.push({
					name: item.properties.name,
					value: item.geometry.coordinates
				})
			}

			this.showObj.firstShow[1] = hospital_poi;

			if (option && typeof option === "object") {
					myChart.setOption(option, true);
					this.showLoading = false;
					
					let that = this;
					myChart.on('click', (params) => {
						if(option.bmap.zoom !== 10) {
							option.bmap.center = params.data.value;
							option.bmap.zoom = 10;
							myChart.setOption(option);
						}
						search_accurate_hos(params.name, (data) => {
							let hos_msg = data.data.hospital[0];
							let name = params.name;
							let tag = hos_msg.content_tag || '暂无数据';
							let tel = hos_msg.telephone || '暂无数据';
							let addr = hos_msg.address || '暂无数据';
							this.detailMsg = {
								name,
								tag,
								tel,
								addr
							}
						})
						that.isShow = true
						setTimeout(()=>{
							that.$refs.detailBox.isActive = false
						})
					});
				}
		},
		show_fever_pos(data) {
			for (const item of data.data.features) {
					hospital_fever_poi.push({
					name: item.properties.name,
					value: item.geometry.coordinates
				})
			}
			this.showObj.secondShow[1] = hospital_fever_poi
		},
		getmap() {
			var dom = document.getElementById("myChart1");
			myChart = echarts.init(dom);
			var app = {};
			
			get_fever_point(this.show_fever_pos);
			get_hos_point(this.show_pos);

			option = {
					backgroundColor: 'transparent',
					tooltip : {
							trigger: 'item'
					},
					series : [
							{
									name: '医疗全点',
									type: 'scatter',
									coordinateSystem: 'bmap',
									data: hospital_poi,
									symbolSize: function (val) {
											return 5;
									},
									label: {
											formatter: '',
											position: 'right'
									},
									itemStyle: {
											color: '#ddb926'
									},
									emphasis: {
											label: {
													show: true
											}
									},
									tooltip: {
										position: 'top',
										formatter: '{b}'
									}
							},
							{
									name: '发热门诊',
									type: 'scatter',
									coordinateSystem: 'bmap',
									data: hospital_fever_poi,
									symbolSize: function (val) {
											return 5;
									},
									label: {
											formatter: '',
											position: 'right'
									},
									itemStyle: {
											color: '#a9334c'
									},
									emphasis: {
											label: {
													show: true
											}
									},
									tooltip: {
										position: 'top',
										formatter: '{b}'
									}
							},
					],
					bmap: {
							center: [104.114129, 37.550339],
							zoom: 5,
							roam: true,
							mapStyle: {
									styleJson: [
										{
											'featureType': 'land',     //调整土地颜色
											'elementType': 'geometry',
											'stylers': {
												'color': '#081734'
											}
										},
										{
											'featureType': 'building',   //调整建筑物颜色
											'elementType': 'geometry',
											'stylers': {
												'color': '#04406F'
											}
										},
										{
											'featureType': 'building',   //调整建筑物标签是否可视
											'elementType': 'labels',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'highway',     //调整高速道路颜色
											'elementType': 'geometry',
											'stylers': {
												'color': '#015B99'
											}
										},
										{
											'featureType': 'highway',    //调整高速名字是否可视
											'elementType': 'labels',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'arterial',   //调整一些干道颜色
											'elementType': 'geometry',
											'stylers': {
												'color':'#003051'
											}
										},
										{
											'featureType': 'arterial',
											'elementType': 'labels',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'green',
											'elementType': 'geometry',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'water',
											'elementType': 'geometry',
											'stylers': {
												'color': '#044161'
											}
										},
										{
											'featureType': 'subway',    //调整地铁颜色
											'elementType': 'geometry.stroke',
											'stylers': {
												'color': '#003051'
											}
										},
										{
											'featureType': 'subway',
											'elementType': 'labels',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'railway',
											'elementType': 'geometry',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'railway',
											'elementType': 'labels',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'all',     //调整所有的标签的边缘颜色
											'elementType': 'labels.text.stroke',
											'stylers': {
												'color': '#313131'
											}
										},
										{
											'featureType': 'all',     //调整所有标签的填充颜色
											'elementType': 'labels.text.fill',
											'stylers': {
												'color': '#FFFFFF'
											}
										},
										{
											'featureType': 'manmade',   
											'elementType': 'geometry',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'manmade',
											'elementType': 'labels',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'local',
											'elementType': 'geometry',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'local',
											'elementType': 'labels',
											'stylers': {
												'visibility': 'off'
											}
										},
										{
											'featureType': 'subway',
											'elementType': 'geometry',
											'stylers': {
												'lightness': -65
											}
										},
										{
											'featureType': 'railway',
											'elementType': 'all',
											'stylers': {
												'lightness': -40
											}
										},
										{
											'featureType': 'boundary',
											'elementType': 'geometry',
											'stylers': {
												'color': '#8b8787',
												'weight': '1',
												'lightness': -29
											}
										}
									]
							}
					},
			};
			if (option && typeof option === "object") {
				myChart.setOption(option, true);
			}
		}
	}
}
</script>

<style>
#myChart1 {
	width: 100vw;
	height: 100vh;
}
div.anchorBL {
	display: none;
}
.search-bar-pos {
	position: absolute;
	left: 70%;
	top: 30px;
	z-index: 1;
}
.loading-box>span {
	color: rgb(246, 235, 13)!important;
	font-family: 'Tencent';
}
.main-title, .sub-title {
	margin: 0;
	position: absolute;
	width: 100%;
	top: 10px;
	text-align: center;
	font-family: 'Tencent';
	color: white;
	z-index: 1;
}
.sub-title {
	color: slategray;
	font-size: medium;
	padding-top: 44px;
}
.show-wrapper1 {
	top: 20px;
	left: 20px;
}
.show-wrapper2 {
	top: 60px;
	left: 20px;
}
.show-wrapper3 {
	top: 100px;
	left: 20px;
}
</style>