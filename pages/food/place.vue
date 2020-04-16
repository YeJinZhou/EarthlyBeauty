<template>
	<view>
		<!-- 顶部导航栏 -->
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">食地</block>
		</cu-custom>
		<!-- 店铺名、评分、人均消费等信息 -->
		<div class="eb-place-info">
			<div class="basic">
				<div class="name">{{place.name}}</div>
				<div class="info">
					<uni-rate :value='place.score' disabled="true" size="10"></uni-rate>
					<div class="score">{{place.score}}分</div>
					<text>¥{{place.perConsumption}}/人</text>
				</div>	
			</div>
			<div @tap="collect" class="iconfont icon-shoucang" :class="place.isLike==true?'red':'gray'"></div>
		</div>
		<!-- 特色菜品滚动条 -->
			<!-- 只写出了bug -->
			
		<!-- 店铺地址 -->
		<div class="eb-location-box">
			<div class="iconfont icon-weizhi"></div>
			<div class="location">
				<div class="place-name">
					{{place.location.location}}
				</div>
				<div>
					距离{{place.location.nearbyPlace}}{{place.location.dist2nearby}}米
				</div>
			</div>
			<div class="dist"></div>
			<div class="iconfont icon-you"></div>
		</div>
			
		<!-- 精选评论 -->
		<view class="text-lg text-bold margin-left margin-top">精选评论</view>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + commentList[0].userBriefInformation.headportrait + ')' }]"></view>
						<view class="content flex-sub ">
							<view class="text-bold">{{commentList[0].userBriefInformation.name}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{commentList[0].time}}
							</view>
						</view>
					</view>
				</view>
				<view class="eb-commentContent">
					{{commentList[0].content}}
				</view>
				<view class="flex padding-lr">
					<image class="thumbnailImage" :src='commentList[0].pectures[0]'></image>
					<image class="thumbnailImage" :src='commentList[0].pectures[1]'></image>
					<image class="thumbnailImage" style="margin-right: 0;" :src='commentList[0].pectures[2]'></image>
				</view>
				<view class=" padding"></view>
			</view>
		</view>
		
		<!-- 点评 -->
		<view class="text-lg text-bold margin-left">点评</view>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + commentList[1].userBriefInformation.headportrait + ')' }]"></view>
						<view class="content flex-sub ">
							<view class="text-bold">{{commentList[1].userBriefInformation.name}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{commentList[1].time}}
							</view>
						</view>
					</view>
				</view>
				<view class="eb-commentContent">
					{{commentList[1].content}}
				</view>
				<view class="flex flex-sub padding-lr">
					<image class="thumbnailImage" :src='commentList[1].pectures[0]'></image>
					<image class="thumbnailImage" :src='commentList[1].pectures[1]'></image>
					<image class="thumbnailImage" style="margin-right: 0;" :src='commentList[1].pectures[2]'></image>
				</view>
				<view class=" padding"></view>
			</view>
		</view>
		<!-- 底部评论栏 -->
		<view class="cu-bar foot bg-white">
			<view class="search-form round">
				<input class="margin-left" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="说点什么吧..." ></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-red shadow-blur round">评论</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	var _self;
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		data() {
			return {
				place: {
					name:"清真鼎盛兴饭店",
					score: 4.7,
					perConsumption: "30",
					isLike: false,
					location: {
						location: "劳动南路10号汉中大厦一层底商2号店铺",
						nearbyPlace: "西市生活广场",
						dist2nearby: "650",
					}
				},
				specialFood:[],
				commentList: []
				
			}
		},
		methods: {
			collect: function() {
				_self = this;
				//_self.place.name = "changed name",
				_self.place.isLike = !_self.place.isLike,
				console.log('isLike: '+ this.place.isLike)
			},
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/comment/getShopCommentByShopId?shopid=',
					data: {
						shopid: '0'
						}
				})
				console.log(res.data);
				// 给页面的数据赋值
				this.commentList =res.data.data;
			}
		},
		onLoad() {
			this.initPage();
		}
	}
</script>

<style>

</style>
