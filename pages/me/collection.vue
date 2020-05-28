<template>
	<view>
		<!-- 顶部导航栏 -->
		<cu-custom bgColor="bg-gradual-red1" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">收藏</block>
		</cu-custom>
		
		<!-- /左滑删除/ -->
		<uniSwipeAction>
        <uniSwipeActionItem v-for="(item,index) in diarylist"  @click="swipeClick($event,index)" :key="item.index" :options="options"  @change="swipeChange" style="backgroundColor: '#e54d42';margin:3%;border-radius: 10px;">
        	<!-- 卡片组 -->
			
			<view class="cu-card case" :class="isCard?'no-card':''" style="width:100%;" >
				<navigator :url="'../discover/diary?foodrecordid='+diarylist[index].id">
        	    <view class="image">
        		    <image  :src="item.pictures"
        		     mode="widthFix"></image>
        		    <view class="cu-tag bg-red">精选</view>
        		    <view class="cu-bar bg-shadeBottom"> <text class="text-cut"  >{{item.title}}</text></view>				
        	    </view>
        	    <view class="cu-list menu-avatar">
        	    	<view class="cu-item">
        	    		<view class="cu-avatar round lg"  :style="[{ backgroundImage:'url(' + item.userBriefInformation.headportrait + ')' }]"></view>
        		    	<view  class="content flex-sub">
        		    		<view class="text-grey">{{item.userBriefInformation.name}}</view>
        			    	<view class="text-gray text-sm flex justify-between">
        			    		{{item.time}}
        			    		<view class="text-gray text-sm">
        			    			<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.viewnumber}}
        				    		<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.praisenumber}}
        				    		<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.commentnumber}}
        				        </view>
        			        </view>
        		        </view>
        	        </view>
        	    </view>
				</navigator>
			</view>
			
		    <view style="margin-top:  200px;"></view>
        </uniSwipeActionItem>
		</uniSwipeAction>
	</view>
</template>

<script>
	// 搜索栏
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		mapState
	} from 'vuex'
	
	export default {
		computed: mapState([ 'userName']),
	
		components: {
			uniSearchBar,// 搜索栏
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		
		data() {
			return {
				isCard: false,
				searchVal: '',
				options: [{
					          	text: '删除',
					          	style: {
					          		backgroundColor: '#e54d42'
					          	}
					          }],
				diarylist:[]
			};
		},
		onLoad() {
			this.initPage(); 
		},
		methods: {
			async initPage(){
				const res = await this.$myRequest({
					url: '/v1/api/mypage/getCollectionFoodRecord?account=', //仅为示例，并非真实接口地址。
					data: {
						account: '982157286@qq.com'
					},
				})
				console.log(res.data);
				console.log(this.userName);
				let plans = [];
				for(let i=0;i<res.data.data.length;i++){
					plans.push(res.data.data[i]);
				}
				
				
				this.diarylist = plans;
				
				console.log(this.diarylist);
				
				
				// 给页面的数据赋值
				
			},
			async disCollect(id){
				const res = await this.$myRequest({
					url: '/v1/api/mypage/disCollectFoodRecord?userId=&foodRecordId=', //仅为示例，并非真实接口地址。
					data: {
						userId: this.userName,
						foodRecordId:id
					},
				})
				console.log(res.data);
				console.log(id);
				
				
				// 给页面的数据赋值
				
			},
			goDetail() {
				// 				if (!/前|刚刚/.test(e.published_at)) {
				// 					e.published_at = dateUtils.format(e.published_at);
				// 				}
				
				this.$router.push({path: '../discover/diary', query: {'id':this.id}})
			},
			IsCard(e) {                             // 卡片组
				this.isCard = e.detail.value
			},
			
			search(res) {                           // 搜索栏
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				this.searchVal = res.value
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			bindClick(e) {
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				})
			},
			setOpened() {
				this.isOpened = !this.isOpened
			},
			
			// 左滑删除，添加uni-swiper里也有，我没yong'shang
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
				if (content.text === '删除') {                // 通过对比options里的text决定删除还是添加还是什么
					uni.showModal({
						title: '提示',
						content: '是否删除',
						
						success: (res) => {
							if (res.confirm) {
								console.log(this.diarylist);								
								let id = this.diarylist[index].id;
								this.diarylist.splice(index, 1);
								this.disCollect(id);
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
	.hua {
		font-size: 20px;
		width: 5%;
		color:#b9b9b9;
		margin-bottom: 8%;
	}
</style>
