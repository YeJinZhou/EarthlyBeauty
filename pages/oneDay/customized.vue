<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">定制</block>
		</cu-custom>
		<view style="height: 10px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + items[0].imageURL + ')' }]"
				 @tap="openConfirm(0)"></view>
				<view>
					<view>早餐：{{items[0].food}}</view>
					<view>店铺：{{items[0].shop}}</view>
					<view>评分：{{items[0].score}}</view>
				</view>
				<image class="plus" src="../../static/tabbar/jia.png" @tap="openConfirm"></image>
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
							<ConfirmWindow0 v-if="stepNum==0" v-model="food"></ConfirmWindow0>
							<ConfirmWindow1 v-if="stepNum==1" v-model="shop"></ConfirmWindow1>

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
				<view>附近景点有：{{attractions[0].name}}</view>
				<image style="width: 40%;height:100%;" :src="attractions[0].imageURL"></image>
			</view>
		</view>

		<view style="height: 4px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + items[1].imageURL + ')' }]"
				 @tap="openConfirm(1)"></view>
				<view>
					<view>中餐：{{items[1].food}}</view>
					<view>店铺：{{items[1].shop}}</view>
					<view>评分：{{items[1].score}}</view>
				</view>
				<image class="plus" src="../../static/tabbar/jia.png" @tap="openConfirm"></image>
			</view>
		</view>
		<view style="height: 4px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view>附近景点有：{{attractions[1].name}}</view>
				<image style="width: 40%;height:100%;" :src="attractions[1].imageURL"></image>
			</view>
		</view>
		<view style="height: 4px;"></view>
		<view style="display: flex;justify-content: center;">
			<view class="contain">
				<view class="cu-avatar xl round" :style="[{ backgroundImage:'url(' + items[2].imageURL + ')' }]"
				 @tap="openConfirm(2)"></view>
				<view>
					<view>晚餐：{{items[2].food}}</view>
					<view>店铺：{{items[2].shop}}</view>
					<view>评分：{{items[2].score}}</view>
				</view>
				<image class="plus" src="../../static/tabbar/jia.png" @tap="openConfirm"></image>
			</view>
		</view>
		<view style="height:4px;"></view>

		<menuroute @hook:mounted="scrollToRoute" v-if='sixFinish' class="left"></menuroute>


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
						<button class="cu-btn bg-red margin-left" @tap="LoadModal">现在生成</button>
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
				items: [{
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					food: '羊肉泡馍',
					shop: '鼎盛兴店',
					score: 4.8
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					food: '臊子面',
					shop: '李氏臊子面',
					score: 4.8
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					food: '凉面',
					shop: '永安美食坊',
					score: 4.8
				}],
				attractions: [{
					name: '西安城墙',
					imageURL: 'http://img4.imgtn.bdimg.com/it/u=190739518,2454535920&fm=11&gp=0.jpg'
				}, {
					name: '西安城墙',
					imageURL: 'http://img4.imgtn.bdimg.com/it/u=190739518,2454535920&fm=11&gp=0.jpg'
				}],
				stepNum: 0,
				sixFinish: false,
			};
		},
		methods: {
			LoadModal(e) {
				this.loadModal = true;
				this.sixFinish = true;
				this.confirmWindow = false;
				uni.createSelectorQuery().select(".left").boundingClientRect((res) => {
					if (res == null) return;
					uni.pageScrollTo({
						duration: 0,
						scrollTop: res.top,

					})
				}).exec();
				setTimeout(() => {
					this.loadModal = false;
				}, 1000)
				this.modalName = null;
			},
			checkFinished: function() {
				for (let i = 0; i < this.selectedFood.length; i++) {
					if (this.selectedFood[i] == null) return false;
				}
				return true;
			},
			openConfirm: function(index) {
				this.selectedNow = index;
				this.confirmWindow = true;
				this.stepNum = 0;
				this.food = {
					name: '0'
				};
				this.shop = {
					name: ''
				};
			},
			hideModal(e) {
				this.modalName = null
			},
			hideConfirm: function() {
				this.confirmWindow = false;
			},
			closeConfirm: function() {

				if (this.shop.name == '') {
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
					this.selectedFood[this.selectedNow] = {
						food: this.food,
						shop: this.shop,
					};
					if (this.checkFinished()) {

						this.modalName = 'DialogModal2';
					} else {
						this.confirmWindow = false;
					}
				}
			},
			scrollToRoute() {
				console.log("1")
				uni.createSelectorQuery().select(".left").boundingClientRect((res) => {
					uni.pageScrollTo({
						duration: 0,
						scrollTop: res.top,

					})
				}).exec();
			},
			NumSteps() {
				if (this.food.name == '') {
					uni.showModal({
						title: '提示',
						content: '请先选择美食',
						success: (res) => {
							if (res.confirm) {
								回到美食选择
							}
						}
					});
				} else {
					this.stepNum++;
				}
			},
			NumStepsBack() {
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
