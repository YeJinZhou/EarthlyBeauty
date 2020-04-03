<template>
	<view>
		<!-- 顶部导航栏 -->
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的食记</block>
		</cu-custom>
		<!-- 店铺名、评分、人均消费等信息 -->
		<view class="flex solid-bottom justify-between align-center">
			<view>
				<view class="margin-left margin-top">
					<text class="text-lg text-black text-bold">{{place.name}}</text>
				</view>
				<view class="justify-start flex align-center" style="margin-top: 10upx;">
					<uni-rate :value='place.score' disabled="true" size="10" class="margin-left" style="margin-top: 6upx;"></uni-rate>
					<text class="text-sm" style="margin-left: 9upx;">{{place.score}}分</text>
					<text class="margin-left text-sm">¥{{place.perConsumption}}/人</text>
				</view>
			</view>
			<!-- 有问题，点击之后isLike会改变但是图标不会变 -->
			<view @tap="collect()" style="margin-right: 50upx;">
				<image class="collectionImg " src="/static/like_grey.png" v-if="!isLike"></image>
				<image class="collectionImg " src="/static/like_red.png" v-if="isLike"></image>
			</view>
		</view>
		<!-- 特色菜品滚动条 -->
			<!-- 只写出了bug -->
			
		<!-- 店铺地址 -->
		<view class="padding solid-bottom align-center justify-between flex">
			<view class=" justify-start flex">
				<image src="/static/location.png" class="collectionImg"></image>
				<view class="margin-left">
					<view><text class="text-bold">{{place.location.location}}</text></view>
					<text class="text-sm text-gray">距离{{place.location.nearbyPlace}}{{place.location.dist2nearby}}米</text>
				</view>
			</view>
			<image src="/static/arrow_right.png" style="width: 40upx; height: 40upx;"></image>
		</view>
		
		<!-- 精选评论 -->
		<view class="text-lg text-bold margin-left margin-top">精选评论</view>
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + comment.headProtrait + ')' }]"></view>
						<view class="content flex-sub ">
							<view class="text-bold">{{comment.userName}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{comment.publishDate}}
							</view>
						</view>
					</view>
				</view>
				<view class="commentContent">
					{{comment.content}}
				</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<image class="thumbnailImage" :src='comment.imgList.img1URL'></image>
					<image class="thumbnailImage margin-left" :src='comment.imgList.img2URL'></image>
					<image class="thumbnailImage margin-left" :src='comment.imgList.img3URL'></image>
				</view>
				<view class=" padding"></view>
			</view>
		</view>
		
		<!-- 点评 -->
		<view class="text-lg text-bold margin-left">点评</view>
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + comment2.headProtrait + ')' }]"></view>
						<view class="content flex-sub ">
							<view class="text-bold">{{comment2.userName}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{comment2.publishDate}}
							</view>
						</view>
					</view>
				</view>
				<view class="commentContent">
					{{comment2.content}}
				</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<image class="thumbnailImage" :src='comment2.imgList.img1URL'></image>
					<image class="thumbnailImage margin-left" :src='comment2.imgList.img2URL'></image>
					<image class="thumbnailImage margin-left" :src='comment2.imgList.img3URL'></image>
				</view>
				<view class=" padding"></view>
			</view>
		</view>		
		<!-- 底部评论栏 -->
		<view class="cu-bar foot bg-white">
			<view class="search-form round">
				<input class="margin-left" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="说点什么吧..." ></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-red shadow-blur round">评论</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	var _self;
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		data() {
			return {
				place: {
					name:"清真鼎盛兴饭店",
					score: 4.7,
					perConsumption: "30",
					isLike: false,
					location: {
						location: "劳动南路10号汉中大厦一层底商2号店铺",
						nearbyPlace: "西市生活广场",
						dist2nearby: "650",
					}
				},
				specialFood:[
					{
						id:0,
						name: "一",
						img: "/static/logo.png",
					},
					{
						id:1,
						name:"两字",
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					},
					{
						id:2,
						name:"三个字",
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					},
					{
						id:3,
						name:"四字名字",
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					},
					{
						id:4,
						name:"露出来点",
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					},
					{
						id:5,
						name:"羊肉泡馍",
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					}
				],
				placeList:[
					{
						id: 0,
						img: "/static/shop01.png",
						name: "foodPlace",
						score: "score",
						perConsumption: 4.0,
						dist: 1.2,
						desc: "place desc is here"
					}
				],
				comment: {
					headProtrait: 'http://img3.imgtn.bdimg.com/it/u=181237702,2912095625&fm=26&gp=0.jpg',
					userName: "ALAN麻麻",
					publishDate: "2020年3月20日",
					content: "服务超级热情，中饭点座无虚席。凉菜加了芝麻酱是亮点，泡馍/饺子/砂锅也很好吃。这一顿吃得十分开心！",
					imgList:{
							img1URL: "/static/1.jpg",
							img2URL: "/static/2.jpg",
							img3URL: "/static/3.jpg"
					}
				},
				comment2: {
					headProtrait: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=865100368,2934340936&fm=26&gp=0.jpg',
					userName: "叶小洲",
					publishDate: "2020年1月5日",
					content: "我觉得吧，这家餐厅还是非常不错的，尤其是在服务、上菜速度、菜的质量方面。当然也有一些缺点，店内位置不是特别多，外卖的速度也不快。",
					imgList:{
							img1URL: "/static/food1.png",
							img2URL: "/static/food4.png",
							img3URL: ""
					}
				}
				
			}
		},
		methods: {
			collect(){
				_self = this;
				//_self.place.name = "changed name",
				_self.place.isLike = !_self.place.isLike,
				console.log('bth clicked'),
				console.log(this.place.isLike)
			},
			
		}
	}
</script>

<style>
	.collectionImg{
		width: 45upx;
		height: 45upx;
		margin-right: ;
	}
	.item {
		margin-right: 40upx;
		display: inline-block;
		vertical-align: top;
	}
	.commentContent{
		margin-top: 10upx;
		margin-bottom: 20upx;
		font-size: 30upx;
		display: -webkit-box;			/* 好像是个必要的元素 */
		-webkit-box-orient: vertical;	/* 作用未知,删除没有影响 */
		-webkit-line-clamp: 2;			/* 文字截断的行数 */
		word-break:break-all;
		padding: 0 30upx 0;
		max-height: 6.4em;
		overflow: hidden; 				/* 溢出部分隐藏 */
	}
	.thumbnailImage{
		width: 30%;
		height: 200upx;
		border-radius: 10upx;
	}

</style>
