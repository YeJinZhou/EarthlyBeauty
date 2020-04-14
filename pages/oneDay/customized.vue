<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">定制</block>
		</cu-custom>
		<view style="height: 10px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + items.planitems[0].foodurl + ')' }]" @tap="openConfirm(0)"></view>
				<view>
					<view>早餐：{{items.planitems[0].foodname}}</view>
					<view>店铺：{{items.planitems[0].shopname}}</view>
					<view>评分：{{items.planitems[0].shopscore}}</view>
				</view>
				<image class="plus" src="../../static/tabbar/jia.png" @tap="openConfirm(0)"></image>
			</view>
			<view class="" :class="['cu-modal','bottom-modal',confirmWindow?'show':'']">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-red" @tap="hideConfirm">取消</view>
					</view>
					<view style="text-align: left;">
						<!-- Modal 内容。 -->
						<view class="bg-white ">
							<view class="cu-steps">
								<view class="cu-item" :class="index>stepNum?'':'text-red'" v-for="(item,index) in numList" :key="index">
									<text class="num" :data-index="index + 1"></text> {{item}}
								</view>
							</view>
						</view>
						<view class="bg-white" style=" padding: 10px;">
							<ConfirmWindow0 v-show="stepNum==0" v-model="food" ref="cfood"></ConfirmWindow0>
							<ConfirmWindow1 v-show="stepNum==1" v-model="shop" ref="cshop"></ConfirmWindow1>

						</view>
						<view class="padding bg-white" style="display: flex; justify-content: space-around;">
							<button v-show="stepNum > 0" class="cu-btn bg-red shadow" @tap="NumStepsBack">上一步</button>
							<button v-show="stepNum + 1 < numList.length" class="cu-btn bg-red shadow" @tap="NumSteps">下一步</button>
							<button v-show="stepNum + 1 == numList.length" class="cu-btn bg-red shadow" @tap="closeConfirm">完成</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 4px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view>附近景点有：{{items.planitems[0].sceneryname}}</view>
				<image style="width: 40%;height:100%;" :src="items.planitems[0].sceneryurl"></image>
			</view>
		</view>

		<view style="height: 4px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + items.planitems[1].foodurl + ')' }]" @tap="openConfirm(1)"></view>
				<view>
					<view>中餐：{{items.planitems[1].foodname}}</view>
					<view>店铺：{{items.planitems[1].shopname}}</view>
					<view>评分：{{items.planitems[1].shopscore}}</view>
				</view>
				<image class="plus" src="../../static/tabbar/jia.png" @tap="openConfirm(1)"></image>
			</view>
		</view>
		<view style="height: 4px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view>附近景点有：{{items.planitems[1].sceneryname}}</view>
				<image style="width: 40%;height:100%;" :src="items.planitems[1].sceneryurl"></image>
			</view>
		</view>
		<view style="height: 4px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + items.planitems[2].foodurl + ')' }]" @tap="openConfirm(2)"></view>
				<view>
					<view>晚餐：{{items.planitems[2].foodname}}</view>
					<view>店铺：{{items.planitems[2].shopname}}</view>
					<view>评分：{{items.planitems[2].shopscore}}</view>
				</view>
				<image class="plus" src="../../static/tabbar/jia.png" @tap="openConfirm(2)"></image>
			</view>
		</view>
		<view style="height: 4px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view>附近景点有：{{items.planitems[2].sceneryname}}</view>
				<image style="width: 40%;height:100%;" :src="items.planitems[2].sceneryurl"></image>
			</view>
		</view>
		<menuroute v-show='sixFinish' class="left" :planitems="items.planitems"></menuroute>
		<view style="height: 4px;"></view>

		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您还未选择店铺，请先选择。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-red text-red" @tap="hideModal">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					你已选完一日美食计划，现在生成一日路线？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-red text-red" @tap="hideModal">再看看</button>
						<button class="cu-btn bg-red margin-left" @tap="LoadModal(true)">现在生成</button>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-load load-modal" v-if="loadModal">
			<view class="cuIcon-emojifill text-red"></view>
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
	import ConfirmWindow0 from './food_select.vue';
	import ConfirmWindow1 from './shop_select.vue';
	import menuroute from './route.vue';
	export default {
		components: {
			ConfirmWindow0,
			ConfirmWindow1,
			menuroute
		},
		data() {
			return {
				loadModal: false,
				food: {
					name: '0'
				},
				shop: {
					name: '',
				},
				selectedNow: 0,

				modalName: null,
				selectedFood: [
					null, null, null
				],
				confirmWindow: false,
				numList: [
					'食品',
					'店铺',
				],
				items: {
					"id": 67427,
					"userid": "67739",
					"planitems": [{
							"id": 1,
							"foodname": "",
							"foodurl": "",
							"shopname": "",
							"kind": 1,
							"shopscore": "",
							"sceneryname": "",
							"sceneryurl": ""
						},
						{
							"id": 1,
							"foodname": "",
							"foodurl": "",
							"shopname": "",
							"kind": 1,
							"shopscore": "",
							"sceneryname": "",
							"sceneryurl": ""
						},
						{
							"id": 1,
							"foodname": "",
							"foodurl": "",
							"shopname": "",
							"kind": 1,
							"shopscore": "",
							"sceneryname": "",
							"sceneryurl": ""
						}
					]
				},
				stepNum: 0,
				sixFinish: false,
				planid: ''
			};
		},
		onLoad(option) {
			console.log(option);
			this.planid = option.planid || '';
			this.initPage();
		},
		methods: {
			async initPage() {
				console.log("init customize: " + this.planid);
				if (this.planid == '') {
					return;
				}
				const res = await this.$myRequest({
					url: '/v1/api/onedayyfoodpage/getplanbyid', //仅为示例，并非真实接口地址。
					data: {
						planid: this.planid
					},
				});
				console.log(res.data);
				this.items = res.data.data;
				this.LoadModal(false);
			},
			async insertPlan() {
				const plan = this.items;
				// plan.id = this.planid;
				const res = await this.$myRequest({
					url: '/v1/api/onedayyfoodpage/insertplan', //仅为示例，并非真实接口地址。
					method: "POST",
					data: plan,
				})
				console.log(res.data);
			},
			async updatePlan(){
				const plan = this.items;
				//plan.id = this.planid;
				const res = await this.$myRequest({
					url: '/v1/api/onedayyfoodpage/updateplan', //仅为示例，并非真实接口地址。
					method: "POST",
					data: {
						plan: plan,
					},
				})
				console.log(res.data);
			},
			savePlan(){
				if(this.planid == ''){
					console.log(1);
					this.insertPlan();
				}else{
					console.log(2);
					this.updatePlan();
				} 
			},
			async getscenery(index) {
				const res = await this.$myRequest({
					url: '/v1/api/onedayyfoodpage/getscenery?shopid=', //仅为示例，并非真实接口地址。
					data: {
						shopid: 1
					},
				})
				this.items.planitems[index].sceneryname = res.data.data.name;
				this.items.planitems[index].sceneryurl = res.data.data.picture;
			},
			LoadModal(scroll = true) {
				this.savePlan();
				this.loadModal = scroll;
				this.sixFinish = true;
				
				this.confirmWindow = false;
				if (scroll) {
					this.$nextTick(() => {
						uni.createSelectorQuery().select(".left").boundingClientRect((res) => {
							if (res == null) return;
							uni.pageScrollTo({
								duration: 0,
								scrollTop: res.top,

							})
						}).exec();
					});
				}
				setTimeout(() => {
					this.loadModal = false;
				}, 1000)
				this.modalName = null;
			},
			checkFinished: function() {
				if (this.items.planitems[0].foodname != '' && this.items.planitems[1].foodname != '' && this.items.planitems[2].foodname !=
					'' && this.items.planitems[0].shopname != '' && this.items.planitems[1].shopname != '' && this.items.planitems[2]
					.shopname != '') {
					return true;
				} else {
					return false;
				}
			},
			openConfirm: function(index) {
				this.$refs.cfood.setPlan(this.items.planitems[index]);
				this.selectedNow = index;
				this.confirmWindow = true;
				this.stepNum = 0;
			},
			hideModal(e) {
				this.modalName = null
			},
			hideConfirm: function() {
				this.confirmWindow = false;
			},
			closeConfirm: function() {
				const plan = this.$refs.cshop.getPlan();
				if (plan.shopname == '') {
					// uni.showModal({
					// 	title: '提示',
					// 	content: '请先选择店铺',
					// 	success: (res) => {
					// 		if (res.confirm) {
					// 			回到店铺选择
					// 		}
					// 	}
					// });
					this.modalName = 'DialogModal1';
				} else {
					this.items.planitems[this.selectedNow] = plan;
					this.getscenery(this.selectedNow);
					if (this.checkFinished()) {
						this.modalName = 'DialogModal2';
					} else {
						this.confirmWindow = false;
					}
				}
			},
			scrollToRoute() {
				console.log("scrolled");
				uni.createSelectorQuery().select(".left").boundingClientRect((res) => {
					uni.pageScrollTo({
						duration: 0,
						scrollTop: res.top,

					})
				}).exec();
			},
			NumSteps() {
				let plan = this.$refs.cfood.getPlan();
				console.log(plan);
				if (plan.foodname == '') {
					// uni.showModal({
					// 	title: '提示',
					// 	content: '请先选择美食',
					// 	success: (res) => {
					// 		if (res.confirm) {
					// 			回到美食选择
					// 		}
					// 	}
					// });
				} else {
					this.$refs.cshop.setPlan(plan);
					this.stepNum++;
				}
			},

			NumStepsBack() {
				let plan = this.$refs.cshop.getPlan();
				this.$refs.cfood.setPlan(plan);
				this.stepNum--;
			},
		}
	}
</script>

<style>
	.contain {
		width: 94%;
		height: 90px;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		border-radius: 10px;
	}


	.plus {
		height: 20px;
		width: 20px;
	}
</style>
