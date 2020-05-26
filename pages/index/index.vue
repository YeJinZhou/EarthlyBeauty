<template>
	<view>
	<home v-if="PageCur=='home'"></home>
	<discover v-if="PageCur=='discover'"></discover>
	<post v-if="PageCur=='post'"></post>
	<oneDay v-if="PageCur=='oneDay'"></oneDay>
	<me v-if="PageCur=='me'"></me>
	<view class="cu-bar tabbar bg-white shadow foot">
		<view class="action" @click="NavChange" data-cur="home">
			<view class='cuIcon-cu-image'>
				<image :src="'/static/tabbar/home' + [PageCur=='home'?'_cur':''] + '.png'"></image>
			</view>
			<view :class="PageCur=='home'?'text-red':'text-gray'">首页</view>
		</view>
		<view class="action" @click="NavChange" data-cur="discover">
			<view class='cuIcon-cu-image'>
				<image :src="'/static/tabbar/discover' + [PageCur=='discover'?'_cur':''] + '.png'"></image>
			</view>
			<view :class="PageCur=='discover'?'text-red':'text-gray'">发现</view>
		</view>
		<view class="action" @click="NavChange" data-cur="post">
		<view class="action text-gray add-action">
			<button class="cu-btn cuIcon-add bg-red shadow"></button>
			发布
		</view>
		</view>
		<view class="action" @click="NavChange" data-cur="oneDay">
			<view class='cuIcon-cu-image'>
				<image :src="'/static/tabbar/oneDay' + [PageCur=='oneDay'?'_cur':''] + '.png'"></image>
			</view>
			<view :class="PageCur=='oneDay'?'text-red':'text-gray'">一日美食</view>
		</view>
		<view class="action" @click="NavChange" data-cur="me">
			<view class='cuIcon-cu-image'>
				<image :src="'/static/tabbar/me' + [PageCur=='me'?'_cur':''] + '.png'"></image>
			</view>
			<view :class="PageCur=='me'?'text-red':'text-gray'">我的</view>
		</view>
	</view>
	</view>
</template>

<script>
	
	export default {
		data() {
		return {
				PageCur: 'home'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>