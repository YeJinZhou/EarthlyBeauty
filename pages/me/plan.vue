<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true"><block slot="backText">返回</block><block slot="content">我的计划</block></cu-custom>
		
		
        	<uni-swipe-action-item v-for="(item,index) in planlist" @click="swipeClick($event,index)" :key="item.index" :options="item.options"  @change="swipeChange" style="margin:4%;height: 130px;border-radius: 10px;">
					<navigator :url="'../oneDay/customized?id='+index">
						<view class="cu-list menu-avatar" style="height:130px">
							<view class="cu-item" style="display: flex; flex-direction: row; align-items: center; justify-content: center;margin-top: 10%;border-radius: 10px;">
						<view class="con solid-right" style="color: #FFFFFF; height: 130%; border-radius: 10px; background-color:#F76260; width:8%;margin-left: 5%; display: flex; flex-direction: row; align-items: center; justify-content: space-around;">
					 		<view style="margin-left: 16upx; display: flex; align-items: center; justify-content: center;">方案{{(index+1)}}</view>
					 	</view>
				    	<view class="contain" style="width: 90%;">
							<view class="t">
								<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item.headPortrait1 + ')' }]"></view>
								<view>{{item.food1}}</view>
								<view>{{item.shop1}}</view>
							</view>
							<view class="jia"  >+</view>
							<view class="t">
								<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item.headPortrait2 + ')' }]"></view>
								<view>{{item.food2}}</view>
								<view>{{item.shop2}}</view>
							</view>
							<view class="jia"  >+</view>
							<view class="t">
								<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item.headPortrait3 + ')' }]"></view>
								<view>{{item.food3}}</view>
								<view>{{item.shop3}}</view>
							</view>
							<view class="hua"  >《</view>
        			    </view>
						</view>
        	          </view>
					</navigator>
        	</uni-swipe-action-item>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			uniSearchBar,
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				isCard: false,
				searchVal: '',
				planlist:[{
					          options: [{
					          	text: '删除',
					          	style: {
					          		backgroundColor: 'rgb(255,58,49)'
					          	}
					          }],
					          id: 0,
							  food1:'羊肉泡馍',
							  shop1:'鼎盛兴店',
						      headPortrait1:'../../static/img/timg.png',
							  
							  food2:'臊子面',
							  shop2:'李氏臊子面',
							  headPortrait2:'../../static/img/2.png',
							  
							  food3:'陕西凉皮',
							  shop3:'长安美食坊',
							  headPortrait3:'../../static/img/3.png',
						   },{
						       id: 1,
						       options: [ {
						       	text: '删除',
						       	style: {
						       		backgroundColor: 'rgb(255,58,49)'
						       	}
						       }],
					           food1:'羊肉泡馍',
					           shop1:'回坊老马家',
					           headPortrait1:'../../static/img/timg.png',
					           
					           food3:'臊子面',
					           shop3:'李氏臊子面',
					           headPortrait3:'../../static/img/2.png',
					           
					           food2:'陕西凉皮',
					           shop2:'长安美食坊',
					           headPortrait2:'../../static/img/3.png',
						   },{
							   id: 2,
							   options: [{
							   	text: '删除',
							   	style: {
							   		backgroundColor: 'rgb(255,58,49)'
							   	}
							   }],
					           food3:'羊肉泡馍',
					           shop3:'回坊老马家',
					           headPortrait3:'../../static/img/timg.png',
					           
					           food2:'臊子面',
					           shop2:'李氏臊子面',
					           headPortrait2:'../../static/img/2.png',
					           
					           food1:'陕西凉皮',
					           shop1:'长安美食坊',
					           headPortrait1:'../../static/img/3.png',
						   }]
			};
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
		
			change(e) {
				this.isOpened = e
				console.log('返回：', e);
			},
			swipeChange(e) {
				console.log('返回：', e);
			},
			swipeClick(e, index) {
				let {
					content
				} = e
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: (res) => {
							if (res.confirm) {
								this.planlist.splice(index, 1)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} 
			}
		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		}
	}
</script>

<style>
	.contain {
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
		}
	
		.jia {
			font-size: 20px;
			color: #ff0000;
			margin-bottom: 8%;
		}
	
	    .hua {
	    	font-size: 20px;
			width: 5%;
	    	color:#b9b9b9;
	    	margin-bottom: 8%;
	    }
		
		.t {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	
		.con {
	
			width: 17upx;
			font-size: 17px;
			word-wrap: break-word;
			letter-spacing: 20upx;
		}
	
</style>
