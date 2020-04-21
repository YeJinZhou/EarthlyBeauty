<template>
	<view class="content">
		
		<view class="renjian">
			<img class="photo1"  style="width:100%;height: 100%;max-height: 200%;max-width: 200%; min-width:100% ;overflow:hidden; " src='../../static/img/logo2.png' ></image>
		</view>
		
			<view class="input-row">
				<text class="title">邮箱：</text>
				<input class="inputbox" type="text" focus clearable v-model="account" placeholder="请输入邮箱"></input>
			</view>


		<view class="btn-row">
			<button type="primary" class="primary" @tap="findPassword">提交</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: ''
			}
		},
		methods: {
			findPassword() {
				/**
				 * 仅做示例
				 */
				if (this.account.length < 3 || !~this.account.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法',
					});
					return;
				}
				uni.showToast({
					icon: 'none',
					title: '已发送重置邮件至注册邮箱，请注意查收。',
					duration: 3000
				});
			} 
		}
	}
</script>

<style>
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
		background-color: #e87e62;
	}
	
	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* #endif */
	
	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}
	
	/* #endif */
.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #e87e62;
		padding: 10px;
	}
    .renjian{
		display: block;
		margin-left: auto;
		margin-right: auto;
			margin-top: 200upx;
		    width: 120upx;
			height: 120upx;
			margin-bottom: 50upx;
			border-radius: 10px;

	}
	.inputbox {
		height: 70upx;
		width: 80%;
		padding-left: 20upx;
		font-size: 28upx;
		background-color: #ffffff;
		border-radius: 10px;
	}
	.input-row {
		width: 80%;
		margin-top: 100upx;
		margin-bottom: 200upx;
		margin-left: 10%;
		width: 80%;
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}
	.input-group {
		
		width: 80%;
		margin-left: 10%;
		margin-top: 100upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #000000;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #000000;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}
   .input-row1{
   	display: flex;
   	flex-direction: row;
   	position: relative;
	
   }
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #ffffff;
	}

	.btn-row {
	
		display: block;
		width: 70%;
		margin: 25px auto;
		
	}

	button.primary {
		color: #000000;
		background-color: #ffffff;
		border-radius: 15px;
	}
</style>
