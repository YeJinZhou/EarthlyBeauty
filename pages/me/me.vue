<template>
	<view>
		<view style="height: 70upx;"></view>
		<view class="content-column" style="background-color: #fff;">
			<view class="uni-flex uni-row content-row" style="background-color: #fff;height: auto;">
				<view>
					<view v-for="(item,i) in files" :key="i">
						<view class="weui-uploaderfile" @tap="chooseImage" :id="item">
							<image class="weui-uploaderimg" :src="item" mode="aspectFill" style="height: 130upx;width: 130upx;border-radius: 50%;" />
						</view>
					</view>
					
					<view v-if="files.length < 1 && files.length>=0" class="weui-uploader__input-box">  
						<view class="weui-uploader__input" @tap="chooseImage">  
							<image src="/static/headPortrait.png" class="img" mode="aspectFill" style="height: 150upx;width: 150upx;border-radius: 50%;"></image>  
						</view>  
					</view> 
				</view>
				
				<view class="uni-flex margin-top margin-bottom margin-left" style="height: 150upx;width: 450upx;">
					<view class="flex justify-start">
						<text class="iconfont iconxinzeng" @click="prompt('uni-prompt')">
							<view style="font-size: 36upx;font-weight: bold;margin-top:22upx;">
								{{personInfo.name}}
							</view>
						</text>
						<prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" :text="promptText"></prompt>
					</view>
					<view class="flex justify-start">
						<view class="flex uni-flex uni-row content-row justify-start" style="flex-direction: row;height: 64upx;">
							<navigator url="../me/attention" hover-class="navigator-hover">
								<view>
									<text>粉丝</text>
									<text>{{personInfo.fansNumber}}</text>
								</view>
							</navigator>						
							<view class="margin-right margin-left">|</view>						
							<navigator url="../me/attention" hover-class="navigator-hover">
								<view>
									<text>关注</text>
									<text>{{personInfo.focusNumber}}</text>
								</view>	
							</navigator>
						</view>		
					</view>
				</view>
				
				<view class="margin-bottom">
					<navigator url="../me/setting" hover-class="navigator-hover">
						<image src="/static/install.png" style="height: 50upx;width: 50upx;border-radius: 50%;"></image>
					</navigator>
				</view>
			</view>
		</view>
		
		<navigator url="../me/ranking" hover-class="navigator-hover">
			<view class="size cu-form-group margin-top uni-flex uni-row">
				<view class="flex" style="width: 800upx;">
					<image src="/static/leaderBoard.png" class="icon">
						<text class="margin-left">排行榜</text>
					</image>		
				</view>	
			</view>
		</navigator>
		
		<navigator url="../me/collection" hover-class="navigator-hover">
			<view class="size cu-form-group margin-top uni-flex uni-row">
				<view class="flex" style="width: 800upx;">
					<image src="/static/collect.png" class="icon">
						<text class="margin-left">我的收藏</text>
					</image>
				</view>	
			</view>
		</navigator>
		
		<navigator url="../me/diary" hover-class="navigator-hover">
			<view class="size cu-form-group margin-top uni-flex uni-row">
				<view class="flex" style="width: 800upx;">
					<image src="/static/review.png" class="icon">
						<text class="margin-left">我的食记</text>
					</image>
				</view>	
			</view>
		</navigator>
		
		<navigator url="../me/plan" hover-class="navigator-hover">
			<view class="size cu-form-group margin-top uni-flex uni-row">
				<view class="flex" style="width: 800upx;">
					<image src="/static/plan.png" class="icon">
						<text class="margin-left">我的计划</text>
					</image>
				</view>	
			</view>
		</navigator>
	</view>	
</template>

<script>
	import prompt from '@/components/prompt.vue';
	export default {
		data() {
			return {	
				personInfo: [],
				files: [],	
			}
		},
		onLoad() {
			this.initPage()
		},
		components: {
			prompt,
		},
		methods: {
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/mypage/getPersonInfo',
					data: {
						account: 'oL9hKFg4Ou',
					}
				})
				// 给页面的数据赋值
				this.personInfo =res.data.data;
			},
			prompt:function(){
				this.$refs.prompt.show();
			},
			onConfirm:function(e){
				console.log(e);
				let _cost = e;
				if (_cost == '') {
				 console.log('你还未输入');
				 return;
				}
				else{
				  this.$refs.prompt.hide();
				  uni.showModal({ 
				  	title: '提示',
				  	content: '你输入的是:'+_cost,
				  	showCancel: false,
				  	confirmText: "确定"
				  })
				}
			},
			onCancel:function(){
				this.$refs.prompt.hide();
				this.$refs.prompt.cost = '';
			},
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
