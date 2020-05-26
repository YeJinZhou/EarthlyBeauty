<template>
	<view class="page">
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
				<input type="text" focus v-model="changeVaule" @confirm="searchFun" placeholder="qin"/>
			</view>
			<view class="action">
				<button class="cu-btn bg-red shadow-blur round">搜索</button>
			</view>
		</view>
		<!-- <input type="text" focus v-model="changeVaule" @confirm="searchFun" placeholder="qin"/> -->
		
		
		<!--食物介绍-->
		<view style="display: flex;">
		    <scroll-view scroll-y="true" style="height: 1330upx;flex:1;width:680upx;">
		        <view v-for="(item,index) in food" class="content" :key="index">
					<view class="bg-white content country-card">
						<!--点击图片跳转-->
		        		<image class="picture" @tap="jumpfood(index)" :src="item.pictures[0]"></image>
		        		<view style="display:flex ;flex-direction: column; width: 680upx;">
		        			<view class="content title">{{item.name}}</view>
		        			<view class="text">
								{{item.introduction}}
							</view>
		        		</view>
		        	</view>
		        	<view style="height: 40upx;"></view>
		        </view>	
		    </scroll-view>
		</view>
		<!-- 底部留白 -->
		<div class="eb-blank"></div>
	</view>
</template>

<script>
	export default {
		data() {
			return {	
				showText: false,
				food: [],
				changeVaule: '',    // 输入框输入的值
				searchAll: [],
			}
		},
		onLoad() {
			const than = this        // 注意this的指向
				uni.getStorage({
					key: 'searchAll_key',
					success(res) {
						than.searchAll = res.data.data
					}
				}
			)
		},
		methods: {
			searchFun() {
				if(this.changeVaule != '') {    // 输入框的值不为空时
			        const than = this;
					this.searchAll.push(this.changeVaule),   // 将输入框的值添加到搜索记录数组中存储
					uni.setStorage({
						key: 'searchAll_key',
						data: than.searchAll,    
						success: function () {
							// console.log(changeVaule)
						}
					}),
					this.changeVaule = ''
				}
			},

			//初始化页面，从接口获取数据
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getNationalSelection',
				})
				this.food =res.data.data;
				
				// const res1 = await this.$myRequest1({
				// 	url: '/v1/api/homepage/getNationalSelection',
				// })
				// this.food =res.data.data;
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
				var cityid = that.food[e].cityid;
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
		display:flex;
		flex-direction: column;
		padding: 10upx;
		height:auto; 
		border-radius: 4upx;
		box-shadow: 5upx 5upx 15upx rgba(0, 0, 0, .1);
		box-sizing: border-box;
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
		margin: 10upx 0;
		font-size: 35upx;
		font-weight: bold;
	}
	.picture {
		height: 420upx;
		width: 100%;
	}
	.text{
		padding: 0 17upx;
		width: 100%;
		colof: #999;
		line-height: 1.5em;
		height: 130upx;
		overflow: scroll;
	}
	.page{
		background: linear-gradient(#e54d42,#fff);
	}
</style>
