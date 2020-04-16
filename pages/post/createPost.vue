<template>
	<view class="content">
		<view class='issue'>
			<view class="issue-head">
				<textarea v-if="textareaShow" @blur="headblur" :value="head.headtextareaValue" :placeholder="headareaPlaceholder"/>
			</view>
			 
			
				<textarea v-if="textareaShow" @blur="blur" :value="infoReceive.textareaValue" :placeholder="textareaPlaceholder"/>
		
			 
			 <view class="issue-btn-box">
			 	<button v-if="submitShow1" class="submit-btn" type="primary" @click="doSubmit">{{submitText1}}</button>
			 			<slot name="submit"></slot>
			 </view>
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
				default:"美食满足你的期待吗？说说你的体验心得吧！"
			},
			
			
		
			
			submitShow1:{ // 发布按钮
				type:[String,Boolean],
				default:true,
			},
			submitText1:{
				type:String,
				default:"自由发表游记",
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
				title: 'Hello',
				enableDel: true,
				enableAdd: true,
				colorType: 'primary',
				tagList: []
			}
		},
		onLoad() {
		},
		methods:{
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
			doSubmit(){
				this.$emit('submit',this.infoReceive);
				this.$emit('submit',this.head);
				console.log(this.head,this.infoReceive)
				
			}
		}
		
	}
</script>

<style lang="scss">
	$backgroundC:#f9f9f9;
	$borderColor:#f5f5f5;
	$white:#ffffff;
	$fontSize:28upx;
	
	.content{
		height: 100%;
	}
	
	.issue {
		background-color: $backgroundC;
		
		&-head{
			background-color: $white;
			height: 100upx;
			border-top: 1upx solid $borderColor;
			border-bottom: 1upx solid $borderColor;
			
			padding: 0 25upx;
			
			
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
			padding: 24upx;
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
	
</style>