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
		<view class="cu-bar foot bg-white">
			<view class="search-form round">
				<input class="margin-left" @focus="InputFocus" :adjust-position="false" type="text" placeholder="说点什么吧..." ></input>
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
				<view class="header">
					<view class="back-btn" @tap="hideCommentWindow()">返回</view>
					<view class="post-btn" @tap="postComment()">发表评论</view>
				</view>
				<!-- 头部结束 -->
				<!-- 评论填写部分开始 -->
				<textarea class="content" placeholder="说点什么吧..."></textarea>
				<!-- 评论填写部分结束 -->
				<!-- 上传图片部分开始，最多选择三张 -->
				<view class="img">
					<!-- 三个预览图 -->
					<view @tap="chooseImg(1)" class="thumb-img">
						<image :src="imgs.img1"></image>
					</view>
					<view @tap="chooseImg(2)" class="thumb-img">
						<image :src="imgs.img2"></image>
					</view>
					<view @tap="chooseImg(3)" class="thumb-img">
						<image :src="imgs.img3"></image>
					</view>
				</view>
				<!-- 上传图片部分结束 -->
			</view>
		</view>
		<!-- 这里是评论的弹窗结束部分 -->
	</view>
</template>

<script>
	var _self;
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	
	export default {
		data() {
			return {
				placeid: 1,
				place: {
					score: 4.8
				},
				specialFood:[],
				commentList: [],
				showCommentWindow: false,
				imgs: {
					img1: '',
					img2: '',
					img3: '',
				},
				filePath: [],
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
				console.log('comment');
				console.log( comment.data);
				// 给页面的数据赋值
				this.commentList =comment.data.data;
				const info = await this.$myRequest({
					url: '/v1/api/homepage/getshopbyshopid?shopid=',
					data: {
						shopid: this.shopid
						}
				})
				console.log('info: ', info.data.data);
				// 给页面的数据赋值
				this.place =info.data.data;
			},
			// 上传图片并根据参数改变对应的URL
			chooseImg(index) {
				let imgs = uni.chooseImage({
				    count: 1,
				    success: (res) => {
						switch (index){
							case 1:
								this.imgs.img1 = res.tempFilePaths[0];
								break;
							case 2:
								this.imgs.img2 = res.tempFilePaths[0];
								break;
							case 3:
								this.imgs.img3 = res.tempFilePaths[0];
								break;
						}
						this.filePath.push(res.tempFilePaths[0]);
						console.log('file paths: ', this.filePath);
					},
				    });
			},
			// 底部评论栏获得焦点时弹出评论窗口
			InputFocus() {
				console.log('input focus');
				this.showCommentWindow = true;
			},
			// 按下发表评论按钮时发表评论
			postComment() {
				// POST给接口
				this.$myRequest({
					url: '/v1/api/comment/insertShopCommentWithUserid',
					data: {
						content: 'test',
						pictures: this.filePath,
						userid: 123,
						shopid: 213,
					},
					method: 'POST',
				}),
				// 控制台显示成功
				console.log('发表评论成功');
				// 隐藏弹窗
				this.hideCommentWindow();
				// 弹框提示成功
				uni.showToast({
					title: '评论发表成功！',
				});
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
			}
		},
		onLoad(e) {
			this.shopid = e.shopid;
			console.log('page place.vue loaded...');
			console.log('the shop id is: ' + this.shopid);
			this.initPage();
		}
	}
</script>

<style>

</style>
