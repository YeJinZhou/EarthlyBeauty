<template>
	<view style="background-color: #f0f0f0;">
		<!-- 顶部导航 -->
		<cu-custom style="background-color: #fff;" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				<view style="font-size: 42upx;font-weight: bold;">{{cityInfo.name}}美食</view>
			</block>
		</cu-custom>
		<!-- 图片部分 -->
		<view class="content-row food-pic-part">
			<!-- 美食主图 -->
			<view class="food-main-pic">
				<image :src="foodInfo[mainFood].pictures[0]"></image>
			</view>
			<!-- 滚动图 -->
			<view class="uni-flex" style="height: 220upx;width: 400upx;">
				<view class="flex justify-end text-sm">查看{{cityInfo.name}}其他美食 ></view>
				<scroll-view scroll-x class="response cu-steps steps-bottom food-pic-scroll">
					<block v-for="(item,index) in foodInfo" :key="index">
						<view class="item" @tap="changfood(index)">
							<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + item.pictures[0] + ')' }]"></view>
							<text class="text-sm margin-top-xs" style="height: 30upx; display: flex; justify-content: center;">{{item.name}}</text>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		
		<!-- 食物介绍 -->
		<view class="food-title">{{foodInfo[mainFood].name}}</view>	
		<view class="food-desc">			
			<template v-if="showText">			
				<view v-if="foodInfo[mainFood].introduction" style="font-size: 32upx;color:#000;">{{foodInfo[mainFood].introduction}}
					<text v-if="foodInfo[mainFood].introduction !== null && foodInfo[mainFood].introduction.length > 64" @click="toggleDescription" style="color: #f00;">收起</text>
				</view>
			</template>
			<template v-else>
				<view v-if="foodInfo[mainFood].introduction" style="font-size: 32upx;color:#000;">{{foodInfo[mainFood].introduction.substr(0, 60)}}
					<text v-if="foodInfo[mainFood].introduction !== null && foodInfo[mainFood].introduction.length > 64" @click="toggleDescription" style="color: #f00;">
						<text style="color: #000;">...</text>更多						
					</text>
				</view>
			</template>
		</view>
		<!-- 店铺列表 -->
		<scroll-view scroll-y="true" style="height: 950upx;" >
			<view v-for="(item,index) in placeInfo" :key="index">
					<view class="food-shop" @tap="jumpshop(index)">
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
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// var mainFood;
	var food = 0;
	var f;
	var city = 0;
	//console.log(food.foodid);
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		data() {
			console.log(food)
			return {
				// console.log(mainFood),
				mainFood: food,
				placeInfo: [],
				foodInfo: [],
				cityInfo: [],
				showText: false,
			}
		},
		onLoad(e) {
			f = e,
			console.log(f.foodid),
			console.log(f.cityid),
			food = f.foodid,
			++food,
			--food,
			city = f.cityid,
			++city,
			--city,
			console.log(typeof food)
			console.log(food)
			console.log(typeof city)
			console.log(city)
			this.mainFood = food,
			this.mainFood--,
			console.log(typeof this.mainFood)
			this.mainFood = this.ch(this.mainFood,city)
			//this.mainFood = this.mainFood+7-city*7,
			console.log(this.mainFood),
			this.initPage()
			
			//this.$forceUpdate() 
		},
		// mounted() {
		// 	this.initPage()
		// },
		methods: {
			ch(a,e){
				if(e == 1){
					a = a - 14;
				}
				if(e == 2){
					a = a;
				}
				if(e == 3){
					a = a - 7;
				}
				return a;
			},
			
			async initPage(){
				var that = this;
				console.log(city)
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getCityFood',
					data: {
						cityid: city,
					}
				})
				this.foodInfo =res.data.data;
				console.log(1)
				console.log(this.foodInfo[0].name)
				
				console.log(food)
				const res1 = await this.$myRequest({
					url: '/v1/api/homepage/getShopByFood',
					data: {
						foodid: food,
					}
				})
				this.placeInfo =res1.data.data;
				console.log(2)
				//console.log(this.placeInfo[1].name)
				console.log(city)
				
				const res2 = await this.$myRequest({
					url: '/v1/api/homepage/getCityIntroductionById',
					data: {
						cityid: city,
					}
				})
				console.log(3)
				this.cityInfo =res2.data.data;
				console.log(this.cityInfo.name)
				
				// console.log(food)
				// ++that.mainFood;
				// --that.mainFood;
				// that.mainFood = food;
				// console.log(that.mainfood)
			},
			jumpshop(e) {
				var that = this;
				var shopid = that.placeInfo[e].id;
				console.log(shopid);
				uni.navigateTo({
				    url: '../food/place?shopid='+shopid,
				});
			},
			
			changfood(index) {
				food = index;
				//this.mainFood = food;
				//city = index;
				var that = this;
				var foodid = that.foodInfo[index].id;
				var cityid = that.foodInfo[index].cityid;
				console.log(foodid);
				console.log(cityid);
				uni.redirectTo({
					 url: '../food/food?foodid='+foodid+'&cityid='+cityid,
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
