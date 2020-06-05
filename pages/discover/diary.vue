<template>
	<!-- 为了照顾食记主体的需要，所有的内容margin-left的值为41upx -->
	<view>
		<!-- 顶部导航 -->
		<!-- <cu-custom bgColor="bg-gradual-orange" :isBack="true"><block slot="backText">返回</block><block slot="content">食记</block></cu-custom> -->

		<!-- 主图轮播 -->
		<view class="swiper-box">
			<view class="cuIcon-back back" @tap="back()"></view>
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="(swiper,index) in backendData.pictures" :key="index">
					<image :src="swiper"></image>
					<!-- <view>{{swiper}}</view> -->
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{backendData.pictures.length}}</view>
		</view>
		<!-- 用户信息 -->
		<view class="user-xinxi">
			<view class="face"><image  :src="backendData.userBriefInformation.headportrait"></image></view>
			<view class="username" v-if='backendData.userBriefInformation.name'>{{backendData.userBriefInformation.name}}</view>
			<button class="follow" size="mini" plain="true" >关注</button>
		</view>
		<!-- 食记主体 -->
		<view class ="pingjia">
			{{backendData.content}}
		</view>
		<!-- 标签 -->
		<view class="biaoqian">
			{{backendData.label}}
		</view>
		
		<view class="plan" v-if="showPlan"> 
			<view class="shop">
				<image class="shop-avatar" :src="backendData.resultBriefPlan.briefPlanItems[0].foodurl">
				<text class="food-name">{{backendData.resultBriefPlan.briefPlanItems[0].foodname}}</text>
				<text class="shop-name">{{backendData.resultBriefPlan.briefPlanItems[0].shopname}}</text>
			</view>
			<view class="jia">+</view>
			<view class="shop">
				<image class="shop-avatar" :src="backendData.resultBriefPlan.briefPlanItems[1].foodurl">
				<text class="food-name">{{backendData.resultBriefPlan.briefPlanItems[1].foodname}}</text>
				<text class="shop-name">{{backendData.resultBriefPlan.briefPlanItems[1].shopname}}</text>
			</view>
			<view class="jia">+</view>
			<view class="shop">
				<image class="shop-avatar" :src="backendData.resultBriefPlan.briefPlanItems[2].foodurl">
				<text class="food-name">{{backendData.resultBriefPlan.briefPlanItems[2].foodname}}</text>
				<text class="shop-name">{{backendData.resultBriefPlan.briefPlanItems[2].shopname}}</text>
			</view>
			
			
			
		</view>
		
		<button class="button_1" @click="tocreatePost" v-if="showPlan">作为我的一日方案</button>
		
		<!-- 评价 -->
		<view class="info-box comments margin-top" id="comments">
			<view class="row">
				<view class="text">评论</view>
			</view>
			
			<view class="comment" v-for="(item,index) in commentData" :key="index">
				<view class="user-info">
					<view class="face"><image :src="item.userBriefInformation.headportrait"></image></view>
					<view class="username">{{item.userBriefInformation.name}}</view>
				</view>
				<view class="content">
					{{item.content}}
				</view>
			</view>
			
		</view>
		
		<view class="cu-bar foot bg-white">
			<view class="search-form round">
				<input class="margin-left" @focus="InputFocus" :adjust-position="false" type="text" placeholder="说点什么吧..." ></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-red shadow-blur round">收藏</button>
			</view>
		</view>
		<!-- 底部评论栏部分结束 -->
		
		<!-- 这里是评论的弹窗开始部分 -->
		<view class="cu-modal bottom-modal" :class="showCommentWindow?'show':''">
			<view class="cu-dialog eb-comment">
				<!-- 头部开始 -->
				<view class="header">
					<view class="back-btn" @tap="hideCommentWindow()">返回</view>
					<view class="post-btn" @tap="postComment()">发表评论</view>
				</view>
				<!-- 头部结束 -->
				<!-- 评论填写部分开始 -->
				<textarea v-model="newComment" class="comment-content" placeholder="说点什么吧..."></textarea>
				<!-- 评论填写部分结束 -->
				
			</view>
		</view>

	</view>
</template>

<script>
	
import ygcComment from '@/components/ygc-comment/ygc-comment.vue';

import uniFav from '@/components/uni-fav/uni-fav.vue';

 var mockURL = "https://nei.netease.com/api/apimock-v2/7f58f7ccd8b5b6da5d9af6a1bd5edf68/v1/api/comment/getFoodRecordCommentByFoodRecordId?foodrecordid= "
export default {
	components:{
		ygcComment,
		uniFav
	},
	data() {
		
		return {
			userid: '982157286@qq.com',
			newComment: '',
			showPlan:false,
			showCommentWindow: false,
			checkList: [false],
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			backendData:[
				{
					id:1,
					userBriefInformation:{},	
				}
			],
			
			commentData:[
				
			],
			
			idData:{
				foodrecordid:"",
			},
			
			}
	},
	onLoad(options) {
		console.log(options.foodrecordid);
		var j = parseInt(options.foodrecordid);
		
		this.initPage(j);
		this.idData=options;
		console.log(this.idData);
		
	},

	mounted () {
		
	},
	methods: {
		
		async postComment() {
			const res1 =await this.$myRequest({
				
				url:'/v1/api/comment/insertFoodRecordCommentWithUserid',
				data:{
					content:this.newComment,
					foodrecordid:this.backendData.id,
					userid:'472296000@qq.com'
				},
				//methods:"POST"
			}) 
			console.log('-shop id: ' + this.backendData.id);
			console.log('-user id: ' + this.userid);
			console.log('-content: ' + this.newComment);
			// 隐藏弹窗
			this.hideCommentWindow();
			this.initPage(this.backendData.id);
			// 清空评论的内容
			//this.clearComment();
		},
		
		async initPage(foodrecordid){
			const res =await this.$myRequest({
				url:'/v1/api/publishpage/seltectDetailFoodRecord',
				data:{
					foodrecordid:foodrecordid
					
				},
			}) 
			
			console.log('back end data:');
			console.log(res.data.data.userBriefInformation.name);
			console.log(res.data.data.userBriefInformation);
			this.backendData =res.data.data;
			this.changeStatus();
			// this.backendData.userBriefInformation = JSON.parse(t.data.data.userBriefInformation);
			console.log(this.backendData.userBriefInformation.name);
			// console.log(JSON.parse(this.backendData.userBriefInformation));
			
			const record =await this.$myRequest({
				url:'/v1/api/comment/getFoodRecordCommentByFoodRecordId',
				data:{
					foodrecordid:foodrecordid
					
				},
			})
			this.commentData =record.data.data;
			
		  
			console.log(this.idData);
			console.log(this.backendData.id);
		},
		
		changeStatus(){
			  if(this.backendData.resultBriefPlan.id){
				  
				  this.showPlan = true;  
			  }
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		
		InputFocus() {
			console.log('input focus');
			this.showCommentWindow = true;
		},
		hideCommentWindow() {
			this.showCommentWindow = false;
		},
		
		onClick(index) {
			this.checkList[index] = !this.checkList[index]
			this.$forceUpdate()
		},
		
		
		
		tocreatePost(){
			uni.navigateTo({
				url:'../me/plan'
			})
		},
		
		//返回上一页
		back() {
			uni.navigateBack();
		},
		
		
		
		
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
.back {
	position: absolute;
	left: 10upx;
	top: 10upx;
	font-size: 50upx;
	color: rgba(255, 255, 255, .7);
	z-index: 5;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, .3);
}

 
.button_1{
	margin: 10upx auto;
	width: 90%;
	height: 80upx;
	color: #fff;
	border-radius: 10upx;
	background-color: #e54d42;
	line-height: 80upx
}
.plan{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 45upx;
	margin: 20upx auto;
	height: 200upx;
	width: 90%;
	border: 1px solid rgba(0, 0, 0, .1);
	border-radius: 20upx;
	.jia {
		font-size: 30px;
		color: #e54d42;
		margin-left: 20upx;
		margin-bottom: 8%;
		align-self: center;
	}
	.shop{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.food-name,
	.shop-name{
		font-size: 25upx;
	}
	.shop-avatar{
		width: 100upx;
		height: 100upx;
		border-radius: 50%	;
	}
}



.icon {
	font-size: 26upx;
}


.swiper-box {
	position: relative;
	width: 100%;
	height: 500upx;
	swiper {
		width: 100%;
		height: 500upx;
		swiper-item {
			image {
				width: 100%;
				height: 500upx;
			}
		}
	}
	.indicator{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
.info-box {
	padding: 20upx 4%;
	background-color: #fff;
	margin-bottom: 20upx;
}

.dibu{
	position: fixed;
	bottom: var(--window-bottom);
	background-color: #ffffff;
	display: flex;
	justify-content: space-between;
	padding: 0 30upx;
	height: 80upx;
	width: 100%;
	.shoucang{
		align-self: center;
		border: 1px solid #E54D42;
	}
	.middle{
		align-self: center;
		font-size: 30upx;
		color:  #d9d9d9;
		
	}
	
}

.biaoqian{
	display: flex;
	flex-direction: row;
	color: #ff6600;
	margin-left: 41upx;
}

.pingjia{
	font-size: 30upx;
	margin: 20upx 41upx;
	color: #666;
}
.user-xinxi{
	margin-top: 20upx;
	flex-direction: row;
	display: flex;
	height: 140upx;
	justify-content: center;
	.face{
		width: 100upx;
		height: 100upx;
		align-self: center;
		margin-left: 41upx;
		image {
			width: 100upx;
			height: 100upx;
			border-radius: 100%;
		}
	}
	.username{
		align-self: center;
		margin-left: 30upx;
		color: #666;
		font-weight: 600;
	}
	.follow{
		height:40%;
		color: #e54d42;
		margin-right: 41upx;
		align-self: center;
		border-radius: 28upx;
	}
}


.comments {
	margin-bottom: 100upx;
	.row {
		margin-bottom: 10upx;
		height: 50upx;
		display: flex;
		align-items: center;
		.text {
			margin-bottom: 10upx;
			font-size: 30upx;
		}
		.arrow {
			font-size: 28upx;
			position: absolute;
			right: 4%;
			color: #17e6a1;
			.show {
				display: flex;
				align-items: center;
				.icon {
					color: #17e6a1;
				}
			}
		}
	}
	
	.comment {
		border-top: 1upx solid rgba(0, 0, 0, .1);
		.user-info {
			margin-top: 15upx;
			height: 40upx;
			display: flex;
			align-items: center;
			.face {
				width: 40upx;
				height: 40upx;
				margin-right: 12upx;
				image {
					width: 40upx;
					height: 40upx;
					border-radius: 100%;
				}
			}
			.username {
				font-size: 24upx;
				color: #999;
			}
		}
		.content {
			margin-top: 12upx;
			font-size: 26upx;
			
		}
	}
}

.description {
	.title {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: #999;
	}
}




</style>
