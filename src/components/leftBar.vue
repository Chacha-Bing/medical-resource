<template>
	<div id="leftBar">
		<div class="left-content" id="leftContent">
			<leftBarContent path="/location">
				<template v-slot:content>
					<p>医疗点位图</p>
				</template>
			</leftBarContent>
			<leftBarContent path="/resource">
				<template v-slot:content>
					<p>资源热力图</p>
				</template>
			</leftBarContent>
			<leftBarContent path="/fromTo">
				<template v-slot:content>
					<p>点位导航图</p>
				</template>
			</leftBarContent>
			<leftBarContent path="/visulization">
				<template v-slot:content>
					<!-- <p><a href="http://127.0.0.1/%E7%96%AB%E6%83%85%E5%8F%AF%E8%A7%86%E5%8C%96-(%E7%A9%BA%E9%97%B4%E5%88%86%E6%9E%90/" target="_blank">疫情可视化</a></p> -->
					<p><a href="http://bingchacha.top/COVID-Visual/" target="_blank">疫情可视化</a></p>
				</template>
			</leftBarContent>
			<div class="semi-circle" id="semiCircle" @click="itemClick">
				<span class="up-arrow" id="upArrow">-</span>
				<span class="bottom-arrow" id="bottomArrow">-</span>
			</div>
		</div>
	</div>
</template>

<script>
import leftBarContent from './leftBarContent'

export default {
	// @leftBar，左拉框
	name: 'leftBar',
	data() {
		return {
			openflag: 1
		}
	},
  components: {
    leftBarContent
  },
	methods: {
		itemClick() {
			let leftContent = document.getElementById("leftContent");
			let upArrow = document.getElementById("upArrow");
			let bottomArrow = document.getElementById("bottomArrow");
			if(this.openflag == 1) {
				upArrow.style.top = '-5px';
				bottomArrow.style.top = '0px';
				leftContent.style.left = '-9px';
				this.openflag = 0;
			} else {
				upArrow.style.top = '0px';
				bottomArrow.style.top = '-6px';
				leftContent.style.left = '-20vw';
				this.openflag = 1;
			}
		}
	}
}
</script>

<style>
:root {
	--back-color: rgb(169, 169, 169);
	--active-color: darkblue;
}
p>a {
		color: white;
    text-decoration: none;
}
.left-content {
	position: absolute;
	top: 10vh;
	left: -20vw;
	height: 80vh;
	width: 20vw;
	background-color: var(--back-color);
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	transition: all 1s;
	z-index: 1;
}
p {
	text-align: center;
	font-family: 'Tencent';
	color: white;
	font-size: 2rem;
	cursor: pointer;
}
.semi-circle {
	width: 20px;
	height: 35px;
	background-color: var(--back-color);
	border-radius: 0 20px 20px 0;
	position: absolute;
	left: 20vw;
	cursor: pointer;
	transition: all 1s;
}
.semi-circle:hover {
	background-color: white;
}
.up-arrow, .bottom-arrow {
	content: '-';
	font-size: 2rem;
	font-family: 'Tencent';
	position: absolute;
	color: var(--active-color);
	transition: all 1s;
}
.up-arrow {
	top: 0;
	left: 0;
	transform: rotate(-45deg);
}
.bottom-arrow {
	top: -6px;
	right: 3px;
	transform: rotate(45deg);
}
</style>
