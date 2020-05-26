<template>
	<view>
		<view style="height: 70upx;"></view>
		<view class="content-column" style="background-color: #fff;">
			<view class="uni-flex uni-row content-row" style="background-color: #fff;height: auto;">
				<view style="width: 100upx;height: 100upx;">
					<image :src="personInfo.headportrait" style="height: 100upx;border-radius: 50%;"></image>
				</view>
				
				<view class="uni-flex margin-top margin-bottom margin-left" style="height: 150upx;width: 450upx;">
					<view class="flex justify-start">
						<view style="font-size: 36upx;font-weight: bold;margin-top:22upx;">
							{{personInfo.name}}
						</view>
					</view>
					<view class="flex justify-start">
						<view class="flex uni-flex uni-row content-row justify-start" style="flex-direction: row;height: 64upx;">							
							<view>
								<text>粉丝</text>
								<text>{{personInfo.fansNumber}}</text>
							</view>						
							<view class="margin-right margin-left">|</view>						
							<view @tap="checkFans()">
								<text>关注</text>
								<text>{{personInfo.focusNumber}}</text>
							</view>	
						</view>		
					</view>
				</view>
				
				<view class="margin-bottom" @tap="setting()">
					<image src="/static/install.png" style="height: 50upx;width: 50upx;border-radius: 50%;"></image>
				</view>
			</view>
		</view>
		
		
			<view class="size cu-form-group margin-top uni-flex uni-row" @tap="jumpRanking()">
				<view class="flex" style="width: 800upx;">
					<image src="/static/leaderBoard.png" class="icon">
						<text class="margin-left">排行榜</text>
					</image>		
				</view>	
			</view>
		
			<view class="size cu-form-group margin-top uni-flex uni-row" @tap="jumpCollection()">
				<view class="flex" style="width: 800upx;">
					<image src="/static/collect.png" class="icon">
						<text class="margin-left">我的收藏</text>
					</image>
				</view>	
			</view>
		
			<view class="size cu-form-group margin-top uni-flex uni-row" @tap="jumpDiary()">
				<view class="flex" style="width: 800upx;">
					<image src="/static/review.png" class="icon">
						<text class="margin-left">我的食记</text>
					</image>
				</view>	
			</view>
		
			<view class="size cu-form-group margin-top uni-flex uni-row" @tap="jumpPlan()">
				<view class="flex" style="width: 800upx;">
					<image src="/static/plan.png" class="icon">
						<text class="margin-left">我的计划</text>
					</image>
				</view>	
			</view>
	</view>	
</template>

<script>
	var id;
	export default {
		data() {
			return {	
				personInfo: [],
			}
		},
		mounted() {
			this.initPage()
		},
		methods: {
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/mypage/getPersonInfo',
					data: {
						account: '982157286@qq.com',
					}
				})
				// 给页面的数据赋值
				this.personInfo =res.data.data;
			},
			setting() {
				var that = this;
				var id = that.personInfo.userId;
				console.log(id);
				uni.navigateTo({
				    url: '../me/setting?id='+id,
				});
			},
			checkFans() {
				var that = this;
				var id = that.personInfo.userId;
				console.log(id);
				uni.navigateTo({
				    url: '../me/attention?id='+id,
				});
			},
			jumpRanking() {
				var that = this;
				var id = that.personInfo.userId;
				console.log(id);
				uni.navigateTo({
				    url: '../me/ranking?id='+id,
				});
			},
			jumpCollection() {
				var that = this;
				var id = that.personInfo.userId;
				console.log(id);
				uni.navigateTo({
				    url: '../me/collection?id='+id,
				});
			},
			jumpDiary() {
				var that = this;
				var id = that.personInfo.userId;
				console.log(id);
				uni.navigateTo({
				    url: '../me/diary?id='+id,
				});
			},
			jumpPlan() {
				var that = this;
				var id = that.personInfo.userId;
				console.log(id);
				uni.navigateTo({
				    url: '../me/plan?id='+id,
				});
			},
		}
	}
</script>

<style>
	.content-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.content-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.head{
		height: 200upx;
		width: 200upx;
	}
	.size{
		font-size: 32upx;
	}
	.icon{
		height: 50upx;
		width: 50upx;
		border-radius: 50%;
	}
</style>
