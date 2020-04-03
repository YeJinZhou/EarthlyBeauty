<template>
	<view>
		
		<view style="height: 30px;"></view>
		<view class="content-column" style="background-color: #fff;">
			<view class="uni-flex uni-row content-row" style="background-color: #fff;height: auto;">
				<view>
					<block v-for="(item,i) in files" :key="i">
						<view class="weui-uploaderfile" @tap="previewImage" :id="item">
							<image class="weui-uploaderimg" :src="item" mode="aspectFill" style="height: 70px;width: 70px;border-radius: 50%;" />
						</view>
					</block>
					
					<view v-if="files.length < 1 && files.length>=0" class="weui-uploader__input-box">  
						<view class="weui-uploader__input" @tap="chooseImage">  
							<image src="../../static/headPortrait.png" class="img" mode="aspectFill" style="height: 70px;width: 70px;border-radius: 50%;"></image>  
						</view>  
					</view> 
				</view>
				
				<view class="uni-flex margin-top margin-bottom" style="height: 70px;width: 220px;">
					<view class="flex justify-start" style="font-size: 17px;font-weight: bold;margin-top:10px;">{{name}}</view>
					<view class="flex justify-start">
						<view class="flex uni-flex uni-row content-row justify-start" style="flex-direction: row;height: 30px;">
							<navigator url="../me/attention/attention" hover-class="navigator-hover">
								<view>
									<text>粉丝</text>
									<text>{{fan}}</text>
								</view>
							</navigator>						
							<view class="margin-right margin-left">|</view>						
							<navigator url="../me/attention/attention" hover-class="navigator-hover">
								<view>
									<text>关注</text>
									<text>{{attention}}</text>
								</view>	
							</navigator>
						</view>		
					</view>
				</view>
				
				<view class="margin-bottom">
					<navigator url="../me/setting" hover-class="navigator-hover">
						<image src="../../static/install.png" style="height: 25px;width: 25px;border-radius: 50%;"></image>
					</navigator>
				</view>
			</view>
		</view>
		
		<navigator url="../me/ranking" hover-class="navigator-hover">
			<view class="size cu-form-group margin-top uni-flex uni-row">
				<view class="flex" style="width: 400px;">
					<image src="../../static/leaderBoard.png" class="icon">
						<text class="margin-left">排行榜</text>
					</image>		
				</view>	
			</view>
		</navigator>
		
		<navigator url="../me/collection" hover-class="navigator-hover">
			<view class="size cu-form-group margin-top uni-flex uni-row">
				<view class="flex" style="width: 400px;">
					<image src="../../static/collect.png" class="icon">
						<text class="margin-left">我的收藏</text>
					</image>
				</view>	
			</view>
		</navigator>
		
		<navigator url="../me/diary" hover-class="navigator-hover">
			<view class="size cu-form-group margin-top uni-flex uni-row">
				<view class="flex" style="width: 400px;">
					<image src="../../static/review.png" class="icon">
						<text class="margin-left">我的食记</text>
					</image>
				</view>	
			</view>
		</navigator>
		
		<navigator url="../me/plan" hover-class="navigator-hover">
			<view class="size cu-form-group margin-top uni-flex uni-row">
				<view class="flex" style="width: 400px;">
					<image src="../../static/plan.png" class="icon">
						<text class="margin-left">我的计划</text>
					</image>
				</view>	
			</view>
		</navigator>
		
	</view>
</template>

<script>
	export default {
		name: "me",
		data() {
					return {	
						PageCur:"me",
						files: [],	
						fan: 54,
						attention: 76,
						name: '一勺芝麻糊',
					}
				},
				methods: {
					chooseImage(e){
						let that = this;
						uni.chooseImage({
							count:1,
							sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
							success: function (res) {
								if(res.tempFiles[0].size > 2097152 ){
									PUBLIC.SHOWTOAST('上传图片不能超过2M~')
									return false
								}
								// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
								that.files = that.files.concat(JSON.parse(JSON.stringify(res.tempFilePaths)))
							}
						})
					},
					previewImage(e){
						uni.previewImage({
							current: e.currentTarget.id, // 当前显示图片的http链接
							urls: this.files // 需要预览的图片http链接列表
						})
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
				height: 50px;
				width: 50px;
			}
			.size{
				font-size: 15px;
			}
			.icon{
				height: 25px;
				width: 25px;
				border-radius: 50%;
			}
		</style>
