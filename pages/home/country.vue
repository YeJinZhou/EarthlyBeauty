<template>
	<view class="page">
		<view class="uni-flex" style="height: 100upx;color: #fff; padding-top: 30upx;">
			<view class="center" style="font-size: 42upx;">精选特色菜品</view>
			<view class="flex justify-end" style="font-size: 25upx;width: 720upx;">
				<navigator url="../home/city">前往我的城市></navigator>
			</view>	
		</view>
		
		<!--搜索框-->
		<view class="cu-bar search" style="padding: 40upx 0;">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" 
				placeholder="请输入搜索内容" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-red shadow-blur round">搜索</button>
			</view>
		</view>
		
		<!--食物介绍-->
		<view style="display: flex;">
		    <scroll-view scroll-y="true" style="height: 1330upx;flex:1;width:680upx;">
		        <view v-for="(item,index) in food" class="content" :key="index">
					<view style=" height:auto; display:flex;flex-direction: column;border-radius: 20upx;"
		        	class="bg-white content">
						<!--点击图片跳转-->
		        		<image class="picture" @tap="jumpfood(index)" :src="item.picture"></image>
		        		<view style="display:flex ;flex-direction: column; width: 680upx;">
		        			<view class="content" style="font-size: 40upx;font-weight: bold">{{item.name}}</view>
		        			<view class="text">
								{{item.introduction}}
							</view>
		        		</view>
		        	</view>
		        	<view style="height: 40upx;"></view>
		        </view>	
		    </scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {	
				showText: false,
				food: [],
			}
		},
		methods: {
			//初始化页面，从接口获取数据
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getNationalSelection',
				})
				this.food =res.data.data;
			},
			//搜索框弹出键盘样式修改
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			//搜索框弹出键盘样式修改
			InputBlur(e) {
				this.InputBottom = 0
			},
			//食物带foodid参数跳转
			jumpfood(e) {   
				var that = this;
				var foodid = that.food[e].id;
				uni.navigateTo({
				    url: '../food/food?foodid='+foodid,
				});
			},
			//多余文字隐藏
			toggleDescription (num) {
				this.showText = !this.showText
			},
		},
		mounted() {
			this.initPage()
		},
	}
</script>

<style>
	.center{
		display: flex;
		justify-content: center;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.picture {
		height: 420upx;
		width: 680upx;
		border-radius: 20upx;
	}
	.text{
		padding: 10upx;
		colof: #999;
		max-height: 200upx;
		overflow: scroll;
	}
	.page{
		background: linear-gradient(#F76260,#fff);
	}
</style>
