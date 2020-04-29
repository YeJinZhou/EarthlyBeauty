<template>
	<view style="background-color: #f0f0f0;">
		<!-- 顶部导航 -->
		<cu-custom style="background-color: #fff;" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				<view style="font-size: 42upx;font-weight: bold;">{{title}}美食</view>
			</block>
		</cu-custom>
		<!-- 图片部分 -->
		<view class="content-row food-pic-part">
			<!-- 美食主图 -->
			<view class="food-main-pic">
				<image :src="foodInfo[0].picture"></image>
			</view>
			<!-- 滚动图 -->
			<view class="uni-flex" style="height: 220upx;width: 400upx;">
				<view class="flex justify-end text-sm">查看{{title}}其他美食 ></view>
				<scroll-view scroll-x class="response cu-steps steps-bottom food-pic-scroll">
					<block v-for="(item,index) in foodInfo" :key="index">
						<view class="item" @tap="changfood(index)">
							<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + item.picture + ')' }]"></view>
							<text class="text-sm margin-top-xs" style="height: 30upx; display: flex; justify-content: center;">{{item.name}}</text>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<!-- 食物介绍 -->
		<view class="food-title">{{foodInfo[0].name}}</view>	
		<view class="food-desc">			
			<template v-if="showText">			
				<view v-if="foodInfo[0].introduction" style="font-size: 32upx;color:#000;">{{foodInfo[0].introduction}}
					<text v-if="foodInfo[0].introduction !== null && foodInfo[0].introduction.length > 64" @click="toggleDescription" style="color: #f00;">收起</text>
				</view>
			</template>
			<template v-else>
				<view v-if="foodInfo[0].introduction" style="font-size: 28upx;color:#000;">{{foodInfo[0].introduction.substr(0, 60)}}
					<text v-if="foodInfo[0].introduction !== null && foodInfo[0].introduction.length > 64" @click="toggleDescription" style="color: #f00;">
						<text style="color: #000;">...</text>更多						
					</text>
				</view>
			</template>
		</view>
		<!-- {{food.foodid}} 这行是啥，先注释了 -->
		<!-- 店铺列表 -->
		<scroll-view scroll-y="true" style="height: 950upx;" >
			<view v-for="(item,index) in placeInfo" :key="index">
				<navigator url="../food/place" hover-class="navigator-hover">
					<view class="food-shop">
						<image class="food-shop-img" :src="item.pictures[0]" ></image>
						<view class="food-shop-desc">
							<view class="text-lg text-bold">
								<text>{{item.name}}</text>
							</view>
							<view class="flex align-center text-sm">
								<uni-rate :value='item.score' disabled="true" size="10" style="margin-top: 6upx;"></uni-rate>
								<text class="margin-left-sm">{{item.score}}分</text>
								<text class="margin-left">¥{{item.price}}</text>/人
							</view>		
							<view class="food-tag">
								<text>{{item.address}}</text>
								<text>{{item.label}}</text>
							</view>
							<view>{{item.introduction}}</view>
						</view>							
					</view>
				</navigator>					
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		data() {
			return {
				test:[],
				placeInfo: [],
				foodInfo: [],
				food:[],
				showText: false,
				title:'西安',
			}
		},
		onLoad(e) {
			this.initPage(),
			this.init(),
			this.food=e
		},
		methods: {
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getCityFood',
					data: {
						cityid: '6463',
					}
				})
				// 给页面的数据赋值
				this.foodInfo =res.data.data;
			},
			async init(){
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getShopByFood',
					data: {
						foodid: '80121',
					}
				})
				// 给页面的数据赋值
				this.placeInfo =res.data.data;
			},
			changfood(e) {
				
				var that=this;
				this.test=that.foodInfo[e];
				that.foodInfo[e]=that.foodInfo[0];
				that.foodInfo[0]=this.test;
				uni.navigateTo({
				    url: '../food/food',
				});
			},
			toggleDescription (num) {
				this.showText = !this.showText
			}
		}
	}
</script>

<style>
	.item {
		margin-left: 12upx;
		display: inline-block;
		vertical-align: top;
	}
	/* 
	这是原先的食物介绍，目前改动没有涉及到收缩展开所以保留
	.text{
		padding: 20upx;
		colof: #999;
		background: #E5E5E5;
		max-height: 280upx;
		overflow: scroll;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 680upx;	
	} */
	.content-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: auto;
	}
	.content-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.food{
		justify-content: center;
		display: flex;
	}
</style>
