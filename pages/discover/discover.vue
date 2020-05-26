<template>

	
	<view class="content">
		<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" radius="100%" width="80%" active-color="#dd524d" ></uni-segmented-control>
		<view class="content">
		    <view v-show="current === 0">
				
		        <view v-for="(item,index) in dataList"  :key="item.index" :options="item.options"   style="width:46%;float: left;margin:2%;">
		        	<!-- 卡片组 -->
		        	<view class="cu-card case" :class="isCard?'no-card':''" style="border-radius: 10px;" >
		        					<navigator :url="'../discover/diary?foodrecordid='+item.id">
		        	    <view class="image" style="height:240px;" >
		        		    <image  :src="item.pictures"
		        		     mode="heightFix" ></image>
		        		    <view class="cu-bar bg-shadeBottom"> <text class="text-cut"  >{{item.title}}</text></view>				
		        	    </view>
		        	    <view class="cu-list menu-avatar" style="height: 35px;">
		        	    	<view class="cu-item" style="bottom: 50%;">
		        	    		<view class="cu-avatar round"  :style="[{ backgroundImage:'url(' + item.userBriefInformation.headportrait + ')' }]"></view>
		        
		        		    		<view class="text-grey" style="font-size:12px;margin-right:auto;margin-left: 30%;">{{item.userBriefInformation.name}}</view>			   			    		
		        			    		<view class="text-gray text-sm">			   			    		
		        				    		<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.praisenumber}}
		        				        </view>
		        		
		        	        </view>
		        	    </view>
		        					</navigator>
		        	</view>
		        </view>
		    </view>
			
		    <view v-show="current === 1">
			   <view v-for="(item,index) in focusList"  :key="item.index" :options="item.options"   style="width:46%;float: left;margin:2%;">
			   	<!-- 卡片组 -->
			   	<view class="cu-card case" :class="isCard?'no-card':''" style="border-radius: 10px;" >
			   					<navigator :url="'../discover/diary?foodrecordid='+item.id">
			   	    <view class="image" style="height:240px;" >
			   		    <image   :src="item.pictures"
			   		     mode="heightFix" ></image>
			   		    <view class="cu-bar bg-shadeBottom"> <text class="text-cut"  >{{item.title}}</text></view>				
			   	    </view>
			   	    <view class="cu-list menu-avatar" style="height: 35px;">
			   	    	<view class="cu-item" style="bottom: 50%;">
			   	    		<view class="cu-avatar round"  :style="[{ backgroundImage:'url(' + item.userBriefInformation.headportrait + ')' }]"></view>
			   
			   		    		<view class="text-grey" style="font-size:12px;margin-right:auto;margin-left: 30%;">{{item.userBriefInformation.name}}</view>			   			    		
			   			    		<view class="text-gray text-sm">			   			    		
			   				    		<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.praisenumber}}
			   				        </view>
			   		
			   	        </view>
			   	    </view>
			   					</navigator>
			   	</view>
			   </view>
		    </view>
		</view>
		
	</view>
</template>

<script>
	import WaterFull from '../../components/WaterFull.vue'
	
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	
	export default {
		data() {
			return {
				title: 'Hello',
				dataList: [],
				focusList:[],
				isCard: false,
				items: ['热门','关注'],
				current: 0
			}
		},
		components: {
			WaterFull,
			uniSearchBar,
			uniSegmentedControl
		},
		methods: {
			
			async initPage(){
				const res =await this.$myRequest({
					url:'/v1/api/discoverpage/getPopularFoodRecord',
					data:{
						
					},
				})
				console.log('back end data:');
				console.log(res.data);
				this.dataList =res.data.data;
				
				const focuslist =await this.$myRequest({
					url:'/v1/api/discoverpage/getFocusFoodRecord',
					data:{
						account:'472296000@qq.com'
						
					},
				})
				console.log('back');
				this.focusList =focuslist.data.data;
			},
			
			IsCard(e) {
				this.isCard = e.detail.value
			},
			
			onClickItem(e) {
			    if (this.current !== e.currentIndex) {
			        this.current = e.currentIndex;
			    }
			},
			// 给waterfull赋值
			giveData(arr) {
				let that = this;
				that.$refs.waterFull.handleLoad(arr);

			},
			
			//给关注赋值
			giveFollow(arr){
				let that =this;
				that.$refs.guanzhu.handleLoad(arr);
			},
			
			
			// 获取网络信息
			getNetWork() {
				uni.getNetworkType({
					success: function(res) {
						console.log(res);
					}
				});
			},
			// 获取设备信息
			getSystemInfo() {
				uni.getSystemInfo({
					success: function(res) {
						console.log(res);
					}
				});
			}
		},
		onLoad() {
			this.getNetWork();
			this.getSystemInfo();
			this.initPage();
		},
		mounted() {
			let that = this;
			let arr = [{
				cover: "/static/1.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 0,
				name: "随芝所乐",
				photo: "/static/logo.png",
				title: "吃货慎重！点进来你就无法自拔了！",
			}, {
				cover: "/static/7.png",
				id: "1084",
				isLiked: "0",
				likeCount: 520,
				name: "大吃货",
				photo: "/static/logo.png",
				title: "这间店真的太赞了！"
			}, {
				cover: "/static/2.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 650,
				name: "千层梦想家",
				photo: "/static/logo.png",
				title: "我爱千层千层爱我！"
			}, {
				cover: "/static/3.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 999,
				name: "无风",
				photo: "/static/logo.png",
				title: "西安美食大搜罗！",
			}, {
				cover: "/static/4.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 25,
				name: "123",
				photo: "/static/logo.png",
				title: "这种美食你绝对不能错过！",
			}, {
				cover: "/static/5.jpg",
				id: "1084",
				isLiked: "0",
				likeCount: 4,
				name: "快到碗里来",
				photo: "/static/logo.png",
				title: "啊，一口吃掉！",
			}];
			
			
		}
	}
</script>

<style>
</style>
