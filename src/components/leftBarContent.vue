<template>
	<div id="leftBarContent" :class="{'active-font-color': isActive}" @click="itemClick">
		<slot name="content"></slot>
	</div>
</template>

<script>
export default {
	// @leftBar，左拉框中的每一条子标题
	name: 'leftBar',
	props: { 
		path: String
	},
	computed: {
		isActive() {
			return this.$route.path.includes(this.path)
		}
	},
	methods: {
		itemClick() {
			if(!this.$route.path.includes(this.path)){
				this.$router.push(this.path)
			}
		}
	}
}
</script>

<style>
.active-font-color>p {
	color: darkblue;
}
</style>
