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
		
		<view class="dibu">
			<text class="middle" @click="toggleMask('show')" size="" plain="true"  >说点什么吧...</text>
			<uni-fav :checked="checkList[0]" class="shoucang" circle="true" bg-color="#fff" bg-color-checked="#e54d42" @click="onClick(0)"></uni-fav>
			<ygc-comment ref="ygcComment"
			    :placeholder="'发布评论'" 
				@pubComment="pubComment"></ygc-comment>
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
			showPlan:false,
			
			checkList: [false],
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			swiperList: [
				{ id: 1, img: '/static/23.png' },
				{ id: 2, img: '/static/2.jpg' },
				{ id: 3, img: '/static/3.jpg' },
				{ id: 4, img: '/static/4.jpg' }
			],
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			serviceClass: '',//服务弹窗css类，控制开关动画
			specClass: '',//规格弹窗css类，控制开关动画
			shareClass:'',//分享弹窗css类，控制开关动画
			
			biaoqian:{
				tag:'#西安#'
			},
			
			user:{
				name:'随芝所乐',
				face:'/static/face.jpg',
				xinxi:'说到西安，你脑袋中第一浮现出来的是什么呢？我脑袋中浮现出来的就是美食！！！大凡到过西安的人，都会去品尝一下西安的牛羊肉泡馍。由于羊肉泡馍经济实惠，而极富有地方特色，来西安不吃牛羊肉泡，似乎就白来西安一趟.',
			},
			
			// 评论信息
			goodsData:{
				id:1,
				
				
				comment:{
					userface:'/static/face.jpg',
					username:'大黑哥',
					content:'看起来很好吃啊，感谢分享！我也好喜欢西安这座城市！西安带给我好多美好的回忆！'
				}
			},
			
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
	
	// onLoad:function(options){
	// 	this.setData({
	// 	      foodrecordid: foodrecordid    
	// 	    })
	// },
	
	onReady(){
		//this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {
		
	},
	
	mounted () {
		
	},
	methods: {
		
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
		
		onClick(index) {
			this.checkList[index] = !this.checkList[index]
			this.$forceUpdate()
		},
		
		//评论，跳转页面
		toRatings(){
			uni.navigateTo({
				url:'ratings/ratings'
			})
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
		toggleMask(type) {
			this.$refs.ygcComment.toggleMask(type);
		},
		pubComment(commentContent1) {
			this.$refs.ygcComment.toggleMask();
			console.log(commentContent1);
			this.commentContent = commentContent1;
			this.$refs.ygcComment.content = '';
		}
		
		
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
@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
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
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
	background-color: #f1f1f1;
	transition: opacity 0.05s linear;
}
.header {
	width: 100%;

	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	.before,
	.after {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
		/*  #endif  */
		transition: opacity 0.05s linear;
		.back {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			.icon {
				margin-left: -10%;
				width: 60upx;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 42upx;
			}
		}
		.middle {
			width: 100%;
		}
		.icon-btn {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon {
				&:first-child{
					margin-right: 5upx;
				}
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.before {
		.back {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
			}
		}
		.icon-btn {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
				
			}
		}
	}
	.after {
		background-color: #f1f1f1;
		.back {
			.icon {
				color: #666;
			}
		}
		.icon-btn {
			.icon {
				color: #666;
			}
		}
		.middle {
			font-size: 32upx;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 7%;
			view {
				width: (100%/3);
				padding: 0 3%;
				margin: 0 3%;
				display: flex;
				justify-content: center;
				align-items: center;
				&.on {
					margin-bottom: -4upx;
					color: #f47952;
					border-bottom: solid 4upx #f47952;
				}
			}
		}
	}
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
.goods-info {
	.price {
		font-size: 46upx;
		font-weight: 600;
		color: #f47925;
	}
	.title {
		font-size: 30upx;
	}
}
.spec {
	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;
		.text {
			font-size: 24upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}
		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;
			.serviceitem{
				margin-right: 10upx;
			}
			.sp {
				width: 100%;
				display: flex;
				view {
					background-color: #f6f6f6;
					padding: 5upx 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;
					&.on{
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}
		.arrow {
			position: absolute;
			right: 4%;
			.icon {
				color: #ccc;
			}
		}
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
.footer {
	position: fixed;
	bottom: 0upx;
	width: 92%;
	padding: 0 4%;
	height: 99upx;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		display: flex;
		height: 80upx;
		margin-left: -4%;
		.box {
			width: 80upx;
			height: 80upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.icon {
				font-size: 40upx;
				color: #828282;
			}
			.text {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 22upx;
				color: #666;
			}
		}
	}
	.btn {
		height: 80upx;
		border-radius: 40upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart,
		.buy {
			height: 80upx;
			padding: 0 40upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
		.joinCart {
			background-color: #f0b46c;
		}
		.buy {
			background-color: #f06c7a;
		}
	}
}
.popup {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	display: none;
	.mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 21;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.layer {
		position: fixed;
		z-index: 22;
		bottom: -70%;
		width: 92%;
		padding: 0 4%;
		height: 70%;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		.content {
			width: 100%;
			padding: 20upx 0;
		}
		.btn {
			width: 100%;
			height: 100upx;
			.button {
				width: 100%;
				height: 80upx;
				border-radius: 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f47952;
				font-size: 28upx;
			}
		}
	}
	
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.2s linear both;
		}
		
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	&.service {
		.row {
			margin: 30upx 0;
			.title {
				font-size: 30upx;
				margin: 10upx 0;
			}
			.description {
				font-size: 28upx;
				color: #999;
			}
		}
	}
	&.spec {
		.title {
			font-size: 30upx;
			margin: 30upx 0;
		}
		.sp {
			display: flex;
			view {
				font-size: 28upx;
				padding: 5upx 20upx;
				border-radius: 8upx;
				margin: 0 30upx 20upx 0;
				background-color: #f6f6f6;
				&.on {
					padding: 3upx 18upx;
					border: solid 1upx #f47925;
				}
			}
		}
		.length{
			margin-top: 30upx;
			border-top: solid 1upx #aaa;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20upx;
			.text{
				font-size: 30upx;
			}
			.number{
				display: flex;
				justify-content: center;
				align-items: center;
				.input{
					width: 80upx;
					height: 60upx;
					margin: 0 10upx;
					background-color: #f3f3f3;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					input{
						width: 80upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						font-size: 26upx;
					}
				}
				
				.sub ,.add{
					width: 60upx;
					height: 60upx;
					background-color: #f3f3f3;
					border-radius: 5upx;
					.icon{
						font-size: 30upx;
						width: 60upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
		
	}
}
.share{
	display: none;
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.15s linear both;
		}
		.layer {
			animation: showLayer 0.15s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.15s linear both;
		}
		
		.layer {
			animation: hideLayer 0.15s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask{
		background-color: rgba(0,0,0,.5);
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		z-index: 11;
	}
	.layer{
		width: 92%;
		position: fixed;
		z-index: 12;
		padding: 0 4%;
		top: 100%;
		background-color: rgba(255,255,255,0.9);
		.list{
			width: 100%;
			display: flex;
			padding:10upx 0 30upx 0;
			.box{
				width: 25%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				image{
					width: 13.8vw;
					height: 13.8vw;
				}
				.title{
					margin-top: 10upx;
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 26upx;
				}
			}
		}
		.btn{
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			border-top: solid 1upx #666666;
		}
		.h1{
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34upx;
		}
	}
}


</style>