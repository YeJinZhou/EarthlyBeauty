<template>
	<view>
		<cu-custom bgColor="bg-gradual-red1" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">设置</block>
		</cu-custom>
		
		<view class="size cu-form-group margin-top" @tap="change('1')">
			账号与安全
		</view>
		
		<view class="cu-form-group size margin-top" @tap="change('2')">
			通用
		</view>
		
		<view class="cu-form-group size" @tap="information()">
			个人资料
		</view>
		
		<view class="cu-form-group size" @tap="change('3')">
			隐私
		</view>
		
		<view class="cu-form-group size margin-top" @tap="change('4')">
			意见反馈
		</view>
		
		<view class="cu-form-group size" @tap="change('5')">
			关于人间烟火
		</view>
		<view class="content">
		<view class="btn-row">
			<button  @tap="bindLogout" style="color: #ffffff;background-color: #ea0b3f;border-radius: 15px;">退出登录</button>
		</view>
	</view>
		
	</view>
</template>

<script>
	var user;
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
			}
		},
		onLoad(e){
			user = e;
		},
		methods: {	
			bindLogout() {
				uni.reLaunch({
					url: '../basic/login',
				});
			},
			change(e) {
				uni.navigateTo({
				    url: '../me/describe?id='+e,
				});
			},
			information() {
				uni.navigateTo({
				    url: '../me/information?id='+user.id,
				});
			},
		}
	}
</script>

<style>
	.size{
		height: auto;
		font-size: 15px;
	}
	
	.content {
		justify-content: center;
	}
	
	.btn-row {
		display: block;
		width: 70%;
		margin: 25upx auto;
	}
</style>
