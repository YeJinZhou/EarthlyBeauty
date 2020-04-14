<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">排行榜</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view v-for="(item, index) in lists" class="cu-item flex-sub" :class="index==TabCur?'text-red cur':''" :key="index"
				 v-on:click="tabSelect(index, $event)" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view v-show="TabCur==0">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="scroll" @scrolltolower="scroll" @scroll="scroll">
				<view v-for="(item, index) in countryranks">
					<view v-if="index<3">
						<view class="other_row">
							<image :src="'../../static/wode/'+(index+1)+'.png'" style="width:25px; height:25px; margin:6px;"></image>
							<view class="cu-avatar lg round" style="margin-right:6px; " :style="[{ backgroundImage:'url(' + item.headportrait + ')' }]"></view>
							<view class="name">{{item.name}}</view>
							<view class="score">{{item.score}}分</view>
						</view>
					</view>
					<view v-if="index>=3">
						<view class="other_row">
							<view class="rank" style="width:25px; height:25px; margin:6px; justify-content: center;">{{index+1}}</view>
							<view class="cu-avatar lg round"style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.headportrait + ')' }]"></view>
							<view class="name">{{item.name}}</view>
							<view class="score">{{item.score}}分</view>
						</view>
					</view>
				</view> 
				<view class="my_row">
					<view class="my" v-for="(item, index) in countrymaster">
						<view class="rank" style="width:25px; height:25px; margin:6px; justify-content: center;">{{item.rank}}</view>
						<view class="cu-avatar lg round" style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.headportrait + ')' }]"></view>
						<view class="name">{{item.name}}</view>
						<view class="score">{{item.score}}分</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-show="TabCur==1">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="scroll" @scrolltolower="scroll" @scroll="scroll">
				<view v-for="(item, index) in cityranks">
					<view v-if="index<3">
						<view class="other_row">
							<image :src="'../../static/wode/'+(index+1)+'.png'" style="width:25px; height:25px; margin:6px;"></image>
							<view class="cu-avatar lg round" style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.headportrait + ')' }]"></view>
							<view class="name">{{item.name}}</view>
							<view class="score">{{item.score}}分</view>
						</view>
					</view>
					<view v-if="index>=3">
						<view class="other_row">
							<view class="rank" style="width:25px; height:25px; margin:6px; justify-content: center;">{{index+1}}</view>
							<view class="cu-avatar lg round" style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.headportrait + ')' }]"></view>
							<view class="name">{{item.name}}</view>
							<view class="score">{{item.score}}分</view>
						</view>
					</view>
				</view>
				<view class="my_row">
					<view class="my" v-for="(item, index) in citymaster">
						<view class="rank" style="width:25px; height:25px; margin:6px; justify-content: center;">{{item.rank}}</view>
						<view class="cu-avatar lg round" style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.headportrait + ')' }]"></view>
						<view class="name">{{item.name}}</view>
						<view class="score">{{item.score}}分</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		mapState
	} from 'vuex'
	
	export default {
		computed: mapState(['userName']),
		components: {
			uniSearchBar,
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				lists: ['全国', '当前城市'],
				cityranks: [{ 
					headportrait:'',
					name: '',
					score: '' 
				},]
				,countryranks: [{
					headportrait:'',
					name: '',
					score: '' 
				},],
				citymaster:[{
					rank:'',
					headportrait:'',
					name:'',
					score:'',
					}],
					countrymaster:[{
					rank:'',
					headportrait:'',
					name:'',
					score:'' 
					}]
			};
		},onLoad() {
					this.initPage(); 
				},
		methods: {
			async initPage(){
							const res = await this.$myRequest({
								url: '/v1/api/mypage/getCityRank', //仅为示例，并非真实接口地址。
								data: {
						 			account: this.userName,
								},
							})
							console.log(res.data);
							let plans = [];
							for(let i=0;i<res.data.data.length-1;i++){
								plans.push(res.data.data[i]);
							}
							this.cityranks = plans;
							this.citymaster=[res.data.data[res.data.data.length-1]];
						
							
							const res1 = await this.$myRequest({
								url: '/v1/api/mypage/getNationalRank', //仅为示例，并非真实接口地址。
								data: {
									account: this.userName,
								},
							})
							let plans1 = [];
							for(let i=0;i<res1.data.data.length-1;i++){
								plans1.push(res1.data.data[i]);
							}
							this.countryranks = plans1;
							this.countrymaster=[res1.data.data[res1.data.data.length-1]];
							
						},
			tabSelect(index, e) {
				this.TabCur = index;
				console.log(this.TabCur);
			},
			scroll(e) {
				console.log(e);
			},
		}
	}
</script>

<style>
	.other_row {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		height: 70px;
		align-items: center;
	}

	.rank {
		color: red;
		font-size: medium;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.name {
		font-size: large;
	}

	.score {
		margin-left: auto;
		margin-right: 10px;
		color: red;
		font-weight: bold;
	}

	.my {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		height: 80px;
		align-items: center;
	}

	.my_row {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		left: 0;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
