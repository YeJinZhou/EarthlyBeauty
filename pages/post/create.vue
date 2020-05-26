<template>
	<view>
		<view @click.stop="onClick" class="content">
			<button class="btn" @click="toPlan"><text class="text">方案自动生成游记</text></button>
			<button class="btn" @click="tocreate"><text class="text">自由发表游记</text></button>
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
	.content {
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
	
	.btn{
		background-color: #E54D42;
		border-color: #E54D42;
		margin-top: 30px;
		width: 60%;
	}
</style>

