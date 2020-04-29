<template>
<view>
	<cu-custom bgColor="bg-gradual-red1" :isBack="true"><block slot="backText">返回</block><block slot="content">我的计划</block></cu-custom>
	
	<uniSwipeActionItem v-for="(item,index) in planlist.map(x=>x.briefPlanItems)" v-if="item[0].foodurl&&item[0].foodname&&item[0].shopname" @click="swipeClick($event,index)"  :key="item.index" :options="options"  @change="swipeChange" style="margin:4%;height: 130px;border-radius: 10px;">
		<navigator hover-class="none" :url="'../oneDay/customized?planid='+planlist[index].id">
			<view class="cu-list menu-avatar" style="height:130px">
				<view class="cu-item item">
					<view class="plan-block">
						<view class="plan">方案{{(index+1)}}</view>
					</view>
					<view class="contain" style="width: 90%;">
						<view class="t">
							<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item[0].foodurl + ')' }]"></view>
							<view>{{item[0].foodname}}</view>
							<view>{{item[0].shopname}}</view>
						</view>
						<view class="jia"  >+</view>
						<view class="t">
							<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item[1].foodurl + ')' }]"></view>
							<view>{{item[1].foodname}}</view>
							<view>{{item[1].shopname}}</view>
						</view>
						<view class="jia"  >+</view>
						<view class="t">
							<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + item[2].foodurl + ')' }]"></view>
							<view>{{item[2].foodname}}</view>
							<view>{{item[2].shopname}}</view>
						</view>
						<view class="hua"  >《</view>
					</view>
				</view>
			</view>
		</navigator>
	</uniSwipeActionItem>
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
		computed: mapState([ 'userName']),
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
				options: [{
					          	text: '删除',
					          	style: {
					          		backgroundColor: '#e54d42'
					          	}
					          }],
				planlist:[{
					          
					        id: 0,
						    briefPlanItems: 
							[
							  {foodname:'羊肉泡馍',
							  shopname:'鼎盛兴店',
						      foodurl:'../../static/img/timg.png',
							  kind:1},
							  {
							  foodname:'臊子面',
							  shopname:'李氏臊子面',
							  foodurl:'../../static/img/2.png',
							  kind:1},
							  {
							  foodname:'陕西凉皮',
							  shopname:'长安美食坊',
							  foodurl:'../../static/img/3.png',
							  kind:1}
						   ]
						  },{
						       id: 1,
						    briefPlanItems:
						    [  
								{
					           foodname:'羊肉泡馍',
					           shopname:'回坊老马家',
					           foodurl:'../../static/img/timg.png',
							  kind:1},
					           {
					           foodname:'臊子面',
					           shopname:'李氏臊子面',
					           foodurl:'../../static/img/2.png',
							  kind:1},
					           {
					           foodname:'陕西凉皮',
					           shopname:'长安美食坊',
					           foodurl:'../../static/img/3.png',
							  kind:1}
						   ]
						   },{
							   id: 2,
							  briefPlanItems:
							  [  
							  	{
					           foodname:'羊肉泡馍',
					           shopname:'回坊老马家',
					           foodurl:'../../static/img/timg.png',
							  kind:1},
					          { 
					           foodname:'臊子面',
					           shopname:'李氏臊子面',
					           foodurl:'../../static/img/2.png',
							  kind:1},
					           {
					           foodname:'陕西凉皮',
					           shopname:'长安美食坊',
					           foodurl:'../../static/img/3.png',
							  kind:1}
						   ]}]
			};
		},
		onLoad() {
					this.initPage(); 
				},
		methods: {
			async initPage(){
							const res = await this.$myRequest({
								url: '/v1/api/onedayyfoodpage/getbriefplanbyuserid?userid=', //仅为示例，并非真实接口地址。
								data: {
									userid: this.userName
								},
							})
							console.log(res.data);
							console.log(this.userName);
							this.planlist = res.data.data;
						
							
							
							// 给页面的数据赋值
							
						},
			async displan(id){
							const res = await this.$myRequest({
								url: '/v1/api/onedayyfoodpage/deleteplan?planid=', //仅为示例，并非真实接口地址。
								data: {
									planid: id,
								},
							})
							console.log(res.data);
							console.log(id);
							
							
							// 给页面的数据赋值
							
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
								console.log(this.planlist);								
								let id = this.planlist[index].id;
								this.planlist.splice(index, 1);
								this.displan(id)
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
	.item {
		display: flex; 
		flex-direction: row; 
		align-items: center; 
		justify-content: center;
		margin: 0 30upx;
		margin-top: 10%;
	}
	.plan-block {
		display: flex; 
		flex-direction: row; 
		margin-left: 5%; 
		padding-left: 10upx;
		height: 130%; 
		width: 60upx;
		align-items: center; 
		font-size: 17px;
		color: #FFFFFF; 
		background-color:#e54d42; 
		border-radius: 6px; 
		word-wrap: break-word;
		letter-spacing: 20upx;
		text-align: center;
	}
	.plan {
		display: flex; 
		align-items: center; 
		justify-content: center;
	}
	.contain {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
	
	.jia {
		font-size: 20px;
		color: #e54d42;
		margin-bottom: 8%;
	}

	.hua {
		margin-bottom: 8%;
		margin-left: -16upx;
		width: 5%;
		color:#b9b9b9;
		font-size: 20px;
	}
	
	.t {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 20upx;
		font-size: 26upx;
	}
	
</style>
