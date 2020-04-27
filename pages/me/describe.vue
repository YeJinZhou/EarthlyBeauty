<template>
	<view>
		<view v-if="test.id==1">
			<cu-custom style="background-color: #fff;" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">
					<view style="font-size: 20px;">账号与安全</view>
				</block>
			</cu-custom>
			账号与安全
		</view>
		<view v-if="test.id==2">
			<cu-custom style="background-color: #fff;" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">
					<view style="font-size: 20px;">通用</view>
				</block>
			</cu-custom>
			通用
		</view>
		<view v-if="test.id==3">
			<cu-custom style="background-color: #fff;" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">
					<view style="font-size: 20px;">隐私</view>
				</block>
			</cu-custom>
			隐私
		</view>
		<view v-if="test.id==4">
			<cu-custom style="background-color: #fff;" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">
					<view style="font-size: 20px;">意见反馈</view>
				</block>
			</cu-custom>
			意见反馈
		</view>
		<view v-if="test.id==5">
			<cu-custom style="background-color: #fff;" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">
					<view style="font-size: 20px;">关于人间烟火</view>
				</block>
			</cu-custom>
			关于人间烟火
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				test:[],		
			}
		},
		onLoad(e) {
			this.test = e
		},
		methods: {
		}
	}
</script>

<style>
</style>
