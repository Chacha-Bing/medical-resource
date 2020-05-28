<template>
	<div>
		<div id="myChart3"></div>
		<div class="from-to">
			<input type="text" name="from" class="from-pos" v-model="from_pos" @keyup.enter="clickTo">
			<span class="show-to">To</span>
			<input type="text" name="to" class="to-pos" v-model="to_pos" @keyup.enter="clickTo">
		</div>
		<tool-tips ref="toolTips">
			<template v-slot:tipTitle>
				<p>无法规划路线</p>
			</template>
			<template v-slot:tipText1>
				<p>1.请保证输入了起始点</p>
			</template>
			<template v-slot:tipText2>
				<p>2.此功能依赖百度接口，请确保输入地点可以被百度接口转化</p>
			</template>
		</tool-tips>
	</div>
</template>

<script>
import toolTips from 'components/toolTips'
import {baidu_api_point} from 'network/hos_poi.js'

export default {
	// @page3 第三页，调用百度api接口，实现两点之间的路径规划，page1的医院数据详细框中也可以进入此页
	name: 'page3',
	components: {
		toolTips
	},
	mounted() {
    this.initMap()
	},
	activated() {
		this.isToHere();
	},
	data() {
		return {
			maker1: null,
			maker2: null,
			map: {},
			driving: {},
			from_pos: '武汉大学',
			to_pos: '武汉中南医院'
		}
	},
	methods: {
		initMap() {
			this.map = new BMap.Map("myChart3");
			this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
			this.map.enableScrollWheelZoom(true);

			//行车路线规划实例
			this.driving = new BMap.DrivingRoute(this.map, {
					renderOptions: {map: this.map, autoViewport: true}, onPolylinesSet: (Route) => {
							for (let i = 0; i < Route.length; i++) {
									let polyline = Route[i].getPolyline();
									polyline.setStrokeColor("#ff0000");
									polyline.setStrokeWeight(5);
									polyline.setStrokeOpacity(1);
							}
					}, onMarkersSet: (routes) => {
							for (let i = 0; i < routes.length; i++) {
									//判断是否是途经点
									if (typeof (routes[i].Km) == "undefined") {
											this.map.removeOverlay(routes[i].marker);
									} else {
											this.map.removeOverlay(routes[i].Km);
									}
							}
					}
			});
			this.driving.enableAutoViewport();//自动调整层级
			let point1 = new BMap.Point(114.376124,30.5411);//首次默认起点:武汉大学
			let point2 = new BMap.Point(114.359069,30.559432);//首次默认终点:中南医院
			this.makerIcon(point1, point2);
		},
		isToHere() {
			//判断用户是从医院详细信息面板入口进入还是直接进入
			if(this.$route.params.destination) {
				this.from_pos = '',
				this.to_pos = this.$route.params.destination
			}
		},
		makerIcon(point1, point2){
			this.map.removeOverlay(this.maker1);
			this.map.removeOverlay(this.maker2);

			this.maker1 = new BMap.Marker(point1);
			let myIcon1 =new BMap.Icon('images/fromIcon.png',new BMap.Size(200,200),{anchor: new BMap.Size(25, 40)})
			myIcon1.setImageSize(new BMap.Size(50,50));
			this.maker1.setIcon(myIcon1);
			this.map.addOverlay(this.maker1);

			this.maker2 = new BMap.Marker(point2);
			let myIcon2 = new BMap.Icon('images/toIcon.png',new BMap.Size(200,200),{anchor: new BMap.Size(25, 40)})
			myIcon2.setImageSize(new BMap.Size(50,50));
			this.maker2.setIcon(myIcon2);
			this.map.addOverlay(this.maker2);
			this.driving.search(point1, point2);
		},
		clickTo() {
			if(this.from_pos === '' || this.to_pos === '') {
				this.failBox();
			} else {
				baidu_api_point(this.from_pos, (data1) => {
					let fromLonLat, toLonLat;
					//根据百度的接口返回值，只有status为0才是正常的
					if(data1.status !== 0) {
						this.failBox();
						return;
					} else {
						fromLonLat = [data1.result.location.lng, data1.result.location.lat];
					}
					baidu_api_point(this.to_pos, (data2) => {
						if(data2.status !== 0) {
							this.failBox();
							return;
						} else {
							toLonLat = [data2.result.location.lng, data2.result.location.lat];
						}
						
						let point1 = new BMap.Point(fromLonLat[0], fromLonLat[1]);
						let point2 = new BMap.Point(toLonLat[0], toLonLat[1]);
						this.makerIcon(point1, point2);
					})
				})
			}
		},
		failBox() {
			this.$refs.toolTips.tipActive = true;
			setTimeout(() => {
				this.$refs.toolTips.tipActive = false;
			}, 2000)
		}
	}
}
</script>

<style>
#myChart3 {
	width: 100vw;
	height: 100vh;
}
div.anchorBL {
	display: none;
}
.from-to {
	width: 100%;
	position: absolute;
	top: 40px;
	display: flex;
	justify-content: space-evenly;
}
.from-pos, .to-pos {
	width: 200px;
	height: 30px;
	border: 2px solid #7270ff;
	border-radius: 20px;
	outline: none;
	font-family: 'Tencent';
	text-indent: 15px;
	color: orange;
}
.show-to {
	font-family: 'Tencent';
	font-size: 2rem;
	color: var(--active-color);
}
</style>