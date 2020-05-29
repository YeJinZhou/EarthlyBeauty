<template>
	<view class="page">
		<view style="height: 50upx;"></view>
		
		<view class="uni-flex" style="height: 100upx;color: #fff; padding-top: 30upx;">
			<view class="center" style="font-size: 42upx;">精选特色菜品</view>
			<view class="flex justify-end" style="font-size: 25upx;width: 720upx;">
				<navigator url="/pages/home/city">前往我的城市></navigator>
			</view>	
		</view>
		
		<!--搜索框-->
		<view class="cu-bar search" style="padding: 40upx 0;">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<!-- <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" 
				placeholder="请输入搜索内容" confirm-type="search"></input> -->
				<input type="text" v-model="search" placeholder="请输入想要搜索的美食"/>
			</view>
			<view class="action">
				<button class="cu-btn bg-red round" @tap="confirm()">搜索</button>
			</view>
		</view>
		<!-- <input type="text" focus v-model="changeVaule" @confirm="searchFun" placeholder="qin"/> -->
		<view v-if="check==true">
			<view style="display: flex;flex-direction: column;justify-content: center; align-items: center;width: 100%;">
				<view style="width: 90%;">
					<scroll-view scroll-y="true" style="height: 1250upx;">
						<view v-for="(item,index) in food" :key="index">
							<view style="width: 100%;margin-bottom: 40upx;">
								<view style="box-shadow: 5upx 5upx 15upx rgba(0,0,0,.1); border-radius: 10upx; background-color: #fff;display: flex;align-items: center;justify-content: center;height: 670upx;">
									<view style="width: 98%;height: 98%;">
										<image @tap="jumpfood(index)" :src=item.pictures[0] style="border-radius: 10upx; width: 100%;height: 420upx;"></image>
										<view style="display: flex;justify-content: center;">
											<view style="font-size: 40upx;font-weight: bold;margin: 10upx auto;">{{item.name}}</view>
										</view>
										<view style="border-radius: 4upx; font-size: 30upx; height: 155upx; overflow: scroll;background-color: #eee;">{{item.introduction}}</view>
									</view>
								</view>
								
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view v-if="check==false">
			<view v-if="c.code == 0">
				<view style="display: flex;flex-direction: column;justify-content: center; align-items: center;width: 100%;">
					<view style="width: 90%;">
						<scroll-view scroll-y="true" style="height: 1250upx;">
							<view v-for="(item,index) in p" :key="index">
								<view style="width: 100%;margin-bottom: 40upx;">
									<view style="box-shadow: 5upx 5upx 15upx rgba(0,0,0,.1); border-radius: 10upx; background-color: #fff;display: flex;align-items: center;justify-content: center;height: 670upx;">
										<view style="width: 98%;height: 98%;">
											<image @tap="jumpfood(index)" :src=item.pictures[0] style="border-radius: 10upx; width: 100%;height: 420upx;"></image>
											<view style="display: flex;justify-content: center;">
												<view style="font-size: 40upx;font-weight: bold;margin: 10upx auto;">{{item.name}}</view>
											</view>
											<view style="border-radius: 4upx; font-size: 30upx; height: 155upx; overflow: scroll;background-color: #eee;">{{item.introduction}}</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view v-if="c.code == -1">
				<view style="height: 1400upx;display: flex;justify-content: center;align-items: center;">
					<view style="font-size: 40upx; font-weight: bold;">
						<view style="display: flex;justify-content: center;align-items: center;">
							<image style="width: 300upx;height: 300upx;" src="../../static/searchFalse.jpg" mode=""></image>
						</view>
						<view>对不起，查找不到您所需的食物</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var p;
	var c;
	var search;
	export default {
		data() {
			return {	
				showText: false,
				food: [],
				search:'',
				check: true,
				code:'',
				p: [],
				c: [],
			}
		},
		onLoad() {
		},
		methods: {
			confirm(){
				if(this.search!=''){
					this.searchFood();
					this.check = false;
				}else{
					uni.redirectTo({
						url:'../home/country',
					})
				}
				//console.log(this.check)
			},
			async searchFood(){
				//console.log(this.search)
				const res = await this.$myRequest({
					url: '/v1/api/homepage/queryFood',
					data: {
						foodname:this.search,
					}
				})
				this.c = res.data;
				this.p = res.data.data;
				//console.log(c.code)
				// console.log(p[0].name)
				// console.log(res.code)
			},
			//初始化页面，从接口获取数据
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getNationalSelection',
				})
				this.food =res.data.data;
			},
			
			//食物带foodid参数跳转
			jumpfood(e) {   
				var that = this;
				if(this.check == true){
					var foodid = that.food[e].id;
					var cityid = that.food[e].cityid;
				}else{
					var foodid = that.p[e].id;
					var cityid = that.p[e].cityid;
				}
				console.log(foodid);
				console.log(cityid);
				uni.navigateTo({
				    url: '../food/food?foodid='+foodid+'&cityid='+cityid,
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
	.country-card {
		/* display:flex;
		flex-direction: column;
		padding: 10upx; */
		height:400upx; 
		border-radius: 4upx;
		box-shadow: 5upx 5upx 15upx rgba(0, 0, 0, .1);
		/* box-sizing: border-box; */
	}
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
	.title {
		/* margin: 10upx 0; */
		font-size: 35upx;
		font-weight: bold;
	}
	.picture {
		height: 420upx;
		width: 100%;
	}
	.text{
		/* padding: 0 17upx; */
		width: 100%;
		colof: #999;
		line-height: 10upx;
		height: 400upx;
		overflow: scroll;
	}
	.page{
		background: linear-gradient(#e54d42,#fff);
	}
</style>
