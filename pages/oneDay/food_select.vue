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
			<block v-for="(item, index) in list" :key="index">
				<view class="item" @tap="goDetail(index)">
					<view class="img">
						<view :class="MenuSelect==index?'menuselect':''" class="cu-avatar round xl" :style="[{ backgroundImage:'url(' + item.imageURL + ')' }]"></view>
					</view>
					<text class="item-title" style="display: flex; justify-content: center;">{{item.name}}</text>
				</view>
			</block>
		</scroll-view>
		<view class="contain solid-bottom">
			<view style=" width:50%;height:100%; font-size:15px;">{{list[MenuSelect].desc}}</view>
			<image style="border-radius: 6px; width:50%;height:100%;" :src="list[MenuSelect].menuImage"></image>
		</view>
		<!-- <view class="padding" style="display: flex; justify-content: center;">
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
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					name: '1',
					desc: '美食，顾名思义就是美味的食物1',
					menuImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					name: '2',
					desc: '美食，顾名思义就是美味的食物2',
					menuImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					name: '3',
					desc: '美食，顾名思义就是美味的食物3',
					menuImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					name: '4',
					desc: '美食，顾名思义就是美味的食物4',
					menuImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					name: '5',
					desc: '美食，顾名思义就是美味的食物5',
					menuImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					name: '6',
					desc: '美食，顾名思义就是美味的食物6',
					menuImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					name: '7',
					desc: '美食，顾名思义就是美味的食物7',
					menuImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}, {
					imageURL: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg',
					name: '8',
					desc: '美食，顾名思义就是美味的食物8',
					menuImage: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083260368,4001805896&fm=111&gp=0.jpg'
				}],
				MenuSelect: 0,
			};
		},
		methods: {
			NumSteps() {
				this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1
			},
			NumStepsBack() {
				this.num = this.num == this.numList.length - 1 ? 0 : this.num - 1
			},
			goDetail(index) {
				this.MenuSelect = index;
				const data = this.ss;
				data.name = this.list[index].name;
				this.$emit('change', data);
				console.log(data);
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
