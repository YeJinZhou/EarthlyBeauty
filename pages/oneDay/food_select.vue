<template>
	<view style="background-color: #FFFFFF;">
		<!-- <view class="bg-white ">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-red'" v-for="(item,index) in numList" :key="index">
					<text class="num" :data-index="index + 1"></text> {{item}}
				</view>
			</view>
		</view> -->

		<view class="cu-bar bg-white solid-bottom ">
			<view class="action">
				<text class="cuIcon-title text-red"></text> 请选择你要吃的美食
			</view>
		</view>
		<scroll-view scroll-x="true" class="bookshelf-content">
			<block v-for="(item, index) in list" :key="item.id">
				<view class="item" @tap="goDetail(index)">
					<view class="img">
						<view :class="MenuSelect==index?'menuselect':''" class="cu-avatar round xl" :style="[{ backgroundImage:'url(' + item.picture + ')' }]"></view>
					</view>
					<text class="item-title" style="display: flex; justify-content: center;">{{item.name}}</text>
				</view>
			</block>
		</scroll-view>
		<view class="contain solid-bottom">
			<view v-if="MenuSelect!=-1" style="display: flex; flex-direction: row;">
				<view style=" width:50%;height:100%; font-size:15px;">{{list[MenuSelect].introduction}}</view>
				<image style="border-radius: 6px; width:50%;height:100%;" :src="list[MenuSelect].picture"></image>
			</view>
		</view>
		<!-- <view class="padding" style="display: flex; justify-content: center;">
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
						"id": 78035,
						"name": "hMjr4LA8Xk",
						"introduction": "热干面是中国十大面条之一。是湖北省武汉最出名的小吃之一，有多重做法。通常以油、盐、芝麻酱、色拉油、香油、细香葱、大蒜子、萝卜丁等构成。",
						"picture": "/static/food4.png"
					},
					{
						"id": 48035,
						"name": "hMjr4LA8Xk",
						"introduction": "dBS1KcZ7ip",
						"picture": "/static/food3.png"
					},
					{
						"id": 7535,
						"name": "hMjr4LA8Xk",
						"introduction": "热干面是中国十大面条之一。是湖北省武汉最出名的小吃之一，有多重做法。通常以油、盐、芝麻酱、色拉油、香油、细香葱、大蒜子、萝卜丁等构成。",
						"picture": "/static/food1.png"
					},
					{
						"id": 7453,
						"name": "hMjr4LA8Xk",
						"introduction": "dBS1KcZ7ip",
						"picture": "/static/food5.png"
					},
					{
						"id": 966,
						"name": "hMjr4LA8Xk",
						"introduction": "dBS1KcZ7ip",
						"picture": "/static/food4.png"
					}
				],
				MenuSelect: 0,
				plan: {
					"id": 0,
					"foodname": "",
					"foodurl": "",
					"shopname": "",
					"kind": 0,
					"shopscore": "",
					"sceneryname": "",
					"sceneryurl": ""
				},
			};
		},
		onLoad() {
			 this.initPage();
		},
		methods: {
			async initPage() {
				this.list = [];
				const res = await this.$myRequest({
					url: '/v1/api/homepage/getCityFood', //仅为示例，并非真实接口地址。
					data: {
						cityid: 1
					},
				})
				console.log(res.data);
				let plans = [];
				for (let i = 0; i < res.data.data.length; i++) {
					plans.push(res.data.data[i]);
				}
				this.list = plans;
			},
			NumSteps() {
				this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
			},
			NumStepsBack() {
				this.num = this.num == this.numList.length - 1 ? 0 : this.num - 1
			},
			goDetail(index) {
				this.MenuSelect = index;
				this.plan.foodname = this.list[index].name;
				this.plan.foodurl = this.list[index].picture;
			},
			async setPlan(plan) {
				this.plan = plan;
				await this.initPage();
				if(plan.foodname == ''){
					this.goDetail(0);
				}else{
					let flag = false;
					for(let i = 0; i < this.list.length; i++){
						if(this.list[i].name == plan.foodname){
							this.MenuSelect = i;
							flag = true;
							break;
						} 
					}
					if(!flag){
						this.goDetail(0);
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
	.contain {
		height: 170px;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		border-radius: 10px;
	}

	.bookshelf-content {
		white-space: nowrap; // 滚动必须加的属性
		width: 100%;
		height: 86px;
	}

	.item {

		margin-right: 20upx;
		display: inline-block;
		vertical-align: top;
	}

	.img {
		display: inline-block;
	}

	.item-title {
		display: block; // 让字体换行
		width: 90%;
		font-size: 15px;
		line-height: 40upx;
	}

	.menuselect {
		border-style: solid;
		border-color: #FF0000;
	}
</style>
