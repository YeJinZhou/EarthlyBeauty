<template>
	<view class="content">
		<view class="renjian">
			<img class="photo1"  style="width:100%;height: 100%;max-height: 200%;max-width: 200%; min-width:100% ;overflow:hidden; " src='../../static/img/logo2.png' ></image>
		</view>		
		<view class="input-group">
			<view class="input-row border">
				<text class="title">邮箱：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" ></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" ></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="register">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view>
		
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'upx'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
				<!-- #ifdef MP-WEIXIN -->
				<button v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '邮箱最短为 5 个字符'
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
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					account: this.account,
					password: this.password
				};
				const validUser = service.getUsers().some(function(user) {
					return data.account === user.account && data.password === user.password;
				});
				if (validUser) {
					this.toMain(this.account);
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户账号或密码不正确',
					});
				}
				uni.navigateTo({
					url: '../main/main',
				});
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.reLaunch({
						url: '../index/index',
					});
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
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
	.beijing{
		border-radius: 50px;
		
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
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

 
	.action-row navigator {
		color: #ffffff;
		padding: 0 10upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50upx;
		height: 50upx;
		border: 1px solid #ffffff;
		border-radius: 50px;
		margin: 0 20upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30upx;
		height: 30upx;
		margin: 10upx;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.content {
		    background-image:url(../../static/img/untitled.png) ;
			margin-top: 45%;
			margin-bottom: 45%;
			margin-left: 7%;
			margin-right: 7%;
			width: 60%;
			border-radius: 250px;
		
			backgroundPosition: "center";
			display: flex;
			flex: 1;
			flex-direction: column;
			background-color: #eab373;
			padding: 10upx;
		}
	 .renjian{
			display: block;
		margin-left: 10upx;
			margin-top: 5upx;
	        width: 22%;
			height: 22%;

			border-radius: 10px;
		}
	
		.input-group {
			
			width: 80%;
			margin-top: 50upx;
			margin-left: 10%;
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
			background-color: #ffffff;
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
			background-color: #ffffff;
		}
	
		.input-row {
			display: flex;
			flex-direction: row;
			position: relative;
			font-size: 18px;
			color: #ffffff;
			line-height: 40px;
		}
	
		.input-row .title {
			width: 120upx;
			
			padding-left: 15upx;
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
			margin: 25upx auto;
			
		}
	
		button.primary {
			color: #000000;
			background-color: #ffffff;
			border-radius: 15px;
		}
</style>
