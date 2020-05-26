<template>
	<view>
		<!-- 城市简介 -->
		<view class="solid-bottom">
			<view class="flex justify-between">
				<view class="cityTitle">{{city.name}}</view>
				<navigator url="../index/index">
					<view class="padding margin-xs text-sm">前往全国精选></view>
				</navigator>
			</view>
			<!-- 简介内容 -->
			<view class="Express">
				<view class="info">
					<view :class="{hide:!iSinfo}">
						{{city.introduction}}
					</view>
					<text @tap="showinfo" v-if="!iSinfo">展开</text>
				</view>
				<text @tap="showinfo" v-if="iSinfo" class="hidebtn">收起</text>
			</view>
		</view>
		<!-- 城市特色美食横向滚动条 -->
		<view class="solid-bottom">
			<view class="cityTitle ">{{city.name}}特色</view>	
			<!-- 滚动条 -->
			<scroll-view scroll-x class="padding response cu-steps steps-bottom">
				<block v-for="(item,index) in specialFood" :key="index">
					<view class="item" @tap="jump2food(index)">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + item.pictures[0] + ')' }]"></view>
						<text class="text-sm margin-top-xs" style="height: 30upx; display: flex; justify-content: center;">{{item.name}}</text>
					</view>
				</block>
			</scroll-view>
		</view>
		<!-- 知名食地滚动条 -->
		<view class="cityTitle ">知名食地</view>
		<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom">
			<block v-for="(item,index) in placeList" :key="index">
				<view class="placeBlock" @tap="jump2place(index)">
					<view class="flex" >
						<image class="picture" :style="[{ backgroundImage:'url(' + item.pictures[0] + ')' }]"></image>
						<view class="margin-left margin-right">
							<view class="text-lg text-bold margin-top-xs" >{{item.name}}</view>
							<view class="flex justify-start margin-top-xs">
								<view class="text-sm">评分{{item.score}}</view>
								<view class="text-sm margin-left">人均 ¥{{item.price}}</view>		
							</view>
							<view class="text-sm">距离：1.2 km</view>
							<view class="text-sm margin-top-xs"><text>{{item.introduction}}</text></view>
						</view>							
					</view>
				</view>
			</block>	
		</scroll-view>
		<!-- 发现城市 -->
		<view class="cityTitle city-title-discover">发现{{city.name}}</view>.
		<view v-for="(item,index) in diaryList"  :key="item.index" style="width:46%;float: left;margin:2%;">
			<!-- 卡片组 -->
			<view class="cu-card case" style="border-radius: 10px;" >
				<navigator :url="'../discover/diary?id='+index">
					<!-- 图片加阴影标题 -->
					<view class="image" style="height:240px;" >
						<image :src="item.pictures" mode="heightFix" ></image>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut"  >{{item.title}}</text></view>				
					</view>
					<!-- 用户信息 -->
					<view class="dynamic-info">
						<view class="user">
							<view class="cu-avatar round"  :style="[{ backgroundImage:'url(' + item.userBriefInformation.headportrait + ')' }]"></view>
							<view class="username">{{item.userBriefInformation.name}}</view>		
						</view>
						<text class="cuIcon-appreciatefill"> {{item.praisenumber}}</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur:"home",
				iSinfo: false,
				cityid: 1,
				city: [],
				specialFood:[],
				placeList:[],
				diaryList:[]
			}
		},
		methods: {
			showinfo() {
				this.iSinfo = !this.iSinfo
			},
			async initPage(){
				// 获取城市信息
				const city = await this.$myRequest({
					url: '/v1/api/homepage/getCityIntroductionById?cityid=',
					data: {
						cityid: this.cityid
						}
				})
				// 给页面的数据赋值
				this.city =city.data.data;
				console.log('this.city: ');
				console.log(this.city);
				// 获取特色美食
				const food = await this.$myRequest({
					url: '/v1/api/homepage/getCityFood?cityid=',
					data: {
						cityid: this.cityid
						}
				})
				// 给页面的数据赋值
				this.specialFood =food.data.data;
				console.log('special food: ' + this.specialFood);
				const shop = await this.$myRequest({
					url: '/v1/api/homepage/getCityShop?cityid=',
					data: {
						cityid: this.cityid
						}
				})
				// 给页面的数据赋值
				this.placeList =shop.data.data;
				const diary = await this.$myRequest({
					url: '/v1/api/homepage/getCityFoodRecord?cityid=',
					data: {
						cityid: this.cityid
						}
				})
				// 给页面的数据赋值
				this.diaryList =diary.data.data;
			},
			jump2food(index) {
				let foodid = this.specialFood[index].id;
				let cityid = this.city.id;
				console.log('jump to food, the foodid is: ' + foodid);
				console.log('-the name of food is: ' + this.specialFood[index].name);
				console.log('-the city id is: ' + cityid);
				uni.navigateTo({
					url: '../food/food?foodid=' + foodid + '&cityid=' + cityid,
				})
			},
			jump2place(index) {
				let shopid = this.placeList[index].id;
				console.log('jump to shop, the shopid is: ' + shopid);
				console.log('-the name of shop is: ' + this.placeList[index].name);
				uni.navigateTo({
					url: '../food/place?shopid=' + shopid,
				})
			}
		},
		onLoad() {
			this.initPage();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.Express {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 0 30upx 15upx 30upx;
		position: relative;

		.info {
			display: flex;
			flex-direction: column;
			
			view {
				text-align:justify ;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				word-break: break-word; //换行模式
				background-color: #fff;
			}
			// “展开/收起”两个按钮
			text {
				width: 70px;
				font-size: 14px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
				color: #0078FF;
				position: absolute;
				bottom: 15upx;
				right: 35upx;
			}
		}

	}

	.hidebtn {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		color: #0078FF;
		font-size: 14px;
	}

	.hide {
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 4; //此处为上限行数
		-webkit-box-orient: vertical;
	}
	
	.item {
		margin-right: 40upx;
		display: inline-block;
		vertical-align: middle;
	}
	
	.content-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.content-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: auto;
	}

</style>

