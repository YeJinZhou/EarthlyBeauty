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
				<view v-for="(item, index) in card">
					<view v-if="index<3">
						<view class="other_row">
							<image :src="'../../static/wode/'+(index+1)+'.png'" style="width:25px; height:25px; margin:6px;"></image>
							<view class="cu-avatar lg round" style="margin-right:6px; " :style="[{ backgroundImage:'url(' + item.imageURL + ')' }]"></view>
							<view class="name">{{item.name}}</view>
							<view class="score">{{item.score}}分</view>
						</view>
					</view>
					<view v-if="index>=3">
						<view class="other_row">
							<view class="rank" style="width:25px; height:25px; margin:6px; justify-content: center;">{{index+1}}</view>
							<view class="cu-avatar lg round"style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.imageURL + ')' }]"></view>
							<view class="name">{{item.name}}</view>
							<view class="score">{{item.score}}分</view>
						</view>
					</view>
				</view>
				<view class="my_row">
					<view class="my" v-for="(item, index) in master">
						<view class="rank" style="width:25px; height:25px; margin:6px; justify-content: center;">{{item.rank}}</view>
						<view class="cu-avatar lg round" style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.imageURL + ')' }]"></view>
						<view class="name">{{item.name}}</view>
						<view class="score">{{item.score}}分</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-show="TabCur==1">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="scroll" @scrolltolower="scroll" @scroll="scroll">
				<view v-for="(item, index) in card">
					<view v-if="index<3">
						<view class="other_row">
							<image :src="'../../static/wode/'+(index+1)+'.png'" style="width:25px; height:25px; margin:6px;"></image>
							<view class="cu-avatar lg round" style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.imageURL + ')' }]"></view>
							<view class="name">{{item.name}}</view>
							<view class="score">{{item.score}}分</view>
						</view>
					</view>
					<view v-if="index>=3">
						<view class="other_row">
							<view class="rank" style="width:25px; height:25px; margin:6px; justify-content: center;">{{index+1}}</view>
							<view class="cu-avatar lg round" style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.imageURL + ')' }]"></view>
							<view class="name">{{item.name}}</view>
							<view class="score">{{item.score}}分</view>
						</view>
					</view>
				</view>
				<view class="my_row">
					<view class="my" v-for="(item, index) in master">
						<view class="rank" style="width:25px; height:25px; margin:6px; justify-content: center;">{{item.rank}}</view>
						<view class="cu-avatar lg round" style="margin-right:6px; " :style=" [{ backgroundImage:'url(' + item.imageURL + ')' }]"></view>
						<view class="name">{{item.name}}</view>
						<view class="score">{{item.score}}分</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				lists: ['全国', '当前城市'],
				card: [{
					imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
					name: '张若昀',
					score: '10000'
				}, {
					imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
					name: '张的的',
					score: '1000'
				}, {
					imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
					name: '张显宗',
					score: '998'
				}, {
					imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
					name: '陈山',
					score: '111'
				}, {
					imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
					name: '鹿飞',
					score: '12'
				}, {
					imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
					name: '范闲',
					score: '8'
				}, {
					imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
					name: 'zry',
					score: '2'
				}],
				master:[{
					rank:'100',
					imageURL:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=107058113,2695546856&fm=11&gp=0.jpg',
					name:'xiaotuitui',
					score:'111',
					}]
			};
		},
		methods: {
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
