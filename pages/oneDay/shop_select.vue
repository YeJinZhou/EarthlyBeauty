<template>
	<view>
		<!-- 标题 -->
		<view class="cu-bar bg-white solid-bottom ">
			<view class="action">
				<text class="cuIcon-title text-red"></text> 请选择你想要去的店铺
			</view>
		</view>
		<!-- 搜索框 -->
	
		<!-- 店铺列表 -->
		<view class="shop-list">
			<scroll-view scroll-y="true" style="flex:1;">
				<view v-for="(item,index) in list">
					<!-- 每个店铺的内容 -->
					<view class="shop" :id="shop_select==index?'shopselect':''" @tap="HighLight(index)">
						<!-- 店铺图片 -->
						<image :src="item.pictures[0]"></image>
						<!-- 店铺信息 -->
						<view class="shop-info">
							<view class="text-lg text-bold">{{item.name}}</view>
							<view class="text-sm ">
								<text class="cuIcon-hotfill text-red"></text>
								评分{{item.score}}
							</view>
							<view class="text-sm">
								<text class="cuIcon-recharge text-red"></text>
								{{item.price}}/人
							</view>
							<view class="text-sm">地址：{{item.address}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
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
				console.log(this.plan);
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
				console.log('highlight');
				this.shop_select = index;
				this.plan.shopname = this.list[index].name;
				this.plan.shopscore = this.list[index].score;
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
	.shop-list {
		display: flex; 
		height: 240px;
	}
	
	#shopselect {
		border: 1px solid #e54d42;
	}
	
	.shop {
		display: flex;
		flex-direction: row;
		align-items: center; 
		margin: 15upx 3%;
		height:95px; 
		border-radius: 6px;
		background-color: #fff;
		border: 1px solid transparent;
		overflow: hidden;
	}
	
	.shop image {
		width: 40%;
		height:100%;
	}
	
	.shop .shop-info {
		display: flex;
		flex-direction: column; 
		justify-content: space-between;
		padding: 10upx 0;
		margin-left: 30upx;
		height: 100%;
	}
</style>
