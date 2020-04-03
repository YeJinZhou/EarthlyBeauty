<template>
	<view>
		<!-- 城市简介 -->
		<view class="solid-bottom">
			<view class="flex justify-between">
				<view class=" margin-xs cityTitle">{{city.name}}</view>
				<navigator url="../index/index">
					<view class="padding margin-xs text-sm">前往全国精选></view>
				</navigator>
			</view>
			<!-- 简介内容 -->
			<view class="Express">
				<view class="info">
					<view :class="{hide:!iSinfo}">
						{{city.info}}
					</view>
					<text @tap="showinfo" v-if="!iSinfo">展开</text>
				</view>
				<text @tap="showinfo" v-if="iSinfo" class="hidebtn">收起</text>
			</view>
		</view>
		<!-- 城市特色美食横向滚动条 -->
		<view class="solid-bottom">
			<view class="cityTitle ">{{city.name}}特色</view>	
			<!-- 滚动条 -->
			<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom">
				<block v-for="(item,index) in specialFood" :key="index">
					<view class="item">
						<navigator url="../food/food">
							<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + item.img + ')' }]"></view>
							<text class="text-sm margin-top-xs" style="height: 30upx; display: flex; justify-content: center;">{{item.name}}</text>
						</navigator>
					</view>
				</block>
			</scroll-view>
		</view>
		<!-- 知名食地滚动条 -->
		<view class="cityTitle ">知名食地</view>
		<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom">
			<block v-for="(item,index) in placeList" :key="index">
				<view class="placeBlock">
					<navigator url="../food/place" hover-class="navigator-hover">
						<view class="flex cu-card case margin-right" >
							<image class="picture" :style="[{ backgroundImage:'url(' + item.img + ')' }]" mode="scaleToFill" ></image>
							<view class="margin-left margin-right">
								<view class="text-lg text-bold margin-top-xs" >{{item.name}}</view>
								<view class="flex justify-start margin-top-xs">
									<view class="text-sm">评分{{item.score}}</view>
									<view class="text-sm margin-left">人均¥{{item.perConsumption}}</view>		
								</view>
								<view class="text-sm">距离：{{item.dist}}km</view>
								<view class="text-sm margin-top-xs"><text>{{item.desc}}</text></view>
							</view>							
						</view>
					</navigator>					
				</view>
			</block>	
		</scroll-view>
		<!-- 发现城市 -->
		<view class="cityTitle ">发现{{city.name}}</view>.
		<view v-for="(item,index) in diaryList"  :key="item.index" style="width:46%;float: left;margin:2%;">
			<!-- 卡片组 -->
			<view class="cu-card case" :class="isCard?'no-card':''" style="border-radius: 10px;" >
				<navigator :url="'../discover/diary?id='+index">
					<view class="image" style="height:240px;" >
						<image   :src="item.background"
						 mode="heightFix" ></image>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut"  >{{item.description}}</text></view>				
					</view>
					<view class="cu-list menu-avatar" style="height: 35px;">
						<view class="cu-item" style="bottom: 50%;">
							<view class="cu-avatar round"  :style="[{ backgroundImage:'url(' + item.headPortrait + ')' }]"></view>
							<view class="text-grey" style="font-size:12px;margin-right:auto;margin-left: 30%;">{{item.name}}</view>			   			    		
							<view class="text-gray text-sm">			   			    		
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.likes}}
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur:"home",
				iSinfo: false,
				city:{
					name: "西安",
					info: "西安，简称“镐”，古称长安、镐京，是陕西省省会、特大城市、关中平原城市群核心城市，国务院批复确定的中国西部地区重要的中心城市，国家重要的科研、教育、工业基地  。截至2018年，全市下辖11个区、2个县，总面积10752平方千米，建成区面积700.27平方千米，常住人口1000.37万人，城镇人口740.37万人，城镇化率74.01%。",
				},
				specialFood:[
					{
						id:0,
						name: "羊肉泡馍",
						img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=598688115,3254608759&fm=26&gp=0.jpg",
					},
					{
						id:1,
						name:"臊子面",
						img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2961522630,4144869196&fm=26&gp=0.jpg',
					},
					{
						id:2,
						name:"陕西凉皮",
						img:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=799755974,285942594&fm=11&gp=0.jpg',
					},
					{
						id:3,
						name:"葫芦鸡",
						img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=829486457,374540752&fm=26&gp=0.jpg',
					},
					{
						id:4,
						name:"玫瑰镜糕",
						img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544692856,1542675395&fm=26&gp=0.jpg',
					},
					{
						id:5,
						name:"羊肉泡馍",
						img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=598688115,3254608759&fm=26&gp=0.jpg',
					}
				],
				placeList:[
					{
						id: 0,
						img: "/static/shop01.png",
						name: "清真鼎盛兴饭店",
						score: "4.7",
						perConsumption: 30,
						dist: 1.2,
						desc: "这是一家好吃的饭店"
					},
					{
						id: 1,
						img: "/static/food4.png",
						name: "清真鼎盛兴饭店",
						score: "4.3",
						perConsumption: 30,
						dist: 1.2,
						desc: "这是一家非常好吃的饭店"
					},
					{
						id: 2,
						img: "/static/shop04.png",
						name: "清真鼎盛兴饭店",
						score: "4.3",
						perConsumption: 30,
						dist: 1.2,
						desc: "这是一家好吃的饭店"
					}
				],
				diaryList:[
					{
						id: 0,
						name: '令人头秃',
						description: '希望大家能够尝一尝这家烤肉！',
						background:"../../static/img/7.jpg",
						headPortrait:'../../static/img/5.jpg',
						views:'15',
						likes:'25',
						comment:'35',
					},{
						id: 1,
						name: '吃货小王',
						description: '他们家的凉皮真的不容错过！！',
						background:"../../static/img/3.png",
						headPortrait:'../../static/img/6.jpg',
						views:'30',
						likes:'22',
						comment:'18',
					},{
						id: 2,
						name: '独白',
						description: '这家的面真的太好吃啦！',
						background:"../../static/img/2.png",
						headPortrait:'../../static/img/qq_pic_merged_1583398729577.jpg',
						views:'11',
						likes:'5',
						comment:'3',
					},{
						name: 'SiSi',
						description: '西安美食大搜罗！去了很多地方才收集到的哦！',
						background:"../../static/img/12.png",
						headPortrait:'../../static/img/qq_pic_merged_1583398711824.jpg',
						views:'30',
						likes:'22',
						comment:'18',
					},
				]
			}
		},
		methods: {
			showinfo() {
				this.iSinfo = !this.iSinfo
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.Express {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 30upx;
		position: relative;

		.info {
			display: flex;
			flex-direction: column;
			
			view {
				text-align:justify ;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				word-break: break-word; //换行模式
				background-color: #fff;
			}
			// “展开/收起”两个按钮
			text {
				width: 70px;
				font-size: 14px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
				color: #0078FF;
				position: absolute;
				bottom: 30upx;
				right: 30upx;
			}
		}

	}

	.hidebtn {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		color: #0078FF;
		font-size: 14px;
	}

	.hide {
		word-break: break-word; //换行模式
		overflow: hidden;
		text-overflow: ellipsis; //修剪文字
		display: -webkit-box;
		-webkit-line-clamp: 4; //此处为上限行数
		-webkit-box-orient: vertical;
	}
	
	.cityTitle{
		font-size: 40upx;
		//font-weight: 100;
		color: #000000;
		line-height: 100upx;
		padding: 0 30upx;
		font-family: 'FZXiaoBiaoSong-B05S';
	}
	
	.item {
		margin-right: 40upx;
		display: inline-block;
		vertical-align: top;
	}
	
	.placeBlock {
		margin-right: 200;
		display: inline-block;
		//vertical-align: top;
	}
	
	.content-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.content-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: auto;
	}
	.picture {
		height: 100px;
		width: 100px;
		margin-top: 0px;
		margin-left: 0px;
		margin-right: auto;
		margin-bottom: 0px;
	}
</style>

