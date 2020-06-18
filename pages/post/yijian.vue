<template>
	<view class="yijian">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="backText">返回</block><block slot="content">发表</block></cu-custom>
		<view class='issue'>
			<view class="issue-head">
				<textarea v-if="textareaShow" @blur="headblur" :value="head.headtextareaValue" :placeholder="headareaPlaceholder"/>
			</view>
			 
			<textarea v-if="textareaShow" @blur="blur" :value="infoReceive.textareaValue" :placeholder="textareaPlaceholder"/>
			
			<view class="cu-dialog eb-comment">
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
			</view>
			
			
			<view class="plan" >
				<view class="shop">
					<image class="shop-avatar" :src="planData.planitems[0].foodurl">
					<text class="food-name">{{planData.planitems[0].foodname}}</text>
					<text class="shop-name">{{planData.planitems[0].shopname}}</text>
				</view>
				<view class="jia">+</view>
				<view class="shop">
					<image class="shop-avatar" :src="planData.planitems[1].foodurl">
					<text class="food-name">{{planData.planitems[1].foodname}}</text>
					<text class="shop-name">{{planData.planitems[1].shopname}}</text>
				</view>
				<view class="jia">+</view>
				<view class="shop">
					<image class="shop-avatar" :src="planData.planitems[2].foodurl">
					<text class="food-name">{{planData.planitems[2].foodname}}</text>
					<text class="shop-name">{{planData.planitems[2].shopname}}</text>
				</view>
				
				
				
			</view>
			<!-- 一日计划 -->
			
			<button v-if="submitShow1" class="button_1" type="primary" @click="doSubmit">{{submitText1}}</button>
			<slot name="submit"></slot>
		</view>
		
		<robby-tags v-model="tagList" @add="addTag" @delete="delTag" @click="clickTag" :enable-del="enableDel" :enable-add="enableAdd"></robby-tags>
		
	</view>
	
	
</template>

<script>
  
  import robbyTags from '@/components/robby-tags/robby-tags.vue'
	export default {
		components:{},
		props:{
			
			headareaPlaceholder:{
				type:[String],
				default:"标题（选填）"
			},
			
			
			textareaShow:{ // 多行文本显示
				type:[String,Boolean],
				default:true,
			},
			textareaPlaceholder:{
				type:[String],
				default:"说到西安,你脑袋中第一浮现出来的是什么呢？我脑袋中浮现出来的就是美食！！！大凡到过西安的人，都会去品尝一下西安的牛羊肉泡馍。由于羊肉泡馍经济实惠，而极富有地方特色，来西安不吃牛羊肉泡，似乎就白来西安一趟."
			},
			
			
			submitShow1:{ // 发布按钮
				type:[String,Boolean],
				default:true,
			},
			submitText1:{
				type:String,
				default:"一键发表游记",
			},
			
			head:{ // 获取值
				type:Object,
				default:function(){
					return {
						headtextareaValue:""
					}
				}
			},
			
			infoReceive:{ // 获取值
				type:Object,
				default:function(){
					return {
						
						textareaValue:""
					}
				}
			}
		},
		
		
		
		data() {
			return {
				title: '',
				enableDel: true,
				enableAdd: true,
				colorType: 'primary',
				tagList: [],
				imgList:[],
				imgs:[],
				planData:[],
			}
		},
		onLoad(options) {
			console.log(options.planid);
			var j = parseInt(options.planid);
			this.getPlan(j);
		},
		methods:{
			async getPlan(planid){
				
				
				const plan =await this.$myRequest({
					url:'/v1/api/onedayyfoodpage/getplanbyid',
					data:{
						planid:planid
						
					},
				})
				this.planData =plan.data.data;
				
			  
				
				console.log('pinglun:'+this.planData.id);
	
			},
			
		    clickTag: function(e){
		        console.log(e)
		    },
		    delTag: function(e){
		        console.log(e)
		    },
		    addTag: function(e){
		        console.log(e)
		    },
			
			/**
			 * @name 获取textarea内容
			 */
			
			blur(e){
				this.infoReceive.textareaValue=e.detail.value
				//this.head.headtextareaValue=e.detail.value
			},
			headblur(e){
				
				this.head.headtextareaValue=e.detail.value
			},
			
			
			
			/**
			 * @name 提交
			 */
			async doSubmit(){
				this.$emit('submit',this.infoReceive);
				this.$emit('submit',this.head);
				console.log('标题 '+this.head.headtextareaValue);
				console.log('正文 '+this.infoReceive.textareaValue);
				
				let imgs = this.imgList.map((value, index) => {
					return {
						name: 'image' + index,
						uri: value,
					}
				})
				console.log('照片 ')
				console.log(imgs);
				uni.uploadFile({
					url: 'http://10.21.234.73:8080/v1/api/publishpage/insertplanfoodrecord', //仅为示例，非真实的接口地址
					files: imgs,
					formData:{
						title:this.head.headtextareaValue,
						content:this.infoReceive.textareaValue,
						userid: '472296000@qq.com',
						planid:	1,
						cityid: 1,
					},
					
				
				});
				uni.showToast({
					title: '食记发表成功！',
				});
				
				
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
			
		}
		
	}
</script>

<style lang="scss">
	$backgroundC:#f9f9f9;
	$borderColor:#f5f5f5;
	$white:#ffffff;
	$fontSize:28upx;	
	.yijian{
		height: 100%;
	}
	
	.issue {
		background-color: $backgroundC;
		&-head{
			background-color: $white;
			height: 80upx;
			border-top: 1upx solid $borderColor;
			border-bottom: 1upx solid $borderColor;
			font-size: 50upx;
			font-weight: 700;
			&-title{
				line-height: 100upx;
				font-size: 30upx;
				vertical-align: middle;
				margin-right: 35upx;
			}
		}
		
		textarea{
			width: 100%;
			height: 420upx;
			background-color: $white;
			font-size: $fontSize;
			color: #898989;
			padding: 30upx;
			border-top: 1upx solid $borderColor;
			border-bottom: 1upx solid $borderColor;
			
			box-sizing: border-box;
			line-height: 40upx
		}
		&-btn-box{
			padding: 15upx 15upx;
			
			button{
				width: 100%;
				height: 80upx;
				border-radius: 80upx;
				font-size: $fontSize;
				background-color: #ff9966;
				line-height: 80upx
			}
		}
	}
	.plan {
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
	
	.button_1{
		margin: 10upx auto;
		width: 90%;
		height: 80upx;
		color: #fff;
		border-radius: 10upx;
		background-color: #e54d42;
		line-height: 80upx
	}
</style>
