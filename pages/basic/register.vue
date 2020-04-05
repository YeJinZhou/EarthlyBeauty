<template>
	
	<view class="content">
		<view class="renjian">
			<img class="photo1"  style="width:100%;height: 100%;max-height: 200%;max-width: 200%; min-width:100% ;overflow:hidden; " src='../../static/img/logo2.png' ></image>
		</view>
		
			
			<view class="input-row">
				<text class="title">邮箱：</text>
				<input class="kuang" type="text" focus clearable v-model="account" placeholder="请输入邮箱"></input>
			</view>
			<view class="input-row">
				<text class="title">昵称：</text>
				<input class="kuang" type="text" clearable v-model="name" placeholder="请输入昵称"></input>
			</view>
			<view class="input-row ">
				<text class="title">密码：</text>
				<input class="kuang" type="password" displayable v-model="password" placeholder="请输入密码"></input>
			</view>
			<view class="input-row">
				<text class="title">确认：</text>
				<input class="kuang" type="password" displayable v-model="password1" placeholder="请再次输入密码"></input>
			</view>
			<view style="display: flex;flex-direction: row;margin-left:13%  ;width: 77%;">
			<view class="input-row1">
		    	
					<text class="title">省：</text>
		    		<uni-combox class="kuang" :candidates="candidates1" placeholder="请选择省份"></uni-combox>
		    	
		    </view>	
			<view class="input-row1">
					<text class="title">市：</text>
		    		<uni-combox class="kuang" :candidates="candidates2" placeholder="请选择城市"></uni-combox>
		    	
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>

</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
    import uniCombox from '@/components/uni-combox/uni-combox.vue'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				password1:'',
				name: '',
				candidates1: ['浙江', '山东', '四川', '广东'],
				sheng: '',
				candidates2: ['杭州', '温州', '湖州', '绍兴'],
				city: ''
			}
		},
		
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 3 || !~this.account.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法',
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.password1!=this.password) {
					uni.showToast({
						icon: 'none',
						title: '密码输入不一致'
					});
					return;
				}
				if (this.name.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '昵称最短为3个字符'
					});
					return;
				}
				// 先定义一个data表示注册的账号
				const data = {
					account: this.account,
					password: this.password,
				}
				// 把data通过addUser的方法加入用户列表
				service.addUser(data);
				// 提示注册成功
				uni.showToast({
					title: '注册成功'
				});
				// 跳转至登录页面
				uni.navigateTo({
					url: 'login',
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
		padding: 10upx;
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
	.input-group {
		background-color: #FFFFFF;
		width: 80%;
		margin-left: 10%;
		position: relative;
		border-radius: 10px;    
	}

	
    .kuang
		{
			background-color: #ffffff;
			border-radius: 10px;
			height: 70upx;
			font-size: 16px;
		}
		.input-row {
		width: 80%;
		margin-top: 15upx;
		margin-left: 10%;
		width: 80%;
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
	width: 80%;
	margin-left: 2%;
	margin-top: 15upx;
	display: flex;
	flex-direction: row;
	position: relative;
	font-size: 18px;
	line-height: 40px;
	
   }
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #000000;
	}

	.btn-row {
	
		display: block;
		width: 70%;
		margin: 100upx auto;
		
	}

	button.primary {
		color: #000000;
		background-color: #ffffff;
		border-radius: 15px;
	}
</style>
