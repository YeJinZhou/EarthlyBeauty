<template>
<view>
	<!-- 头部开始 -->
	<view class="eb-comment-header">
		<navigator class="back-btn">返回</navigator>
		<navigator class="post-btn" @tap="postComment">发表评论</navigator>
	</view>
	<!-- 头部结束 -->
	<!-- 评论填写部分开始 -->
	<textarea class="eb-comment-content" placeholder="说点什么吧..."></textarea>
	<!-- 评论填写部分结束 -->
	<!-- 上传图片部分开始，最多选择三张 -->
	<view class="eb-comment-img">
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
</template>

<script>
	export default {
		data() {
			return {
				imgs: {
					img1: '',
					img2: '',
					img3: '',
				},
				filePath: [],
			}
		},
		methods: {
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
			// 点击发表按钮，发表评论
			postComment() {
				this.$myRequest({
					url: '/v1/api/comment/insertShopCommentWithUserid',
					data: {
						content: 'test',
						pictures: this.filePath,
						userid: 123,
						shopid: 213,
					},
					method: 'POST',
				})
				// 弹框提示成功
				uni.showToast({
					title: '发表成功！',
				})
			}
		}
	}
</script>

<style>
  .temp {
	  width: 100px;
	  height: 100px;
	  background-color: #888;
  }
</style>
