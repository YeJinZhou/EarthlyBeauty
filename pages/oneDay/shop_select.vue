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
							<image style="width: 40%;height:100%;" :src="item.imageURL"></image>
							<view style="display:flex ;flex-direction: column; width: 40%;height:100%;justify-content:space-between;">
								<view class="text-lg">{{item.name}}</view>
								<view class="text-black text-sm">
									<text class="cuIcon-hotfill text-red "></text>评分{{item.score}}</view>
								<view class="text-black text-sm">
									<text class="cuIcon-recharge text-red "></text>{{item.money}}/人</view>
								<view>附近景点有：{{item.attraction}}</view>
							</view>
							<view style="display: flex;flex-direction: row;align-items: center; width: 20%;height:100%;" class="text-black text-sm">
								<text class="cuIcon-locationfill text-red"></text>{{item.distance}}km</view>
						</view>
						<view style="height: 7px;"></view>
					</view>
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
			ss:{name: String,}
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
					name: '清真鼎盛兴饭店1',
					score: '4.8',
					money: '30',
					attraction:'西安城墙',
					distance:'1.2',
					imageURL:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					name: '清真鼎盛兴饭店2',
					score: '4.8',
					money: '30',
					attraction:'西安城墙',
					distance:'1.2',
					imageURL:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					name: '清真鼎盛兴饭店3',
					score: '4.8',
					money: '30',
					attraction:'西安城墙',
					distance:'1.2',
					imageURL:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					name: '清真鼎盛兴饭店4',
					score: '4.8',
					money: '30',
					attraction:'西安城墙',
					distance:'1.2',
					imageURL:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					name: '清真鼎盛兴饭店5',
					score: '4.8',
					money: '30',
					attraction:'西安城墙',
					distance:'1.2',
					imageURL:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					name: '清真鼎盛兴饭店6',
					score: '4.8',
					money: '30',
					attraction:'西安城墙',
					distance:'1.2',
					imageURL:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					name: '清真鼎盛兴饭店7',
					score: '4.8',
					money: '30',
					attraction:'西安城墙',
					distance:'1.2',
					imageURL:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					name: '清真鼎盛兴饭店8',
					score: '4.8',
					money: '30',
					attraction:'西安城墙',
					distance:'1.2',
					imageURL:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}],
				shop_select: null,

			};
		},
		methods: {
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
				const data = this.ss;
				data.name = this.list[index].name;
				this.$emit('change', data);
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
