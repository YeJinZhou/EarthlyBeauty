<template>
	<view>
		<view class="bg-white">
			<view class="action" style="padding-op: 4px;">
				<text class="cuIcon-title text-red"></text> 请选择你想要去的店铺
			</view>
		</view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索店铺" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-red shadow-blur round">搜索</button>
			</view>
		</view>
		<view>
			<view style="display: flex; height: 240px;">


				<scroll-view scroll-y="true" style="flex:1;">
					<view v-for="(item,index) in list">
						<view class="bg-white" :class="shop_select==index?'shopselect':''" style=" height:95px; display: flex;flex-direction: row;align-items: center; justify-content:space-between ; border-radius: 6px;"
						 @tap="HighLight(index)">
							<image style="width: 40%;height:100%;" :src="item.pictures[0]"></image>
							<view style="display:flex ;flex-direction: column; width: 40%;height:100%;justify-content:space-between;">
								<view class="text-lg">{{item.name}}</view>
								<view class="text-black text-sm">
									<text class="cuIcon-hotfill text-red "></text>评分{{item.score}}</view>
								<view class="text-black text-sm">
									<text class="cuIcon-recharge text-red "></text>{{item.price}}/人</view>
								<view>地址：{{item.address}}</view>
							</view>
<view style="display: flex;flex-direction: row;align-items: center; width: 20%;height:100%;" class="text-black text-sm">
								
						</view>
							<view style="height: 7px;"></view>
						</view></view>
				</scroll-view>
			</view>
		</view>

		<!-- <view class="padding" style=" display:flex ;justify-content: space-around;">
			<button class="cu-btn bg-red shadow" @tap="NumStepsBack">上一步</button>
			<button class="cu-btn bg-red shadow" @tap="NumSteps">下一步</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			ss: {
				name: String,
			}
		},
		model: {
			prop: 'ss',
			event: 'change',
		},
		data() {
			return {
				numList: [
					'食品',
					'店铺',
					'完成',
				],
				num: 0,
				list: [{
					"id": 96264,
					"score": "VtSPTp8CPL",
					"price": "gIWccMW4S5",
					"address": "nTquNe0uv6",
					"name": "Bwfjspa8Jp",
					"pictures": [
						"ZNFMRtnnVv",
						"D0vm9oRmMQ",
						"dYGO7z8zu4"
					]
				},{
					"id": 96265,
					"score": "VtSPTp8CPL",
					"price": "gIWccMW4S5",
					"address": "nTquNe0uv6",
					"name": "Bwfjspa8Jp",
					"pictures": [
						"ZNFMRtnnVv",
						"D0vm9oRmMQ",
						"dYGO7z8zu4"
					]
				},],
				shop_select: null,
				plan: {},
			};
		},
		onLoad() {
			 this.initPage();
		},
		methods: {
			async initPage() {
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getShopByFood', //仅为示例，并非真实接口地址。
					data: {
						foodid: this.plan.id
					},
				})
				console.log(res.data);
				let plans = [];
				for (let i = 0; i < res.data.data.length; i++) {
					plans.push(res.data.data[i]);
				}
				plans.push(plans[0]);
				plans.push(plans[0]);
				this.list = plans;
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			NumSteps() {
				this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
			},
			NumStepsBack() {
				this.num = this.num == this.numList.length - 1 ? 0 : this.num - 1
			},
			HighLight(index) {
				this.shop_select = index;
				this.plan.shopname = this.list[index].name;
			},
			async setPlan(plan) {
				this.plan = plan;
				await this.initPage();
				console.log(this.list);
				this.shop_select = -1;
				for(let i = 0; i < this.list.length; i++){
					if(this.list[i].name == plan.shopname){
						this.shop_select = i;
						break;
					}
				}
			},
			getPlan(){
				return this.plan;
			}
		}
	}
</script>

<style>
	.shopselect {
		border-style: solid;
		border-color: #FF0000;

	}
</style>
