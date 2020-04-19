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
						<uni-search-bar radius="100" style="margin-top:5px;width: 130%;" placeholder="搜索食记" bgColor="#EEEEEE" @confirm="search" />
					</view>
				</view>
			</view>

			<view v-for="(item,index) in diarylist" :key="item.index" :options="item.options" style="width:46%;float: left;margin:2%;">
				<!-- 卡片组 -->
				<view class="cu-card case" :class="isCard?'no-card':''" style="border-radius: 10px;">
					<navigator :url="'../discover/diary?id='+index">
						<view class="image" style="height:240px;">
							<image :src="item.picture" mode="heightFix"></image>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.title}}</text></view>
						</view>
						<view class="cu-list menu-avatar" style="height: 35px;">
							<view class="cu-item" style="bottom: 50%;">
								<view class="cu-avatar round" :style="[{ backgroundImage:'url(' + item.userBriefInformation.headPortrait + ')' }]"></view>

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


		<view v-if="modalName=='DialogModal2'">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-red"></text>
					<text>定制计划</text>
				</view>
			</view>
			<view style="height: 10px;"></view>
			<navigator :url="'./customized?planid='">
				<view style="display: flex;justify-content: center;" class="bg-red shadow-blur ">
					<view class="bg-white" style="height: 130px; width:90%; border-radius: 10px;display: flex;flex-direction: column;justify-content: space-around;">
						<view style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;">
							<view class="food_row">
								<view class="cu-avatar xl round" style="background-image:url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3253192378,2348729612&fm=26&gp=0.jpg);"></view>
								<view>早餐</view>
							</view>
							<view style="color:#FF0000; font-size: 24px;">+</view>
							<view class="food_row">
								<view class="cu-avatar xl round" style="background-image:url(https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=302585888,3129081542&fm=15&gp=0.jpg);"></view>

								<view>中餐</view>
							</view>
							<view style="color:#FF0000; font-size: 24px;">+</view>
							<view class="food_row">
								<view class="cu-avatar xl round" style="background-image:url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1105787745,4004189151&fm=15&gp=0.jpg);"></view>
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
			<uniSwipeAction>
				<uniSwipeActionItem v-for="(item,index) in jihualist.map(x=>x.briefPlanItems)" @click="swipeClick($event,index)"
				 :key="item.index" :options="options" @change="swipeChange" style="margin:3%;height: 130px;border-radius: 10px;">
					<view class="cu-list menu-avatar">
						<view class="cu-item" style="display: flex;height:100%; flex-direction: row; align-items: center; justify-content: center;border-radius: 10px;">
							<view style='display: flex;justify-content: center;'>
								<navigator :url="'./customized?planid='+jihualist[index].id">
									<view class="contain" style="width: 96%; border-radius: 10px;">

										<view class="word" style="color: #FFFFFF; height: 100%; border-radius: 10px; background-color:#F76260; width:10%; display: flex; flex-direction: row; align-items: center; justify-content: space-around;">
											<view style="margin-left: 16px; display: flex; align-items: center; justify-content: center;">方案{{index+1}}</view>
										</view>
										<view class="food_row">
											<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item[0].foodurl + ')' }]"></view>
											<view>{{item[0].foodname}}</view>
											<view>{{item[0].shopname}}</view>
										</view>
										<view class="plus" style="color:#FF0000; font-size: 24px;">+</view>
										<view class="food_row">
											<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item[1].foodurl + ')' }]"></view>
											<view>{{item[1].foodname}}</view>
											<view>{{item[1].shopname}}</view>
										</view>
										<view class="plus" style="color:#FF0000; font-size: 24px;">+</view>
										<view class="food_row">
											<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item[2].foodurl + ')' }]"></view>
											<view>{{item[2].foodname}}</view>
											<view>{{item[2].shopname}}</view>
										</view>
									</view>
								</navigator>
								<view style="display:flex; align-items: center;">
									<checkbox class="round red" :class="getBoxStatus(index)" v-on:click="CheckboxChange(index)"></checkbox>
								</view>
							</view>
						</view>
					</view>
				</uniSwipeActionItem>
			</uniSwipeAction>
			<navigator url="../post/createPost">
				<button class="menu cu-btn bg-red margin-tb-sm lg" @click="oneclick()">一键生成一日美食</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
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
				PageCur: "oneDay",
				isCard: false,
				searchVal: '',
				ischeck: -1,
				modalName: 'DialogModal1',
				options: [{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				jihualist: [{
						"id": 99473,
						"briefPlanItems": [{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							},
							{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							},
							{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							}
						]
					},
					{
						"id": 99945,
						"briefPlanItems": [{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							},
							{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							},
							{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							}
						]
					},
					{
						"id": 100659,
						"briefPlanItems": [{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							},
							{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							},
							{
								"foodname": "",
								"foodurl": "",
								"shopname": "",
								"kind": ""
							}
						]
					}
				],
				diarylist: [{

					id: 10,
					userBriefInformation: {
						name: '随芝所乐',
						headPortrait: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg'
					},
					title: '吃货慎重！点进来你就无法自拔了！',
					picture: "../../static/img/7.png",

					praisenumber: '25',

				}, {
					id: 1,

					userBriefInformation: {
						name: 'SiSi',
						headPortrait: '../../static/img/qq_pic_merged_1583398711824.jpg'
					},
					title: '西安美食大搜罗！去了很多地方才收集到的哦！',
					picture: "../../static/img/12.png",


					praisenumber: '22',

				}, {
					id: 2,


					userBriefInformation: {
						name: '独白',
						headPortrait: '../../static/img/qq_pic_merged_1583398729577.jpg'
					},
					title: '这家的面真的太好吃啦！',
					picture: "../../static/img/2.png",

					praisenumber: '5',

				}]
			};
		},
		onLoad() {
			this.initPage();
		},
		methods: {
			async initPage() {
				const res1 = await this.$myRequest({
					url: '/v1/api/onedayyfoodpage/getbriefplanbyuserid', //仅为示例，并非真实接口地址。
					data: {
						userid: this.userName,
					},
				})
				console.log(res1.data);
				this.jihualist = res1.data.data;

				const res = await this.$myRequest({
					url: '/v1/api/onedayyfoodpage/getrecommendfoodrecord?cityid=', //仅为示例，并非真实接口地址。
					data: {
						cityid: 1
					},
				})
				console.log(res.data);
				let plans = [];
				for (let i = 0; i < res.data.data.length; i++) {
					plans.push(res.data.data[i]);
				}
				plans.push(plans[0]);
				plans.push(plans[0]);
				this.diarylist = plans;

				console.log(this.diarylist);
			},
			async disPlan(id) {
				const res = await this.$myRequest({
					url: '/v1/api/onedayyfoodpage/deleteplan', //仅为示例，并非真实接口地址。
					data: {
						planid: id
					},
				})
				console.log(id);
			},
			async oneclickfoodrecord(id) {
				const res = await this.$myRequest({
					url: '/v1/api/publishpage/oneclickfoodrecord', //仅为示例，并非真实接口地址。
					data: {
					  planid:id
					},
				})
			},
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
			oneclick() {
				let id = this.ischeck;
				console.log(id);
				if(id!=-1)
				{
					this.oneclickfoodrecord(id);
				}
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
								this.jihualist.splice(index, 1);
								let id = this.jihualist[index].id;
								this.disPlan(id);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			CheckboxChange(index) {
				if(this.ischeck == index){
					this.ischeck = -1;
				}else{
					this.ischeck = index;
				}
			},
			getBoxStatus(index) {
				return this.ischeck == index ? 'checked' : '';
			},
			onBackPress() {
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				// #endif
			}
		},

	}
</script>

<style>
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

	.menu {
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		position: fixed;

		bottom: 40px;
		width: 80%;
	}
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
		height: 130px;
	}



	.plus {
		height: 20px;
		width: 20px;
	}

	.food_row {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.word {
		width: 17px;
		font-size: 17px;
		word-wrap: break-word;
		letter-spacing: 20px;
	}
</style>
