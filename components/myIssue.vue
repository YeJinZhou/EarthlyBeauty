<template>
	<view class='issue'>
		<view class="issue-head">
			<textarea v-if="textareaShow" @blur="blur" :value="infoReceive.textareaValue" :placeholder="headareaPlaceholder"/>
		</view>
		 <textarea v-if="textareaShow" @blur="blur" :value="infoReceive.textareaValue" :placeholder="textareaPlaceholder"/>
		 <view class="issue-btn-box">
		 	<button v-if="submitShow" class="submit-btn" type="primary" @click="doSubmit">{{submitText}}</button>
			<slot name="submit"></slot>
		 </view>
		 
		 <view class="issue-btn-box">
		 	<button v-if="submitShow1" class="submit-btn" type="primary" @click="doSubmit">{{submitText1}}</button>
		 			<slot name="submit"></slot>
		 </view>
	</view>
</template>
<script>
	export default {
		props:{
			
			
			headTitleShow:{ //标题
				type:[String,Boolean],
				default:true,
			},
			headTitleValue:{
				type:String,
				default:"描述相符"
			},
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
			
			
			submitShow:{ // 发布按钮
				type:[String,Boolean],
				default:true,
			},
			submitText:{
				type:String,
				default:"方案自动生成游记",
			},
			
			submitShow1:{ // 发布按钮
				type:[String,Boolean],
				default:true,
			},
			submitText1:{
				type:String,
				default:"自由发表游记",
			},
			
			infoReceive:{ // 获取值
				type:Object,
				default:function(){
					return {
						score:0,
						textareaValue:""
					}
				}
			}
		},
		computed:{
			formatScore(){
				return this.infoReceive.score
			}
		},
		methods: {
			/**
			 * @name 设置分数
			 */
			setScore(score){
				if(this.starsDisabled!==false)return
				this.infoReceive.score=score
				this.$emit("scoreChange",score)
			},
			
			/**
			 * @name 获取textarea内容
			 */
			
			blur(e){
				this.infoReceive.textareaValue=e.detail.value
			},
			
			/**
			 * @name 提交
			 */
			doSubmit(){
				this.$emit('submit',this.infoReceive)
			}
		},
		created() {
			this.infoReceive.score=this.score
		}
	}
</script>
<style lang='scss'>
	$backgroundC:#f9f9f9;
	$borderColor:#f5f5f5;
	$white:#ffffff;
	$fontSize:28upx;
	
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
				background-color: #3682FF;
				line-height: 80upx
			}
		}
	}
	
	
</style>
