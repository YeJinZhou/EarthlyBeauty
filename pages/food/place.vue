<template>
	<view>
		<!-- 顶部导航栏部分开始 -->
		<cu-custom bgColor="bg-gradual-red1" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">食地</block>
		</cu-custom>
		<!-- 顶部导航栏部分结束 -->
		<!-- 店铺信息部分开始 -->
			<!-- 店铺名、评分、人均消费等信息 -->
		<div class="eb-place-info">
			<div class="basic">
				<div class="name">{{place.name}}</div>
				<div class="info">
					<uni-rate disabled="true" size="10" :value="place.score"></uni-rate>
					<div class="score">{{place.score}}分</div>
					<text>¥{{place.price}}/人</text>
				</div>	
			</div>
			<div @tap="collect" class="iconfont icon-shoucang" :class="place.isLike?'red':'gray'"></div>
		</div>			
			<!-- 店铺地址 -->
		<div class="eb-location-box">
			<div class="iconfont icon-weizhi"></div>
			<div class="place-name">
				{{place.address}}
			</div>
			<div class="dist"></div>
			<div class="iconfont icon-you"></div>
		</div>
		<!-- 店铺信息部分结束 -->	
		<!-- 精选评论部分开始 -->
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
<!-- 				<view class="flex padding-lr">
					<image class="thumbnailImage" :src='commentList[0].pectures[0]'></image>
					<image class="thumbnailImage" :src='commentList[0].pectures[1]'></image>
					<image class="thumbnailImage" style="margin-right: 0;" :src='commentList[0].pectures[2]'></image>
				</view> -->
				<view class=" padding"></view>
			</view>
		</view>
		<!-- 精选评论部分结束 -->
		<!-- 点评部分开始 -->
		<!-- <view class="text-lg text-bold margin-left">点评</view>
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
		</view> -->
		<!-- 点评部分结束 -->
		<!-- 防止评论栏遮挡最下方评论的空白部分 -->
		<view style="height: 100upx;"></view>
		<!-- 底部评论栏部分开始 -->
		<view class="cu-bar foot bg-white" @tap="InputFocus()">
			<view class="search-form round">
				<text class="margin-left text-gray text-df">说点什么吧...</text>
			</view>
			<view class="action">
				<button class="cu-btn bg-red shadow-blur round">评论</button>
			</view>
		</view>
		<!-- 底部评论栏部分结束 -->
		
		<!-- 这里是评论的弹窗开始部分 -->
		<view class="cu-modal bottom-modal" :class="showCommentWindow?'show':''">
			<view class="cu-dialog eb-comment">
				<!-- 头部开始 -->
				<view class="comment-header">
					<view class="back-btn" @tap="hideCommentWindow()">返回</view>
					<view class="post-btn" @tap="postComment()">发表评论</view>
				</view>
				<!-- 头部结束 -->
				<!-- 评论填写部分开始 -->
				<textarea v-model="newComment" class="comment-content" placeholder="说点什么吧..."></textarea>
				<!-- 评论填写部分结束 -->
				<!-- 上传图片部分开始，最多选择三张 -->
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<3">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<!-- 上传图片部分结束 -->
			</view>
		</view>
		<!-- 这里是评论的弹窗结束部分 -->
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	var _self;
	export default {
		data() {
			return {
				placeid: '',
				place: {
					score: 4.8
				},
				specialFood:[],
				commentList: [],
				showCommentWindow: false,
				imgs: [],
				newComment: '',
				userid: '982157286@qq.com',
				imgList: [],
			}
		},
		methods: {
			// 点击收藏按钮触发的收藏事件
			collect: function() {
				_self = this;
				//_self.place.name = "changed name",
				_self.place.isLike = !_self.place.isLike,
				console.log('isLike: '+ this.place.isLike)
			},
			// 初始化页面数据函数，用来从接口获取数据并初始化页面元素
			async initPage(){
				const comment = await this.$myRequest({
					url: '/v1/api/comment/getShopCommentByShopId?shopid=',
					data: {
						shopid: this.shopid
						}
				})
				// 给页面的数据赋值
				this.commentList =comment.data.data;
				const info = await this.$myRequest({
					url: '/v1/api/homepage/getshopbyshopid?shopid=',
					data: {
						shopid: this.shopid
						}
				})
				// 给页面的数据赋值
				this.place =info.data.data;
			},
			// 底部评论栏获得焦点时弹出评论窗口
			InputFocus() {
				console.log('input focus');
				this.showCommentWindow = true;
			},
			// 按下发表评论按钮时发表评论
			async postComment() {
				console.log('posting comment...');				
				
				let imgs = this.imgList.map((value, index) => {
					return {
						name: 'image' + index,
						url: value,
					}
				})
				console.log('-imgs: ');
				console.log(imgs);
				console.log('-shop id: ' + this.shopid);
				console.log('-user id: ' + this.userid);
				console.log('-content: ' + this.newComment);
				uni.uploadFile({
					url: 'http://10.21.234.73:8080/v1/api/comment/insertShopCommentWithUserid', //仅为示例，非真实的接口地址
					files: imgs,
					formData: {
						content: this.newComment,
						shopid: this.shopid,
						userid: this.userid,
					},
					success: function () {
						console.log('评论上传成功');
						// 弹框提示成功
						uni.showToast({
							title: '评论发表成功！',
						});
					},
				});
				// 隐藏弹窗
				this.hideCommentWindow();
				
				// 清空评论的内容
				this.clearComment();
			},
			// 隐藏评论窗口
			hideCommentWindow() {
				this.showCommentWindow = false;
			},
			// 清空评论的内容
			clearComment() {
				// 有需要再写吧。
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			}
		},
		onLoad(e) {
			this.shopid = e.shopid || 1;
			console.log('page place.vue loaded...');
			console.log('the shop id is: ' + this.shopid);
			this.initPage();
		}
	}
</script>

<style>

</style>
