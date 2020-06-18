<template>
	<view>
		<view @click.stop="onClick" class="cont">
			<button class="btnBlock" @click="toPlan"><text class="text">方案自动生成游记</text></button>
			<button class="btnBlock" @click="tocreate"><text class="text">自由发表游记</text></button>
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
				
				
				e.stopPropagation()
				
			},
			tocreate(){
				uni.navigateTo({
					url:"../post/createPost"
				})
			},
			toPlan(){
				uni.navigateTo({
					url:"/pages/me/plan"
				})
			}
		}
	}
</script>

<style>
	.cont {
		margin-top: 60%;
	}

	.text {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
	}
	
	.btnBlock{
		background-color: #E54D42;
		border-color: #E54D42;
		margin-top: 30px;
		width: 60%;
		height: 50px;
	}
</style>

