<template>

	
	<view class="search">
		
		<view style="background-color: #FFFFFF;" >
			<uni-search-bar radius="100" placeholder="搜索食记"  bgColor="#EEEEEE" @input="input"/>
			<text >{{words}}</text>
		</view>
		<!-- <uni-search-bar :radius="100" @confirm="search"></uni-search-bar> -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" radius="100%" width="80%" active-color="#dd524d"  ></uni-segmented-control>
		<view class="select">
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
				searchVal:'',
				title: 'Hello',
				dataList: [],
				focusList:[],
				words:'',
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
			input(res1) {
				this.searchVal = res1.value;
				this.searchRecord();
			},
			async searchRecord(){
				const res1 = await this.$myRequest({
					url: '/v1/api/onedayyfoodpage/queryfoodrecord',
					data: {
						foodrecordtitle:this.searchVal,
					}
				})
				console.log(res1.data);
				if(res1.data.code==-1)
				{
					this.words='抱歉，未找到相关结果，为你推荐：';
				}
				else
				{
					this.words='';
					let records = [];
					let records1 = [];
			    	// for (let i = 0; i < res1.data.data.length; i++) {
				    // 	records.push(res1.data.data[i]);
			    	// }
				    //records.push(records[0]);
			    	//records.push(records[0]);
					if(this.current===0){
						for (let i = 0; i < res1.data.data.length; i++) {
							records.push(res1.data.data[i]);
						}
						this.dataList = records;
					}
			    	else{
						// for (let j = 0; j < res1.data.data.length; j++) {
						// 	records1.push(res1.data.data[j]);
						// }
			   //  		this.focusList = records1;
			    	}
					//this.focusList = records;
			   	}		
			},
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
			//this.initPage();
		},
		mounted() {
			
			this.initPage();
			
			
			
		}
	}
</script>

<style lang="scss">
.content{
	width:100%;
}
.search{
	width:100%;
	margin-top: 40rpx;
}
.select{
	width:100%;
}
</style>
