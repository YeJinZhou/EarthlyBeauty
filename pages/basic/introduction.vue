<template>
	<view>
	
		<view class="content">
			 
			 <navigator url="/pages/home/city" open-type="switchTab"><image src="../../static/img/timg.png" mode="scaleToFill" style="width: 100%; " >
				
				<text class="info">西</text>
				<text class="info">安</text>
				<text class="info">·</text>
				<text class="info">羊</text>
				<text class="info">肉</text>
				<text class="info">泡</text>
				<text class="info">馍</text>
			 </navigator>
				 
		</view>
		<view class="example-body" >
			<image class="img-logo" src="../../static/22.png"  mode="scaleToFill" style="height: 100%;">
			<button class="button_1" type="" plain="true" size="mini"  @click="toPage" ><uni-countdown :show-day="false" :second="5"  @timeup="timeup" />
			</button>
			
		</view>
		
	</view>

</template>
<script>
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components: {
			uniCountdown,
			uniSection
		},
		data() {
			return {
				testHour: 0,
				testMinute: 0,
				testSecond: 0
			}
		},
		created() {
			setTimeout(() => {
				this.testHour = 1
				this.testMinute = 1
				this.testSecond = 0
			}, 2000)
		},
		methods: {
			timeup() {
				uni.navigateTo({
				    url: '/pages/home/country'
				})
			},
			toPage(){
				uni.navigateTo({
					url: '/pages/home/country'
				})
			}
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #E87E62;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 28rpx;
		line-height: inherit;
		
	}
	
	.button_1{
		flex-direction: row;
		background-color: #ffffff;
		border-radius: 50rpx;
		margin-bottom: 20rpx;
		border-color: #E87E62;
		
		
	}
	.img-logo{
		height: 100%;
		width:60%;
		margin-left: 140rpx;
	}
	
	.content{
		
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		
	
		margin-top: 200rpx;;
		font-size: 14rpx;
	
	}
	
	.info{
		font-size: 45rpx;
		margin-left: 360rpx;
		margin-top: 0rpx;
	}
	
	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
		height: 150rpx;
		margin-top: 100rpx;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}

	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}


	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}
	
	

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.example-body {
		padding: 10px;
	}
</style>