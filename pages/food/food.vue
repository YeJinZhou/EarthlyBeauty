<template>
	<view style="background-color: #E5E5E5;">
		<cu-custom style="background-color: #fff;" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				<view style="font-size: 42upx;font-weight: bold;">{{title}}美食</view>
			</block>
		</cu-custom>
		
		<view class="content-column" style="background-color: #fff;">
			<view class="uni-flex uni-row content-row" style="background-color: #fff;width: 620upx;height: 260upx;">
				<view class="solids-right" style="width: 300upx;">
					<image class="picture" style="width: 180upx;height: 180upx;border-radius: 50%;" :src="foodInfo[0].picture"></image>
				</view>
				
				<view class="uni-flex" style="height: 220upx;width: 400upx;">
					<view class="flex justify-end">查看{{title}}其他美食</view>
					<view class="uni-flex uni-row content-row" style="flex-direction: row;height: 200upx;">
						<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom" style="width: 420upx;">
							<block v-for="(item,index) in foodInfo" :key="index">
								<view class="item" @tap="changfood(index)">
									<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + item.picture + ')' }]"></view>
									<text class="text-sm margin-top-xs" style="height: 30upx; display: flex; justify-content: center;">{{item.name}}</text>
								</view>
							</block>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="font-size: 42upx;font-weight: bold;margin-left: 50upx;">{{foodInfo[0].name}}</view>
		
		<view class="content-column uni-flex uni-column">	
			<view class="text" style="width: 680upx;">			
				<template v-if="showText">			
					<view v-if="foodInfo[0].introduction" style="font-size: 32upx;color:#000;">{{foodInfo[0].introduction}}
						<text v-if="foodInfo[0].introduction !== null && foodInfo[0].introduction.length > 64" @click="toggleDescription" style="color: #f00;">收起</text>
					</view>
				</template>
				<template v-else>
					<view v-if="foodInfo[0].introduction" style="font-size: 32upx;color:#000;">{{foodInfo[0].introduction.substr(0, 60)}}
						<text v-if="foodInfo[0].introduction !== null && foodInfo[0].introduction.length > 64" @click="toggleDescription" style="color: #f00;">
							<text style="color: #000;">...</text>更多						
						</text>
					</view>
				</template>
			</view>
		</view>
		{{food.foodid}}
		<view>
		    <scroll-view scroll-y="true" style="height: 950upx;" >
		        <view v-for="(item,index) in placeInfo" :key="index">
					<view class="content-column" style="height: 220upx;">
						<navigator url="../food/place" hover-class="navigator-hover">
							<view class="uni-flex uni-row content-row" style="border-radius: 20upx;background-color: #f4f4f4;width: 680upx;height: 220upx;">
								<image class="picture" style="width: 220upx;height: 220upx;border-radius: 20upx;" :src="item.pictures[0]"></image>
								<view class="uni-flex uni-column padding" style="height: 220upx;width: 450upx;display: flex;flex-direction: column;">
									<view style="font-size: 32upx;font-weight: bold">
										<text>{{item.name}}</text>
									</view>
									<view class="justify-start flex align-center" style="font-weight: bold;">
										<uni-rate :value='item.score' disabled="true" size="10" style="margin-top: 6upx;"></uni-rate>
										<text style="color: #f00;">{{item.score}}</text>
										<text class="margin-left">¥{{item.price}}</text>/人
									</view>		
									<view>
										<text class='cu-tag round sm' style="background-color: #ff0;">{{item.address}}</text>
										<text class='cu-tag round sm' style="background-color: #ff0;">{{item.label}}</text>
									</view>
									<view>{{item.introduction}}</view>
								</view>							
							</view>
						</navigator>					
					</view>
					<view style="height: 40upx;"></view>
				</view>
			</scroll-view>
		</view>
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
		margin-left: 20upx;
		display: inline-block;
		vertical-align: top;
	}
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
	}
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
	.picture {
		display: flex;
		margin-top: 0px;
		margin-left: 0px;
		margin-right: auto;
		margin-bottom: 0px;
	}
	.food{
		justify-content: center;
		display: flex;
	}
</style>
