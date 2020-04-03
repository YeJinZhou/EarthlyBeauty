<template>
	<view>
		<view class="padding text-bold">
			{{backendData.id}}
			{{backendData.name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backendData:[]
			}
		},
		onLoad() {
			this.initPage();
		},
		methods: {
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getCityIntroductionById?cityid=',
					data: {
						cityid: 0
						}
				})
				// 给页面的数据赋值
				this.backendData =res.data;
			}
		}
	}
</script>

<style>

</style>
