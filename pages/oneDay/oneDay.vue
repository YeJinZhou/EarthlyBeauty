<template>
	<view>
		
		<view class="head-nav">
			<image class="nav-button" @tap="click1">
				<button class="nav-text customize" @tap="click1" :class="modalName=='DialogModal1'?'D1':'D2'">
					推荐方案
				</button>
			</image>
			<image class="nav-button" @tap="click2">
				<button class="nav-text plan" @tap="click2" :class="modalName=='DialogModal2'?'D1':'D2'">
				我的计划
				</button>
			</image>
		</view>

        <view v-if="modalName=='DialogModal1'">
			<!-- /搜索栏/ -->
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<view class="example-body">
							<uni-search-bar radius="100"  style="margin-top:5px;width: 130%;" placeholder="搜索食记" bgColor="#EEEEEE" @confirm="search" />
						</view>
					</view>
				</view>
				
			   <view v-for="(item,index) in diarylist"  :key="item.index" :options="item.options"   style="width:46%;float: left;margin:2%;">
			   	<!-- 卡片组 -->
			   	<view class="cu-card case" :class="isCard?'no-card':''" style="border-radius: 10px;" >
					<navigator :url="'../discover/diary?id='+index">
			   	    <view class="image" style="height:240px;" >
			   		    <image   :src="item.background"
			   		     mode="heightFix" ></image>
			   		    <view class="cu-bar bg-shadeBottom"> <text class="text-cut"  >{{item.description}}</text></view>				
			   	    </view>
			   	    <view class="cu-list menu-avatar" style="height: 35px;">
			   	    	<view class="cu-item" style="bottom: 50%;">
			   	    		<view class="cu-avatar round"  :style="[{ backgroundImage:'url(' + item.headPortrait + ')' }]"></view>

			   		    		<view class="text-grey" style="font-size:12px;margin-right:auto;margin-left: 30%;">{{item.name}}</view>			   			    		
			   			    		<view class="text-gray text-sm">			   			    		
			   				    		<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.likes}}
			   				        </view>
			   		
			   	        </view>
			   	    </view>
					</navigator>
			   	</view>
			   </view>
        </view>
		
		
		<view v-if="modalName=='DialogModal2'">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-red"></text>
					<text>定制计划</text>
				</view>
			</view>
			<view style="height: 10px;"></view>
			<navigator url="/pages/me/plan">
				<view style="display: flex;justify-content: center;" class="bg-red shadow-blur ">
					<view class="bg-white" style="height: 130px; width:90%; border-radius: 10px;display: flex;flex-direction: column;justify-content: space-around;">
						<view style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;">
							<view class="t">
								<view class="cu-avatar xl round" style=""></view>
								<view>早餐</view>
							</view>
							<view style="color:#FF0000; font-size: 24px;">+</view>
							<view class="t">
								<view class="cu-avatar xl round" style=""></view>

								<view>中餐</view>
							</view>
							<view style="color:#FF0000; font-size: 24px;">+</view>
							<view class="t">
								<view class="cu-avatar xl round" style=" "></view>
								<view>晚餐</view>
							</view>
						</view>
						<view style="display: flex;justify-content: center;font-size: 17px; color: #FF0000;">点击定制我的一日计划</view>
					</view>
				</view>
			</navigator>
			<view style="height: 10px;"></view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-red"></text>
					<text>我的计划</text>
				</view>
			</view>
	
				<uniSwipeActionItem v-for="(item,index) in planlist" @click="swipeClick($event,index)" :key="item.index" :options="item.options"
				 @change="swipeChange" style="margin:3%;height: 130px;border-radius: 10px;">
					<view class="cu-list menu-avatar" style="height:130px">
						<view class="cu-item" style="display: flex; flex-direction: row; align-items: center; justify-content: center;margin-top: 10%;border-radius: 10px;">
							<view class="con solid-right" style="color: #FFFFFF; height: 130%; border-radius: 10px; background-color:#F76260; width:8%;margin-left: 5%; display: flex; flex-direction: row; align-items: center; justify-content: space-around;">
								<view style="margin-left: 16px; display: flex; align-items: center; justify-content: center;">方案{{(index+1)}}</view>
							</view>
							<view class="contain" style="width: 90%;">
								<view class="t">
									<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item.headPortrait1 + ')' }]"></view>
									<view>{{item.food1}}</view>
									<view>{{item.shop1}}</view>
								</view>
								<view class="jia">+</view>
								<view class="t">
									<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item.headPortrait2 + ')' }]"></view>
									<view>{{item.food2}}</view>
									<view>{{item.shop2}}</view>
								</view>
								<view class="jia">+</view>
								<view class="t">
									<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item.headPortrait3 + ')' }]"></view>
									<view>{{item.food3}}</view>
									<view>{{item.shop3}}</view>
								</view>
								<view class="hua">《</view>
							</view>
						</view>
					</view>
				</uniSwipeActionItem>
	
			<button class="tttt cu-btn bg-red margin-tb-sm lg">一键生成一日美食</button>
		</view>
		
	
		
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
				PageCur:"oneDay",
				isCard: false,
				searchVal: '',
				modalName: 'DialogModal1',
				planlist: [{
					options: [{
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}],
					id: 0,
					food1: '羊肉泡馍',
					shop1: '鼎盛兴店',
					headPortrait1: '../../static/img/timg.png',

					food2: '臊子面',
					shop2: '李氏臊子面',
					headPortrait2: '../../static/img/2.png',

					food3: '陕西凉皮',
					shop3: '长安美食坊',
					headPortrait3: '../../static/img/3.png',
				}, {
					id: 1,
					options: [{
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}],
					food1: '羊肉泡馍',
					shop1: '回坊老马家',
					headPortrait1: '../../static/img/timg.png',

					food2: '臊子面',
					shop2: '李氏臊子面',
					headPortrait2: '../../static/img/2.png',

					food3: '陕西凉皮',
					shop3: '长安美食坊',
					headPortrait3: '../../static/img/3.png',
				}, {
					id: 2,
					options: [{
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}],
					food1: '羊肉泡馍',
					shop1: '回坊老马家',
					headPortrait1: '../../static/img/timg.png',

					food2: '臊子面',
					shop2: '李氏臊子面',
					headPortrait2: '../../static/img/2.png',

					food3: '陕西凉皮',
					shop3: '长安美食坊',
					headPortrait3: '../../static/img/3.png',
				}],
				diarylist:[{
					          options: [{
					          	text: '删除',
					          	style: {
					          		backgroundColor: 'rgb(255,58,49)'
					          	}
					          }],
					          id: 0,
							  name: '令人头秃',
							  description: '希望大家能够尝一尝这家烤肉！',
							  background:"../../static/img/7.jpg",
							  headPortrait:'../../static/img/5.jpg',
					          
						      views:'15',
						      likes:'25',
						      comment:'35',
						   },{
						       id: 1,
						       options: [ {
						       	text: '删除',
						       	style: {
						       		backgroundColor: 'rgb(255,58,49)'
						       	}
						       }],
							   name: '吃货小王',
							   description: '他们家的凉皮真的不容错过！！',
							   background:"../../static/img/3.png",
							   headPortrait:'../../static/img/6.jpg',
					          
						       views:'30',
						       likes:'22',
						       comment:'18',
						   },{
							   id: 2,
							   options: [{
							   	text: '删除',
							   	style: {
							   		backgroundColor: 'rgb(255,58,49)'
							   	}
							   }],
					           name: '独白',
					   	       description: '这家的面真的太好吃啦！',
						       background:"../../static/img/2.png",
						       headPortrait:'../../static/img/qq_pic_merged_1583398729577.jpg',
						       views:'11',
						       likes:'5',
						       comment:'3',
						   },{
						       id: 3,
						       options: [ {
						       	text: '删除',
						       	style: {
						       		backgroundColor: 'rgb(255,58,49)'
						       	}
						       }],
					           name: 'SiSi',
					           description: '西安美食大搜罗！去了很多地方才收集到的哦！',
					           background:"../../static/img/12.png",
					           headPortrait:'../../static/img/qq_pic_merged_1583398711824.jpg',
						       views:'30',
						       likes:'22',
						       comment:'18',
						   },{
						       id: 4,
						       options: [ {
						       	text: '删除',
						       	style: {
						       		backgroundColor: 'rgb(255,58,49)'
						       	}
						       }],
					           name: '随芝所乐',
					           description: '吃货慎重！点进来你就无法自拔了！',
					           background:"../../static/img/7.png",
					           headPortrait:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
						       views:'30',
						       likes:'22',
						       comment:'18',
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
			click1: function() {
				this.modalName = 'DialogModal1';
				console.log(this.modalName);
			},
			click2: function() {
				this.modalName = 'DialogModal2';
				console.log(this.modalName);
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
			},
			onBackPress() {
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				// #endif
			},
		},

	}
</script>

<style>
	.head-nav {
		position: relative;
		margin: 10px;
		height: 120px; 
		display: flex; 
		justify-content: space-around;
		align-items: center;
	}
	.nav-button {
		position: relative;
		height:100%; 
		width:48%; 
		border-radius: 10px;
		background: url(https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1947298534,2782052763&fm=26&gp=0.jpg) 0/100%;
	}
	.nav-text {
		position: absolute;
		bottom: 0;
		border-radius: 10px 10px 0 0;
	}
	.head-nav .customize {
		left: 40px;
	}
	.head-nav .plan {
		right: 40px;
	}
	.contain {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.D1 {
		color: #FFFFFF;
		background-color: #FF0000;
		position: absolute;
		z-index: 100;
		
	}

	.D2 {
		color: #FF0000;
		background-color: #FFFFFF;
		position: absolute;
		z-index: 100;
	}

	.jia {
		font-size: 20px;
		color: #ff0000;
		margin-bottom: 8%;
	}

	.hua {
		font-size: 20px;
		width: 5%;
		color: #b9b9b9;
		margin-bottom: 8%;
	}

	.tttt {
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		position: fixed;

		bottom: 50px;
		width: 80%;
	}

	.t {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.con {

		width: 17px;
		font-size: 17px;
		word-wrap: break-word;
		letter-spacing: 20px;
	}
</style>
