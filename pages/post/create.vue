<template>
	<view @click="close" class="mask">
		<view @click.stop="onClick" class="content">
			<button class="btn" @click="toPlan"><text class="text">方案自动生成游记</text></button>
			<button class="btn" ><text class="text">自由发表游记</text></button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onClick(e) {
				uni.navigateTo({
					url:'createPost'
				})
				
				e.stopPropagation()
				
			},
			close() {
				uni.navigateBack()
			},
			toPlan(){
				uni.navigateTo({
					url:"../discover/diary"
				})
			}
		}
	}
</script>

<style>
	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		color: #FFFFFF;
	}

	.content {
		width: 200px;
		height: 200px;
		color: #FFFFFF;
	}

	.text {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
	}
	
	.btn{
		background-color: #ff9966;
		border-color: #FF9966;
		margin-top: 30px;
	
	}
</style>

